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

function getCurrentTemp (data) {
  return data.currentConditions.temp;
}

async function main (location) {
  try {
    const date = new Date(Date.now()).toISOString();
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${date}?key=79A79ES6BP5MNJBRSCYC6UBYQ&contentType=json`;
    const weatherData = await getWeatherData(url);
    const currentTemp = getCurrentTemp(weatherData);
    return currentTemp;

  } catch (error) {
    console.error('An error occurred in the main function:', error);
  }
}

function display () {
  const searchButton = document.querySelector('button');
  const locationInput = document.querySelector('#location');
  const displayDiv = document.createElement('div');
  document.body.appendChild(displayDiv);
  searchButton.addEventListener('click', async () => {
    const location = locationInput.value;
    const temp = await main(location);
    console.log(temp); // temp is a promise so need to use await
    displayDiv.textContent = temp;
  });
}

display();

