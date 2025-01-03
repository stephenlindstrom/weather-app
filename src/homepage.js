import { userInterface, getConditionImage, isDay } from "./display";
import main from "./dataHandling";
export default displayHomePage;

async function displayHomePage () {
  document.body.textContent = '';
  
  const processedData1 = await main('Los Angeles');
  const processedData2 = await main('New York');
  const processedData3 = await main('London');
  const processedData4 = await main('Tokyo'); 

  createHomePage();
  displayWeatherBrief(processedData1, 'item1');
  displayWeatherBrief(processedData2, 'item2');
  displayWeatherBrief(processedData3, 'item3');
  displayWeatherBrief(processedData4, 'item4');

  const button = document.querySelector('#home-search-button');
  button.addEventListener('click', userInterface);
}

function createHomePage () {
  const pageContainer = document.createElement('div');
  pageContainer.classList.add('page-container');
  const gridContainer = document.createElement('div');
  gridContainer.classList.add('grid-container');
  pageContainer.appendChild(gridContainer);

  const item1 = document.createElement('div');
  item1.id = 'item1';
  const location1 = document.createElement('div');
  location1.id = 'item1-location';
  const img1 = document.createElement('img');
  img1.id = 'item1-img';
  const temp1 = document.createElement('div');
  temp1.id = 'item1-temp';
  item1.appendChild(location1);
  item1.appendChild(img1);
  item1.appendChild(temp1);

  const item2 = document.createElement('div');
  item2.id = 'item2';
  const location2 = document.createElement('div');
  location2.id = 'item2-location';
  const img2 = document.createElement('img');
  img2.id = 'item2-img';
  const temp2 = document.createElement('div');
  temp2.id = 'item2-temp';
  item2.appendChild(location2);
  item2.appendChild(img2);
  item2.appendChild(temp2);

  const item3 = document.createElement('div');
  item3.id = 'item3'
  const location3 = document.createElement('div');
  location3.id = 'item3-location';
  const img3 = document.createElement('img');
  img3.id = 'item3-img';
  const temp3 = document.createElement('div');
  temp3.id = 'item3-temp';
  item3.appendChild(location3);
  item3.appendChild(img3);
  item3.appendChild(temp3);

  const item4 = document.createElement('div');
  item4.id = 'item4';
  const location4 = document.createElement('div');
  location4.id = 'item4-location';
  const img4 = document.createElement('img');
  img4.id = 'item4-img';
  const temp4 = document.createElement('div');
  temp4.id = 'item4-temp';
  item4.appendChild(location4);
  item4.appendChild(img4);
  item4.appendChild(temp4);

  gridContainer.appendChild(item1);
  gridContainer.appendChild(item2);
  gridContainer.appendChild(item3);
  gridContainer.appendChild(item4);

  const input = document.createElement('input');
  input.type = 'search';
  input.id = 'home-search';

  const button = document.createElement('button');
  button.id ='home-search-button';
  button.textContent = 'Search location';

  pageContainer.appendChild(input);
  pageContainer.appendChild(button);
  document.body.appendChild(pageContainer);
}  
  
function displayWeatherBrief (processedData, item) {
  const location = document.querySelector(`#${item}-location`);
  const temp = document.querySelector(`#${item}-temp`);
  location.textContent = '';
  temp.textContent = '';
  location.textContent = processedData.location;
  temp.textContent = processedData.currentTemp + '\u00B0';

  const img = document.querySelector(`#${item}-img`);
  const imageSrc = getConditionImage(processedData.currentConditions);
  if (imageSrc != null) {
    img.src = imageSrc;
  }
  const daytime = isDay(processedData.sunrise, processedData.sunset, processedData.timezone);
  const itemContainer = document.querySelector(`#${item}`)
  if (daytime) {
    itemContainer.style.background = "linear-gradient(rgb(89, 202, 240), rgb(64, 201, 243))";
  } else {
    itemContainer.style.background = "linear-gradient(rgb(33, 4, 100), rgb(19, 3, 49))";
  }
}

let slideIndex = 1;
let timeoutId;
showSlides(slideIndex);


const nextButton = document.querySelector(".next");
nextButton.addEventListener("click", () => {
  plusSlides(1);
});

const prevButton = document.querySelector(".prev");
prevButton.addEventListener("click", () => {
  plusSlides(-1);
});

const dotButtons = document.querySelectorAll(".dot");
dotButtons.forEach((dot, idx) => {
  dot.addEventListener("click", () => {
    currentSlide(idx+1);
  });
});

// Next/previous controls
function plusSlides(n) {
  clearTimeout(timeoutId);
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  clearTimeout(timeoutId);
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.querySelectorAll(".slides");
  let dots = document.querySelectorAll(".dot");

  if (n > slides.length) { slideIndex = 1; }
  if (n < 1) { slideIndex = slides.length; }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  timeoutId = setTimeout(function () {
     plusSlides(1);
   }, 5000);
}