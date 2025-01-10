import { userInterface, getConditionImage, isDay } from "./display";
import main from "./dataHandling";
export default displayHomePage;
// issue with timeout and style
async function displayHomePage () {
  let slideIndex = 1;
  let slideTimeoutId;
  let reloadTimeoutId;

  document.body.textContent = '';
  
  createHomePage();
  loadAndDisplayWeather();
  reloadTimeoutId = setTimeout(function () {
    loadAndDisplayWeather ();
  }, 15*60^1000);
  showSlides(slideIndex);

  const nextButtons = document.querySelectorAll('.next');
  nextButtons.forEach(nextButton => {
    nextButton.addEventListener('click', () => {
      plusSlides(1);
    });
  });

  const prevButtons = document.querySelectorAll('.prev');
  prevButtons.forEach(prevButton => {
    prevButton.addEventListener('click', () => {
      plusSlides(-1);
    });
  });

  const item1Dots = document.querySelector('#item1-dots');
  const item1DotButtons = item1Dots.querySelectorAll('.dot');
  item1DotButtons.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      currentSlide(idx+1);
    });
  });

  const item2Dots = document.querySelector('#item2-dots');
  const item2DotButtons = item2Dots.querySelectorAll('.dot');
  item2DotButtons.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      currentSlide(idx+1);
    });
  });

  const item3Dots = document.querySelector('#item3-dots');
  const item3DotButtons = item3Dots.querySelectorAll('.dot');
  item3DotButtons.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      currentSlide(idx+1);
    });
  });

  const item4Dots = document.querySelector('#item4-dots');
  const item4DotButtons = item4Dots.querySelectorAll('.dot');
  item4DotButtons.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      currentSlide(idx+1);
    });
  });

  const button = document.querySelector('#home-search-button');
  button.addEventListener('click', () => {
    clearTimeout(slideTimeoutId);
    clearTimeout(reloadTimeoutId);
    userInterface();
  });

  // Next/previous controls
  function plusSlides(n) {
    clearTimeout(slideTimeoutId);
    showSlides(slideIndex += n);
  }

  // Thumbnail image controls
  function currentSlide(n) {
    clearTimeout(slideTimeoutId);
    showSlides(slideIndex = n);
  }

  function showSlides(n) {
    let i;
    let slides = document.querySelectorAll(".slides");
    let dotsContainers = document.querySelectorAll(".dots-container");

    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }

    let dots = dotsContainers[slideIndex - 1].querySelectorAll(".dot");

    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex-1].style.display = "flex";
    dots[slideIndex-1].className += " active";
    slideTimeoutId = setTimeout(function () {
      plusSlides(1);
    }, 10*1000);
  }
}

function createHomePage () {
  const pageContainer = document.createElement('div');
  const slideshowContainer = document.createElement('div');
  slideshowContainer.classList.add('slideshow-container');
  
  const item1 = document.createElement('div');
  item1.classList.add('slides');
  item1.id = 'item1';
  const location1 = document.createElement('div');
  location1.classList.add('location');
  location1.id = 'item1-location';
  const img1 = document.createElement('img');
  img1.id = 'item1-img';
  const temp1 = document.createElement('div');
  temp1.id = 'item1-temp';
  temp1.classList.add('temp');

  const prevButton1 = document.createElement('button');
  prevButton1.textContent = '\u2190';
  prevButton1.classList.add('prev');
  const nextButton1 = document.createElement('button');
  nextButton1.textContent = '\u2192';
  nextButton1.classList.add('next');

  const item1Dots = document.createElement('div');
  item1Dots.id = 'item1-dots';
  item1Dots.classList.add('dots-container');
  const item1Dot1 = document.createElement('span');
  item1Dot1.classList.add('dot');
  const item1Dot2 = document.createElement('span');
  item1Dot2.classList.add('dot');
  const item1Dot3 = document.createElement('span');
  item1Dot3.classList.add('dot');
  const item1Dot4 = document.createElement('span');
  item1Dot4.classList.add('dot');
  item1Dots.appendChild(item1Dot1);
  item1Dots.appendChild(item1Dot2);
  item1Dots.appendChild(item1Dot3);
  item1Dots.appendChild(item1Dot4);

  item1.appendChild(location1);
  item1.appendChild(img1);
  item1.appendChild(temp1);
  item1.appendChild(prevButton1);
  item1.appendChild(nextButton1);
  item1.appendChild(item1Dots);

  const item2 = document.createElement('div');
  item2.classList.add('slides');
  item2.id = 'item2';
  const location2 = document.createElement('div');
  location2.id = 'item2-location';
  location2.classList.add('location');
  const img2 = document.createElement('img');
  img2.id = 'item2-img';
  const temp2 = document.createElement('div');
  temp2.id = 'item2-temp';
  temp2.classList.add('temp');

  const prevButton2 = document.createElement('button');
  prevButton2.textContent = '\u2190';
  prevButton2.classList.add('prev');
  const nextButton2 = document.createElement('button');
  nextButton2.textContent = '\u2192';
  nextButton2.classList.add('next');

  const item2Dots = document.createElement('div');
  item2Dots.id = 'item2-dots';
  item2Dots.classList.add('dots-container');
  const item2Dot1 = document.createElement('span');
  item2Dot1.classList.add('dot');
  const item2Dot2 = document.createElement('span');
  item2Dot2.classList.add('dot');
  const item2Dot3 = document.createElement('span');
  item2Dot3.classList.add('dot');
  const item2Dot4 = document.createElement('span');
  item2Dot4.classList.add('dot');
  item2Dots.appendChild(item2Dot1);
  item2Dots.appendChild(item2Dot2);
  item2Dots.appendChild(item2Dot3);
  item2Dots.appendChild(item2Dot4);

  item2.appendChild(location2);
  item2.appendChild(img2);
  item2.appendChild(temp2);
  item2.appendChild(prevButton2);
  item2.appendChild(nextButton2);
  item2.appendChild(item2Dots);

  const item3 = document.createElement('div');
  item3.classList.add('slides');
  item3.id = 'item3'
  const location3 = document.createElement('div');
  location3.id = 'item3-location';
  location3.classList.add('location');
  const img3 = document.createElement('img');
  img3.id = 'item3-img';
  const temp3 = document.createElement('div');
  temp3.id = 'item3-temp';
  temp3.classList.add('temp');

  const prevButton3 = document.createElement('button');
  prevButton3.textContent = '\u2190';
  prevButton3.classList.add('prev');
  const nextButton3 = document.createElement('button');
  nextButton3.textContent = '\u2192';
  nextButton3.classList.add('next');

  const item3Dots = document.createElement('div');
  item3Dots.id = 'item3-dots';
  item3Dots.classList.add('dots-container');
  const item3Dot1 = document.createElement('span');
  item3Dot1.classList.add('dot');
  const item3Dot2 = document.createElement('span');
  item3Dot2.classList.add('dot');
  const item3Dot3 = document.createElement('span');
  item3Dot3.classList.add('dot');
  const item3Dot4 = document.createElement('span');
  item3Dot4.classList.add('dot');
  item3Dots.appendChild(item3Dot1);
  item3Dots.appendChild(item3Dot2);
  item3Dots.appendChild(item3Dot3);
  item3Dots.appendChild(item3Dot4);

  item3.appendChild(location3);
  item3.appendChild(img3);
  item3.appendChild(temp3);
  item3.appendChild(prevButton3);
  item3.appendChild(nextButton3);
  item3.appendChild(item3Dots);

  const item4 = document.createElement('div');
  item4.classList.add('slides');
  item4.id = 'item4';
  const location4 = document.createElement('div');
  location4.id = 'item4-location';
  location4.classList.add('location');
  const img4 = document.createElement('img');
  img4.id = 'item4-img';
  const temp4 = document.createElement('div');
  temp4.id = 'item4-temp';
  temp4.classList.add('temp');

  const prevButton4 = document.createElement('button');
  prevButton4.textContent = '\u2190';
  prevButton4.classList.add('prev');
  const nextButton4 = document.createElement('button');
  nextButton4.textContent = '\u2192';
  nextButton4.classList.add('next');

  const item4Dots = document.createElement('div');
  item4Dots.id = 'item4-dots';
  item4Dots.classList.add('dots-container');
  const item4Dot1 = document.createElement('span');
  item4Dot1.classList.add('dot');
  const item4Dot2 = document.createElement('span');
  item4Dot2.classList.add('dot');
  const item4Dot3 = document.createElement('span');
  item4Dot3.classList.add('dot');
  const item4Dot4 = document.createElement('span');
  item4Dot4.classList.add('dot');
  item4Dots.appendChild(item4Dot1);
  item4Dots.appendChild(item4Dot2);
  item4Dots.appendChild(item4Dot3);
  item4Dots.appendChild(item4Dot4);

  item4.appendChild(location4);
  item4.appendChild(img4);
  item4.appendChild(temp4);
  item4.appendChild(prevButton4);
  item4.appendChild(nextButton4);
  item4.appendChild(item4Dots);

  slideshowContainer.appendChild(item1);
  slideshowContainer.appendChild(item2);
  slideshowContainer.appendChild(item3);
  slideshowContainer.appendChild(item4);
  
  pageContainer.appendChild(slideshowContainer);


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

async function loadAndDisplayWeather () {
  const processedData1 = await main('Los Angeles');
  const processedData2 = await main('New York');
  const processedData3 = await main('London');
  const processedData4 = await main('Tokyo');

  displayWeatherBrief(processedData1, 'item1');
  displayWeatherBrief(processedData2, 'item2');
  displayWeatherBrief(processedData3, 'item3');
  displayWeatherBrief(processedData4, 'item4');
}
  
