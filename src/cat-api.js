const PRIVATE_KEY =
  'live_fa33HqTiZIJcKbQBWNtw70LpTUY5HukjFC2et4u0KCvTkBcNxGaxomcWlFlUCUcD';

const searchInfo = {
  headers: { 'x-api-key': PRIVATE_KEY },
};

const elements = {
  breedSelect: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};
// loader.style.display = "none";

function fetchBreeds() {
  // loader.style.display = "block";

  fetch("https://api.thecatapi.com/v1/breeds")
  .then(respons => {
    if(!respons.ok){
        thow new Error(respons.statusText)
    } 

    return respons.json()
  })
}

fetchBreeds()