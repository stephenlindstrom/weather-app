import "./style.css";
import { formatInTimeZone, fromZonedTime } from "date-fns-tz";
import snowImage from './icons/snow-white.png';
import sunnyImage from './icons/sunny-white.png';
import rainImage from './icons/rain-white.png';
import overcastImage from './icons/overcast-white.png';
import partlyCloudyImage from './icons/partly-cloudy-white.png';

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
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${date}?key=79A79ES6BP5MNJBRSCYC6UBYQ&contentType=json&lang=id`;
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
    console.log(processedData);
    location.textContent = processedData.location;
    currentTemp.textContent = processedData.currentTemp + "\u00B0";
    displayCurrentDate(processedData.timezone);
    dateIntervalID = setInterval(displayCurrentDate, 1000*60, processedData.timezone);
    displayCurrentTime(processedData.timezone);
    timeIntervalID = setInterval(displayCurrentTime, 1000, processedData.timezone);
    displayBackground(processedData.sunrise, processedData.sunset, processedData.timezone);
    displayConditionImage(processedData.currentConditions);
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

function displayConditionImage (conditions) {
  const img = document.querySelector('#condition-icon');
  
  const snowRegex = /\b(type_1|type_22|type_23|type_31|type_32|type_33|type_34|type_35)\b/;
  const rainRegex = /\b(type_2|type_3|type_4|type_5|type_6|type_9|type_10|type_11|type_13|type_14|type_21|type_24|type_25|type_26)\b/;
  const overcastRegex = /\btype_41\b/;
  const partlyCloudyRegex = /\btype_42\b/;
  const sunnyRegex = /\btype_43\b/;

  if (snowRegex.test(conditions)) {
    img.src = snowImage;
  }
  else if (rainRegex.test(conditions)) {
    img.src = rainImage;
  }
  else if (overcastRegex.test(conditions)) {
    img.src = overcastImage;
  }
  else if (partlyCloudyRegex.test(conditions)) {
    img.src = partlyCloudyImage;
  }
  else if (sunnyRegex.test(conditions)) {
    img.src = sunnyImage;
  }
}

function displayBackground(sunrise, sunset, timezone) {
  const container = document.querySelector('.flex-container-column');
  const currentDate = formatInTimeZone(new Date(), timezone, 'yyyy-MM-dd');
  const dateWithSunrise = currentDate + "T" + sunrise;
  const dateWithSunset = currentDate + "T" + sunset;
  const utcDateSunrise = fromZonedTime(dateWithSunrise, timezone);
  const utcDateSunset = fromZonedTime(dateWithSunset, timezone);
  if (utcDateSunrise < new Date() && new Date() < utcDateSunset) {
    container.style.background = "rgb(89, 202, 240)";
  } else {
    container.style.background = "linear-gradient(rgb(106, 106, 128), rgb(49, 49, 58))";
  }
}

userInterface();