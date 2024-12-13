import { formatInTimeZone, fromZonedTime } from "date-fns-tz";
import snowImage from './icons/snow-white.png';
import sunnyImage from './icons/sunny-white.png';
import rainImage from './icons/rain-white.png';
import overcastImage from './icons/overcast-white.png';
import home from './icons/home.png';
import partlyCloudyImage from './icons/partly-cloudy-white.png';
import main from "./dataHandling";
import displayHomePage from "./homepage";

export { userInterface, getConditionImage, isDay, dateIntervalID, timeIntervalID };

let dateIntervalID;
let timeIntervalID;

function createWeatherPageContainer () {
  const weatherDisplay = document.createElement('div');
  weatherDisplay.classList.add('weather-display');

  const homeIcon = document.createElement('input');
  homeIcon.type = 'image'
  homeIcon.src = home;
  homeIcon.id = 'home-icon';
  homeIcon.alt = 'Home button';
  weatherDisplay.appendChild(homeIcon);

  const flexContainerCol = document.createElement('div');
  flexContainerCol.classList.add('flex-container-column');

  const date = document.createElement('div');
  date.id = 'date';
  date.classList.add('flex-item');

  const time = document.createElement('div');
  time.id = 'time';
  time.classList.add('flex-item');

  const location = document.createElement('div');
  location.id = 'location';
  location.classList.add('flex-item');

  const icon = document.createElement('img');
  icon.id = 'condition-icon';

  const currentTemp = document.createElement('div');
  currentTemp.id = 'current-temp';
  currentTemp.classList.add('flex-item');

  const forecastHeader = document.createElement('div');
  forecastHeader.textContent = 'Forecast';

  const forecastContainer = document.createElement('div');
  forecastContainer.id = 'forecast-container';
  forecastContainer.classList.add('flex-item');

  const locationSearch = document.createElement('input');
  locationSearch.type = 'search';
  locationSearch.id = 'search-location';
  locationSearch.name = 'search-location';
  locationSearch.classList.add('flex-item');

  const searchButton = document.createElement('button');
  searchButton.textContent = 'Search';
  searchButton.classList.add('search-button');
  searchButton.classList.add('flex-item');

  document.body.appendChild(weatherDisplay);
  weatherDisplay.appendChild(flexContainerCol);
  flexContainerCol.appendChild(date);
  flexContainerCol.appendChild(time);
  flexContainerCol.appendChild(location);
  flexContainerCol.appendChild(icon);
  flexContainerCol.appendChild(currentTemp);
  flexContainerCol.appendChild(forecastHeader);
  flexContainerCol.appendChild(forecastContainer);
  flexContainerCol.appendChild(locationSearch);
  flexContainerCol.appendChild(searchButton);
}

async function userInterface () {
  const locationInputHome = document.querySelector('#home-search');
  document.body.textContent = '';
  const processedData = await main(locationInputHome.value);
  createWeatherPageContainer();
  displayWeather(processedData);
  const searchButton = document.querySelector('.search-button');
  const locationInput = document.querySelector('#search-location');

  const homeButton = document.querySelector('#home-icon');

  searchButton.addEventListener('click', async function () {
    const processedData = await main(locationInput.value); 
    displayWeather(processedData); });

  homeButton.addEventListener('click', () => {
    clearInterval(timeIntervalID);
    clearInterval(dateIntervalID);
    displayHomePage();
  });

  
  
  // searchButton.addEventListener('click', async () => {
  //   location.textContent = '';
  //   currentTemp.textContent = '';
  //   clearInterval(dateIntervalID);
  //   clearInterval(timeIntervalID);
  //   const searchLocation = locationInput.value;
  //   const processedData = await main(searchLocation);
  //   location.textContent = processedData.location;
  //   currentTemp.textContent = processedData.currentTemp + "\u00B0";
  //   displayCurrentDate(processedData.timezone);
  //   dateIntervalID = setInterval(displayCurrentDate, 1000*60, processedData.timezone);
  //   displayCurrentTime(processedData.timezone);
  //   timeIntervalID = setInterval(displayCurrentTime, 1000, processedData.timezone);
  //   displayForecast(processedData.forecastToday, processedData.forecastTomorrow, processedData.timezone);
  //   displayBackground(processedData.sunrise, processedData.sunset, processedData.timezone);
  //   const img = document.querySelector('#condition-icon');
  //   const imageSrc = getConditionImage(processedData.currentConditions);
  //   if (imageSrc != null) {
  //     img.src = imageSrc;
  //   }
  // });
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
  const zonedDate = formatInTimeZone(new Date(), timezone, 'eeee, PPP');
  date.textContent = zonedDate;
}

function getConditionImage (conditions) {
  const snowRegex = /\b(type_1|type_22|type_23|type_31|type_32|type_33|type_34|type_35)\b/;
  const rainRegex = /\b(type_2|type_3|type_4|type_5|type_6|type_9|type_10|type_11|type_13|type_14|type_21|type_24|type_25|type_26)\b/;
  const overcastRegex = /\btype_41\b/;
  const partlyCloudyRegex = /\btype_42\b/;
  const sunnyRegex = /\btype_43\b/;

  if (snowRegex.test(conditions)) {
    return snowImage;
  }
  else if (rainRegex.test(conditions)) {
    return rainImage;
  }
  else if (overcastRegex.test(conditions)) {
    return overcastImage;
  }
  else if (partlyCloudyRegex.test(conditions)) {
    return partlyCloudyImage;
  }
  else if (sunnyRegex.test(conditions)) {
    return sunnyImage;
  }
  else {
    return null;
  }
}

function isDay(sunrise, sunset, timezone) {
  const currentDate = formatInTimeZone(new Date(), timezone, 'yyyy-MM-dd');
  const dateWithSunrise = currentDate + "T" + sunrise;
  const dateWithSunset = currentDate + "T" + sunset;
  const utcDateSunrise = fromZonedTime(dateWithSunrise, timezone);
  const utcDateSunset = fromZonedTime(dateWithSunset, timezone);
  if (utcDateSunrise < new Date() && new Date() < utcDateSunset) {
    return true;
  } else {
    return false;
  }
}

function displayForecast(todayForecast, tomorrowForecast, timezone) {
  const hours = ['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm'];
  const forecastContainer = document.querySelector('#forecast-container');
  forecastContainer.textContent = '';
  const currentHour = Number(formatInTimeZone(new Date(), timezone, 'H'));
  let hourIndex = Math.floor(currentHour/3) + 1;
  let count = 0;
  while (count < 4) {
    const forecastDiv = document.createElement('div');
    forecastDiv.classList.add('forecast');
    const timeDiv = document.createElement('div');
    const conditionImg = document.createElement('img');
    conditionImg.style.width = '50px';
    conditionImg.style.height = '50px';
    const tempDiv = document.createElement('div');
    forecastDiv.appendChild(timeDiv);
    forecastDiv.appendChild(conditionImg);
    forecastDiv.appendChild(tempDiv);
    forecastContainer.appendChild(forecastDiv);

    if (hourIndex < 8) {  
      timeDiv.textContent = hours[hourIndex];
      const image = getConditionImage(todayForecast[hourIndex].conditions);
      if (image != null) {
        conditionImg.src = image;
      }
      tempDiv.textContent = todayForecast[hourIndex].temp + "\u00B0";
      hourIndex += 1;
    } else {
      const tomorrowHourIndex = hourIndex - 8;
      timeDiv.textContent = hours[tomorrowHourIndex];
      const image = getConditionImage(tomorrowForecast[tomorrowHourIndex].conditions);
      if (image != null) {
        conditionImg.src = image;
      }
      tempDiv.textContent = tomorrowForecast[tomorrowHourIndex].temp + "\u00B0";
      hourIndex += 1;
    }
    count += 1;
  }
}

function displayWeather (processedData) {
  const location = document.querySelector('#location');
  const currentTemp = document.querySelector('#current-temp');
  location.textContent = '';
  currentTemp.textContent = '';
  clearInterval(dateIntervalID);
  clearInterval(timeIntervalID);
  location.textContent = processedData.location;
  currentTemp.textContent = processedData.currentTemp + "\u00B0";
  displayCurrentDate(processedData.timezone);
  dateIntervalID = setInterval(displayCurrentDate, 1000*60, processedData.timezone);
  displayCurrentTime(processedData.timezone);
  timeIntervalID = setInterval(displayCurrentTime, 1000, processedData.timezone);
  displayForecast(processedData.forecastToday, processedData.forecastTomorrow, processedData.timezone);
  const daytime = isDay(processedData.sunrise, processedData.sunset, processedData.timezone);
  const container = document.querySelector('.weather-display');
  if (daytime) {
    container.style.background = "linear-gradient(rgb(89, 202, 240), rgb(64, 201, 243))";
  } else {
    container.style.background = "linear-gradient(rgb(33, 4, 100), rgb(19, 3, 49))";
  }
  const img = document.querySelector('#condition-icon');
  const imageSrc = getConditionImage(processedData.currentConditions);
  if (imageSrc != null) {
    img.src = imageSrc;
  }
}