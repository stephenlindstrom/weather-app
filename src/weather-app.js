import "./style.css";

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
  console.log(data);
  // Check if data and necessary nested properties exist
  if (!data || !data.currentConditions || !Array.isArray(data.days) || !data.days[0].hours) {
    console.error('Invalid data structure received');
    return null;
  }

  // Check if required properties exist or provide fallback values
  const processedData = {
    location: data.resolvedAddress || 'Unknown',
    tzoffset: data.tzoffset ?? 'N/A',
    currentConditions: data.currentConditions.conditions || 'Unknown',
    currentTemp: data.currentConditions.temp ?? 'N/A', // Use nullish coalescing for numbers since 0 is falsy
    sunrise: data.currentConditions.sunrise || 'N/A',
    sunset: data.currentConditions.sunset || 'N/A',
    forecast: [
      {
        temp: data.days[0].hours[6]?.temp ?? 'N/A', 
        conditions: data.days[0].hours[6]?.conditions || 'Unknown'
      },
      {
        temp: data.days[0].hours[9]?.temp ?? 'N/A',
        conditions: data.days[0].hours[9]?.conditions || 'Unknown'
      },
      {
        temp: data.days[0].hours[12]?.temp ?? 'N/A',
        conditions: data.days[0].hours[12]?.conditions || 'Unknown'
      },
      {
        temp: data.days[0].hours[15]?.temp ?? 'N/A',
        conditions: data.days[0].hours[15]?.conditions || 'Unknown'
      },
      {
        temp: data.days[0].hours[18]?.temp ?? 'N/A',
        conditions: data.days[0].hours[18]?.conditions || 'Unknown'
      },
    ],
  };

  return processedData;
}

async function main (location) {
  try {
    const date = new Date(Date.now()).toISOString();
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${date}?key=79A79ES6BP5MNJBRSCYC6UBYQ&contentType=json`;
    const weatherData = await getWeatherData(url);
    const processedData = processWeatherData(weatherData);
    return processedData;

  } catch (error) {
    console.error('An error occurred in the main function:', error);
  }
}

function display () {
  const searchButton = document.querySelector('button');
  const locationInput = document.querySelector('#search-location');
  const datetime = document.querySelector('#datetime');
  const location = document.querySelector('#location');
  const currentTemp = document.querySelector('#current-temp');
  searchButton.addEventListener('click', async () => {
    datetime.textContent = '';
    location.textContent = '';
    currentTemp.textContent = '';
    const searchLocation = locationInput.value;
    const processedData = await main(searchLocation);
    location.textContent = processedData.location;
    currentTemp.textContent = processedData.currentTemp;
    const date = getTimeWithOffset(processedData.tzoffset*60);
    console.log(date);
    datetime.textContent = date;
  });
}

display();

function getTimeWithOffset(offsetInMinutes) {
  // Get the current date and time in UTC
  const currentUTCDate = new Date();

  // Calculate the local time by adding the offset (convert offset to milliseconds)
  const localTime = new Date(currentUTCDate.getTime() + offsetInMinutes * 60000);

  // Format the adjusted time as a readable string
  return localTime.toISOString();
}

