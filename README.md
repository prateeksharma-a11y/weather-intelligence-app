# Weather Intelligence App 🌤️

A modern, responsive **Weather Intelligence Web Application** built in **Google AI Studio App Build** using React, TypeScript, Tailwind CSS, Recharts, and the public **Open-Meteo API**. 

This application provides city geocoding, current weather metrics, 24-hour interactive forecast charts, 7-day weather outlooks, and automated activity planning recommendations. It is engineered to be 100% client-side compatible for zero-config deployment on **Cloudflare Pages**.

---

## 🚀 Key Features

- 🔍 **City Geocoding & Auto-Complete**: Powered by Open-Meteo Geocoding API (`https://geocoding-api.open-meteo.com/v1/search`).
- 🌡️ **Current Weather Metrics**: Real-time temperature, apparent temperature ("feels like"), humidity, wind speed & direction, pressure, cloud cover, UV index, and sunrise/sunset times.
- 📈 **24-Hour Interactive Forecast Charts**: Visualized using `Recharts` with switchable metrics (Temperature, Precipitation Probability %, Wind Speed, UV Index).
- 📅 **7-Day Weather Outlook**: Daily cards with relative temperature range bars and detailed solar/wind accordions.
- 💡 **Planning Recommendations**: Automated advisory engine generating actionable recommendations for:
  - 🏃 **Outdoor Sports & Activities** (Optimal 3-hour workout window)
  - 👕 **Clothing & Outfit Guide** (Layering, winter gear, rain protection)
  - ☀️ **UV & Health Protection** (SPF requirements, skin safety)
  - 🚗 **Travel & Commute Hazards** (Fog, thunderstorms, high winds)
- 🔄 **Unit Toggles**: Seamlessly toggle between Celsius (°C) and Fahrenheit (°F), plus wind speed units (`km/h` or `mph`).
- 📍 **Device Geolocation**: Detect current coordinates using browser GPS (`navigator.geolocation`).
- ⚠️ **Error Handling & Validation**: Robust handling for invalid city searches, API errors, and network fallbacks.
- 🧪 **Verification Toolbar**: Quick-action buttons to test valid city searches (Tokyo, New York) and error states.

---

## 📡 Open-Meteo API Endpoints Used

| API | Endpoint | Purpose |
|---|---|---|
| **Open-Meteo Geocoding API** | `https://geocoding-api.open-meteo.com/v1/search` | Converts city names into latitude, longitude, and timezone data. |
| **Open-Meteo Forecast API** | `https://api.open-meteo.com/v1/forecast` | Fetches current weather, 24-hour hourly metrics, and 7-day daily forecasts. |

---

## 🛠️ Local Development & Running

1. **Clone or Download Repository**:
   ```bash
   git clone <YOUR_GITHUB_REPO_URL>
   cd weather-intelligence-app
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` or `http://localhost:5173` in your browser.

4. **Production Build**:
   ```bash
   npm run build
   ```
   The static production output will be generated inside the `dist/` folder.

---

## 🔗 Step-by-Step: Connecting Google AI Studio to GitHub

To convert this AI Studio project into a connected GitHub repository:

1. In **Google AI Studio App Build**, locate the **Settings / Share / Export** menu in the top navigation or sidebar.
2. Click **Connect to GitHub** (or **Export to GitHub**).
3. Authorize your GitHub account if prompted.
4. Select or create a target repository (e.g., `weather-intelligence-app`).
5. Confirm synchronization. Google AI Studio will commit and push all source files (`package.json`, `src/`, `vite.config.ts`, `README.md`) directly to your GitHub repository main branch.

---

## ☁️ Step-by-Step: Deploying to Cloudflare Pages

Once your GitHub repository contains the project:

### Step 1: Create a Cloudflare Pages Project
1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select your GitHub account and choose the `weather-intelligence-app` repository.

### Step 2: Configure Build Settings
Configure the build settings as follows:

| Setting | Value |
|---|---|
| **Framework preset** | `Vite` (or `None`) |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | `/` (leave default) |
| **Node.js Version** | `18` or `20` (Set environment variable `NODE_VERSION=20` if required) |

### Step 3: Deploy & Obtain Live URL
1. Click **Save and Deploy**.
2. Cloudflare Pages will run `npm install` and `npm run build`, producing the static bundle from `dist/`.
3. Once complete, Cloudflare will provide a live public URL (e.g., `https://weather-intelligence-app.pages.dev`).

---

## 🧪 Testing & Evidence Validation Guide

The app includes built-in verification features for assignment testing:

1. **Valid City Search 1 (Tokyo)**:
   - Type `Tokyo` in the search bar or click **Valid City 1 (Tokyo)** in the top toolbar.
   - Verify temperature, 24-hour chart, and 7-day outlook populate.

2. **Valid City Search 2 (New York)**:
   - Type `New York` or click **Valid City 2 (New York)**.
   - Confirm coordinates, time zone, and metrics update accordingly.

3. **Invalid City Search / API Error State**:
   - Type an invalid string like `XyzNonExistentCity99` or click **Test Error State**.
   - Verify the clean red alert box appears with helpful suggestions to recover.

---

## 📁 Repository Structure

```
├── README.md                # Deployment and documentation guide
├── metadata.json            # Application metadata
├── package.json             # NPM dependencies & scripts
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite build configuration
├── index.html               # SPA Entry HTML
└── src/
    ├── App.tsx              # Main application entry component
    ├── main.tsx             # React DOM root mounting
    ├── index.css            # Tailwind CSS imports & custom styles
    ├── types/
    │   └── weather.ts       # TypeScript interfaces for Open-Meteo payloads
    ├── services/
    │   └── openMeteo.ts     # Open-Meteo Geocoding & Forecast API client
    ├── utils/
    │   ├── weatherCodes.ts  # WMO Weather code mappings, icons & theme gradients
    │   ├── unitConversions.ts # Temperature & Wind unit conversions
    │   └── recommendationEngine.ts # Automated planning advice generator
    └── components/
        ├── Navbar.tsx                   # Header with units & GPS location toggle
        ├── SearchBar.tsx                # Auto-complete search with debounced geocoding
        ├── PopularCities.tsx            # Quick city selection pills
        ├── CurrentWeatherCard.tsx       # Hero current weather card
        ├── HourlyForecastChart.tsx      # Recharts 24-hour forecast trends
        ├── DailyForecastList.tsx        # 7-day forecast cards & detail accordions
        ├── WeatherRecommendations.tsx # Activity, outfit, UV, & travel recommendations
        └── ErrorAlert.tsx               # Error handling display component
```
