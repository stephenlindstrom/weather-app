import "./style.css";
import displayHomePage from "./homepage";

displayHomePage();
// import { formatInTimeZone, fromZonedTime } from "date-fns-tz";
// import snowImage from './icons/snow-white.png';
// import sunnyImage from './icons/sunny-white.png';
// import rainImage from './icons/rain-white.png';
// import overcastImage from './icons/overcast-white.png';
// import partlyCloudyImage from './icons/partly-cloudy-white.png';
// import createWeatherPageContainer from "./display";

// async function getWeatherData (url) {
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);  
//     }
//     const weatherData = await response.json();
//     return weatherData;
    
//   } catch (error) {
//     console.error('An error occurred while fetching data:', error);
//     throw error;
//   }
  
// }

// function processWeatherData (data) {
//   // Check if data and necessary nested properties exist
//   if (
//     !data ||
//     !data.resolvedAddress ||
//     !data.timezone ||
//     !data.currentConditions ||
//     !data.currentConditions.conditions ||
//     !data.currentConditions.temp ||
//     !data.currentConditions.sunrise ||
//     !data.currentConditions.sunset ||
//     !Array.isArray(data.days) ||
//     data.days.length === 0 ||
//     !data.days[0].hours ||
//     data.days[0].hours.length < 19
//   ) {
//     console.error('Error: Missing essential data');
//     return { error: true, message: 'Data not available. Please try again later.' };
//   }

//   // Create object with necessary data, provide fallback values for unnecessary data
//   const processedData = {
//     location: data.resolvedAddress,
//     timezone: data.timezone,
//     currentConditions: data.currentConditions.conditions,
//     currentTemp: Math.round(data.currentConditions.temp),
//     sunrise: data.currentConditions.sunrise,
//     sunset: data.currentConditions.sunset,
//     forecastToday: [0, 3, 6, 9, 12, 15, 18, 21].map(hour => ({
//       temp: Math.round(data.days[0].hours[hour]?.temp) ?? 'N/A',
//       conditions: data.days[0].hours[hour]?.conditions || 'Unknown',
//     })),
//     forecastTomorrow: [0, 3, 6, 9, 12, 15, 18, 21].map(hour => ({
//       temp: Math.round(data.days[1].hours[hour]?.temp) ?? 'N/A',
//       conditions: data.days[1].hours[hour]?.conditions || 'Unknown',
//     })),
//   };

//   return processedData;
// }

// async function main (location) {
//   try {
//     const today = new Date();
//     const todayString = today.toISOString();
//     const tomorrow = new Date(today.setDate(today.getDate() + 1));
//     const tomorrowString = tomorrow.toISOString();
//     const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${todayString}/${tomorrowString}?key=79A79ES6BP5MNJBRSCYC6UBYQ&contentType=json&lang=id`;
//     const weatherData = await getWeatherData(url);
//     console.log(weatherData);
//     const processedData = processWeatherData(weatherData);
//     console.log(processedData);
//     return processedData;

//   } catch (error) {
//     console.error('An error occurred in the main function:', error);
//   }
// }

// function userInterface () {
//   createWeatherPageContainer();
//   const searchButton = document.querySelector('button');
//   const locationInput = document.querySelector('#search-location');
//   const location = document.querySelector('#location');
//   const currentTemp = document.querySelector('#current-temp');
//   let dateIntervalID;
//   let timeIntervalID;
//   searchButton.addEventListener('click', async () => {
//     location.textContent = '';
//     currentTemp.textContent = '';
//     clearInterval(dateIntervalID);
//     clearInterval(timeIntervalID);
//     const searchLocation = locationInput.value;
//     const processedData = await main(searchLocation);
//     location.textContent = processedData.location;
//     currentTemp.textContent = processedData.currentTemp + "\u00B0";
//     displayCurrentDate(processedData.timezone);
//     dateIntervalID = setInterval(displayCurrentDate, 1000*60, processedData.timezone);
//     displayCurrentTime(processedData.timezone);
//     timeIntervalID = setInterval(displayCurrentTime, 1000, processedData.timezone);
//     displayForecast(processedData.forecastToday, processedData.forecastTomorrow, processedData.timezone);
//     displayBackground(processedData.sunrise, processedData.sunset, processedData.timezone);
//     const img = document.querySelector('#condition-icon');
//     const imageSrc = getConditionImage(processedData.currentConditions);
//     if (imageSrc != null) {
//       img.src = imageSrc;
//     }
//   });
// }

// function displayCurrentTime (timezone) {
//   const time = document.querySelector('#time');
//   time.textContent = '';
//   const zonedTime = formatInTimeZone(new Date(), timezone, 'p');
//   time.textContent = zonedTime;
// }

// function displayCurrentDate (timezone) {
//   const date = document.querySelector('#date');
//   date.textContent = '';
//   const zonedDate = formatInTimeZone(new Date(), timezone, 'eeee, PPP');
//   date.textContent = zonedDate;
// }

// function getConditionImage (conditions) {
//   const snowRegex = /\b(type_1|type_22|type_23|type_31|type_32|type_33|type_34|type_35)\b/;
//   const rainRegex = /\b(type_2|type_3|type_4|type_5|type_6|type_9|type_10|type_11|type_13|type_14|type_21|type_24|type_25|type_26)\b/;
//   const overcastRegex = /\btype_41\b/;
//   const partlyCloudyRegex = /\btype_42\b/;
//   const sunnyRegex = /\btype_43\b/;

//   if (snowRegex.test(conditions)) {
//     return snowImage;
//   }
//   else if (rainRegex.test(conditions)) {
//     return rainImage;
//   }
//   else if (overcastRegex.test(conditions)) {
//     return overcastImage;
//   }
//   else if (partlyCloudyRegex.test(conditions)) {
//     return partlyCloudyImage;
//   }
//   else if (sunnyRegex.test(conditions)) {
//     return sunnyImage;
//   }
//   else {
//     return null;
//   }
// }

// function displayBackground(sunrise, sunset, timezone) {
//   const container = document.querySelector('.flex-container-column');
//   const currentDate = formatInTimeZone(new Date(), timezone, 'yyyy-MM-dd');
//   const dateWithSunrise = currentDate + "T" + sunrise;
//   const dateWithSunset = currentDate + "T" + sunset;
//   const utcDateSunrise = fromZonedTime(dateWithSunrise, timezone);
//   const utcDateSunset = fromZonedTime(dateWithSunset, timezone);
//   if (utcDateSunrise < new Date() && new Date() < utcDateSunset) {
//     container.style.background = "linear-gradient(rgb(89, 202, 240), rgb(64, 201, 243))";
//   } else {
//     container.style.background = "linear-gradient(rgb(33, 4, 100), rgb(19, 3, 49))";
//   }
// }

// function displayForecast(todayForecast, tomorrowForecast, timezone) {
//   const hours = ['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm'];
//   const forecastContainer = document.querySelector('#forecast-container');
//   forecastContainer.textContent = '';
//   const currentHour = Number(formatInTimeZone(new Date(), timezone, 'H'));
//   let hourIndex = Math.floor(currentHour/3) + 1;
//   let count = 0;
//   while (count < 4) {
//     const forecastDiv = document.createElement('div');
//     forecastDiv.classList.add('forecast');
//     const timeDiv = document.createElement('div');
//     const conditionImg = document.createElement('img');
//     conditionImg.style.width = '50px';
//     conditionImg.style.height = '50px';
//     const tempDiv = document.createElement('div');
//     forecastDiv.appendChild(timeDiv);
//     forecastDiv.appendChild(conditionImg);
//     forecastDiv.appendChild(tempDiv);
//     forecastContainer.appendChild(forecastDiv);

//     if (hourIndex < 8) {  
//       timeDiv.textContent = hours[hourIndex];
//       const image = getConditionImage(todayForecast[hourIndex].conditions);
//       if (image != null) {
//         conditionImg.src = image;
//       }
//       tempDiv.textContent = todayForecast[hourIndex].temp + "\u00B0";
//       hourIndex += 1;
//     } else {
//       const tomorrowHourIndex = hourIndex - 8;
//       timeDiv.textContent = hours[tomorrowHourIndex];
//       const image = getConditionImage(tomorrowForecast[tomorrowHourIndex].conditions);
//       if (image != null) {
//         conditionImg.src = image;
//       }
//       tempDiv.textContent = tomorrowForecast[tomorrowHourIndex].temp + "\u00B0";
//       hourIndex += 1;
//     }
//     count += 1;
//   }
// }

// userInterface();