import userInterface from "./display";
export default displayHomePage;

function displayHomePage () {
  const input = document.createElement('input');
  input.type = 'search';
  input.id = 'home-search';

  const button = document.createElement('button');
  button.textContent = 'Search location';

  document.body.appendChild(input);
  document.body.appendChild(button);

  button.addEventListener('click', userInterface);
}