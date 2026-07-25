import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2, MapPin, History, AlertCircle } from 'lucide-react';
import { GeoLocation } from '../types/weather';
import { searchCities } from '../services/openMeteo';

interface SearchBarProps {
  onSelectCity: (location: GeoLocation) => void;
  onSearchError?: (errorMsg: string) => void;
  isLoadingWeather?: boolean;
}

const RECENT_SEARCHES_KEY = 'weather_app_recent_cities';

export const SearchBar: React.FC<SearchBarProps> = ({
  onSelectCity,
  onSearchError,
  isLoadingWeather
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GeoLocation[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<GeoLocation[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [searchError, setSearchError] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load recent searches on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (saved) {
        setRecentSearches(JSON.parse(saved).slice(0, 5));
      }
    } catch (e) {
      console.warn('Could not read recent searches from localStorage');
    }
  }, []);

  // Save recent search
  const saveRecentSearch = (location: GeoLocation) => {
    try {
      const existing = recentSearches.filter(item => item.id !== location.id);
      const updated = [location, ...existing].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not save recent search to localStorage');
    }
  };

  // Handle Search Input Change with Debounce & Geocoding Fetch
  useEffect(() => {
    if (!query.trim() || query.trim().length < 2) {
      setResults([]);
      setIsSearching(false);
      setSearchError(null);
      return;
    }

    const abortController = new AbortController();
    setIsSearching(true);
    setSearchError(null);

    const timer = setTimeout(async () => {
      try {
        const locations = await searchCities(query, abortController.signal);
        setResults(locations);
        setIsSearching(false);
        setIsOpen(true);
        setHighlightedIndex(-1);

        if (locations.length === 0) {
          setSearchError(`No cities found matching "${query}". Try checking spelling or search another city name.`);
        }
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setIsSearching(false);
          setSearchError('Error contacting Open-Meteo Geocoding API. Please try again.');
          if (onSearchError) {
            onSearchError(err.message || 'Geocoding failed.');
          }
        }
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      abortController.abort();
    };
  }, [query]);

  // Click Outside to Close Dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (location: GeoLocation) => {
    saveRecentSearch(location);
    onSelectCity(location);
    setQuery('');
    setIsOpen(false);
    setResults([]);
    setSearchError(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const activeList = query.trim().length >= 2 ? results : recentSearches;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIsOpen(true);
      setHighlightedIndex(prev => (prev < activeList.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev > 0 ? prev - 1 : activeList.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < activeList.length) {
        handleSelect(activeList[highlightedIndex]);
      } else if (query.trim()) {
        // Trigger manual submission if user pressed enter with typed query
        if (results.length > 0) {
          handleSelect(results[0]);
        } else if (!isSearching) {
          const fakeNotFoundMessage = `No match found for "${query}". Try a valid city like Tokyo, London, or New York.`;
          setSearchError(fakeNotFoundMessage);
          if (onSearchError) onSearchError(fakeNotFoundMessage);
        }
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const clearInput = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    setSearchError(null);
    inputRef.current?.focus();
  };

  return (
    <div id="search-bar-wrapper" className="relative w-full max-w-2xl mx-auto" ref={dropdownRef}>
      
      {/* Input Box */}
      <div className="relative flex items-center">
        <div className="absolute left-4 pointer-events-none text-slate-400 dark:text-slate-500">
          {isSearching || isLoadingWeather ? (
            <Loader2 className="w-5 h-5 animate-spin text-sky-500" />
          ) : (
            <Search className="w-5 h-5" />
          )}
        </div>

        <input
          id="input-city-search"
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search city or location (e.g. Tokyo, Paris, Sydney)..."
          className="w-full pl-12 pr-10 py-3.5 bg-white dark:bg-slate-800/90 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-lg shadow-slate-200/50 dark:shadow-none focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all text-sm sm:text-base font-medium"
        />

        {query && (
          <button
            id="btn-clear-search"
            onClick={clearInput}
            className="absolute right-3 p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            title="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Auto-complete Dropdown Menu */}
      {isOpen && (
        <div
          id="search-dropdown-menu"
          className="absolute left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl z-50 overflow-hidden max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700/50 transition-all"
        >
          {/* Real Search Results */}
          {query.trim().length >= 2 ? (
            <>
              {results.length > 0 ? (
                <div className="py-2">
                  <div className="px-4 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Open-Meteo Geocoding Results
                  </div>
                  {results.map((item, idx) => {
                    const isHighlighted = idx === highlightedIndex;
                    return (
                      <button
                        key={`${item.id}-${idx}`}
                        id={`search-result-item-${idx}`}
                        onClick={() => handleSelect(item)}
                        className={`w-full px-4 py-3 flex items-center justify-between text-left transition-colors ${
                          isHighlighted
                            ? 'bg-sky-50 dark:bg-sky-900/40 text-sky-900 dark:text-sky-100'
                            : 'hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <MapPin className="w-4 h-4 text-sky-500 flex-shrink-0" />
                          <div>
                            <div className="font-semibold text-sm">
                              {item.name}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                              {[item.admin1, item.country].filter(Boolean).join(', ')}
                            </div>
                          </div>
                        </div>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400">
                          {item.latitude.toFixed(2)}°, {item.longitude.toFixed(2)}°
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : !isSearching && searchError ? (
                <div className="p-4 text-center">
                  <AlertCircle className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                  <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    {searchError}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Check for typos or try searching a major city like "Tokyo" or "London".
                  </p>
                </div>
              ) : null}
            </>
          ) : (
            /* Recent Searches when Query is Empty */
            recentSearches.length > 0 && (
              <div className="py-2">
                <div className="px-4 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <History className="w-3.5 h-3.5 text-slate-400" />
                    Recent Searches
                  </span>
                  <button
                    onClick={() => {
                      setRecentSearches([]);
                      localStorage.removeItem(RECENT_SEARCHES_KEY);
                    }}
                    className="text-[10px] text-sky-500 hover:underline"
                  >
                    Clear History
                  </button>
                </div>
                {recentSearches.map((item, idx) => (
                  <button
                    key={`recent-${item.id}-${idx}`}
                    onClick={() => handleSelect(item)}
                    className="w-full px-4 py-2.5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <History className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400">
                      {item.country}
                    </span>
                  </button>
                ))}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};
