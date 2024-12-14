export default main;

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
    forecastToday: [0, 3, 6, 9, 12, 15, 18, 21].map(hour => ({
      temp: Math.round(data.days[0].hours[hour]?.temp) ?? 'N/A',
      conditions: data.days[0].hours[hour]?.conditions || 'Unknown',
    })),
    forecastTomorrow: [0, 3, 6, 9, 12, 15, 18, 21].map(hour => ({
      temp: Math.round(data.days[1].hours[hour]?.temp) ?? 'N/A',
      conditions: data.days[1].hours[hour]?.conditions || 'Unknown',
    })),
  };

  return processedData;
}

async function main (location) {
  try {
    const today = new Date();
    const todayString = today.toISOString();
    const tomorrow = new Date(today.setDate(today.getDate() + 1));
    const tomorrowString = tomorrow.toISOString();
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${todayString}/${tomorrowString}?key=79A79ES6BP5MNJBRSCYC6UBYQ&contentType=json&lang=id`;
    const weatherData = await getWeatherData(url);
    console.log(weatherData);
    const processedData = processWeatherData(weatherData);
    console.log(processedData);
    return processedData;

  } catch (error) {
    console.error('An error occurred in the main function:', error);
  }
}