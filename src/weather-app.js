import "./style.css";
import { formatInTimeZone } from "date-fns-tz";

async function getWeatherData (url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);  
    }
    const weatherData = await response.json();
    return weatherData;
    
  } catch (error) {
    console.error('An error occurred while fetching data:', error);
    throw error;
  }
  
}

function processWeatherData (data) {
  // Check if data and necessary nested properties exist
  if (
    !data ||
    !data.resolvedAddress ||
    !data.timezone ||
    !data.currentConditions ||
    !data.currentConditions.conditions ||
    !data.currentConditions.temp ||
    !data.currentConditions.sunrise ||
    !data.currentConditions.sunset ||
    !Array.isArray(data.days) ||
    data.days.length === 0 ||
    !data.days[0].hours ||
    data.days[0].hours.length < 19
  ) {
    console.error('Error: Missing essential data');
    return { error: true, message: 'Data not available. Please try again later.' };
  }

  // Create object with necessary data, provide fallback values for unnecessary data
  const processedData = {
    location: data.resolvedAddress,
    timezone: data.timezone,
    currentConditions: data.currentConditions.conditions,
    currentTemp: Math.round(data.currentConditions.temp),
    sunrise: data.currentConditions.sunrise,
    sunset: data.currentConditions.sunset,
    forecast: [6, 9, 12, 15, 18].map(hour => ({
      temp: data.days[0].hours[hour]?.temp ?? 'N/A',
      conditions: data.days[0].hours[hour]?.conditions || 'Unknown',
    })),
  };

  return processedData;
}

async function main (location) {
  try {
    const date = new Date(Date.now()).toISOString();
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${date}?key=79A79ES6BP5MNJBRSCYC6UBYQ&contentType=json`;
    const weatherData = await getWeatherData(url);
    const processedData = processWeatherData(weatherData);
    console.log(processedData);
    return processedData;

  } catch (error) {
    console.error('An error occurred in the main function:', error);
  }
}

function userInterface () {
  const searchButton = document.querySelector('button');
  const locationInput = document.querySelector('#search-location');
  const location = document.querySelector('#location');
  const currentTemp = document.querySelector('#current-temp');
  let dateIntervalID;
  let timeIntervalID;
  searchButton.addEventListener('click', async () => {
    location.textContent = '';
    currentTemp.textContent = '';
    clearInterval(dateIntervalID);
    clearInterval(timeIntervalID);
    const searchLocation = locationInput.value;
    const processedData = await main(searchLocation);
    location.textContent = processedData.location;
    currentTemp.textContent = processedData.currentTemp + "\u00B0";
    displayCurrentDate(processedData.timezone);
    dateIntervalID = setInterval(displayCurrentDate, 1000*60, processedData.timezone);
    displayCurrentTime(processedData.timezone);
    timeIntervalID = setInterval(displayCurrentTime, 1000, processedData.timezone);
  });
}

function displayCurrentTime (timezone) {
  const time = document.querySelector('#time');
  time.textContent = '';
  const zonedTime = formatInTimeZone(new Date(), timezone, 'p');
  time.textContent = zonedTime;
}

function displayCurrentDate (timezone) {
  const date = document.querySelector('#date');
  date.textContent = '';
  const zonedDate = formatInTimeZone(new Date(), timezone, 'PPP');
  date.textContent = zonedDate;
}

userInterface();