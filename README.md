# Weather App

A weather dashboard that provides real-time weather data for various locations. The application allows users to view current conditions as well as forecasts for the next 9-12 hours. It offers a streamlined user interface built with JavaScript and utilizes an external API to fetch weather data.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [API Key Configuration](#api-key-configuration)

---

## Features

- **Current Weather**: Displays the current date and time, current temperature, and current conditions for selected location.
- **Forecast**: Provides a forecast for the next 9-12 hours in 3 hour increments (12am, 3am, 6am, 9am, 12pm, 3pm, 6pm, 9pm).
- **Worldwide Weather**: Quickly view weather conditions in major cities around the world like Los Angeles, New York, London, and Tokyo on the homepage.
- **Interactive Search**: Search for weather conditions in any location using the search bar.
- **Responsive UI**: Dynamically updates the background based on whether it is day or night in that location.

---

## Getting Started

### Prerequisites

- Node.js and npm (for package management).
- Modern web browser (Chrome, Firefox, Safari, etc.).

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/stephenlindstrom/weather-app.git
   cd weather-app
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Add Your API Key**:

   Open `dataHandling.js` and replace the placeholder in the `url` variable with your own API key:

   ```javascript
   const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${todayString}/${tomorrowString}?key=YOUR_API_KEY&contentType=json&lang=id`;
   ```

   Replace `YOUR_API_KEY` with the API key you obtain from Visual Crossing Weather.

   **Important**: Remove any lines of code referring to `API_KEY` or environment variables to avoid issues when running the development server.

4. **Run the development server**:
  ```bash
   npm run dev
   ```
  
  - This will start the Webpack development server and open the application in your default browser at `http://localhost:8080`.

5. **Build the project** (for production):

  ```bash
  npm run build
  ```

6. **Start the Express server** (after building for production):

  ```bash
  npm start
  ```

---

## Project Structure

```
weather-app/
│
├── server.js              # Express server file
├── webpack.common.js      # Shared Webpack configuration
├── webpack.dev.js         # Webpack configuration for development
├── webpack.prod.js        # Webpack configuration for production
│
└── src/                   # Source code for the application
    ├── dataHandling.js    # Fetches and processes weather data from the API
    ├── display.js         # Manages the weather display UI
    ├── homepage.js        # Displays the homepage with preset locations
    ├── weather-app.js     # Entry point for the application
    ├── icons/             # Weather condition icons (e.g. sunny, rain, snow)
    │   ├── sunny-white.png
    │   ├── rain-white.png
    │   ├── snow-white.png
    │   ├── overcast-white.png
    │   ├── partly-cloudy-white.png
    │   └── home.png
    ├── index.html         # Main HTML file
    └── styles.css         # (Optional) CSS for styling the UI

└── README.md              # Documentation
```

---

## Usage

1. **Homepage**:  
   When you open the app, you will see the weather for preset locations (Los Angeles, New York, London, Tokyo).

2. **Search for Weather**:  
   - Use the search bar to enter a location and click the **Search** button to view weather data for that location.

3. **Return Home**:  
   - Click the **Home** icon to return to the homepage.

---

## Dependencies

### Dependencies

- **[date-fns](https://date-fns.org/)** – For date formatting.
- **[date-fns-tz](https://date-fns.org/docs/Time-Zones)** – For handling time zones.
- **[express](https://expressjs.com/)** – For running the server.

### Development Dependencies

- **[webpack](https://webpack.js.org/)** – Module bundler.
- **[webpack-cli](https://webpack.js.org/api/cli/)** – CLI for webpack.
- **[webpack-dev-server](https://webpack.js.org/configuration/dev-server/)** – Development server for webpack.
- **[webpack-merge](https://github.com/survivejs/webpack-merge)** – Simplifies merging webpack configurations.
- **[html-webpack-plugin](https://webpack.js.org/plugins/html-webpack-plugin/)** – Simplifies creation of HTML files.
- **[css-loader](https://webpack.js.org/loaders/css-loader/)** – Loader for CSS files.
- **[style-loader](https://webpack.js.org/loaders/style-loader/)** – Injects CSS into the DOM.
- **[html-loader](https://webpack.js.org/loaders/html-loader/)** – Processes HTML files and assets.

---

## API Key Configuration

To run this project, you need your own **Visual Crossing Weather API key**.

1. **Obtain an API Key** from [Visual Crossing Weather](https://www.visualcrossing.com/).

2. **Add the API Key to `dataHandling.js`**:

   ```javascript
   const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${todayString}/${tomorrowString}?key=YOUR_API_KEY&contentType=json&lang=id`;
   ```

3. Replace `YOUR_API_KEY` with your actual API key.

4. **Remove any lines referring to environment variables** like `process.env.API_KEY` to avoid issues with the development server.

---
