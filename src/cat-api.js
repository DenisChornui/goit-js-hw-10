import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
const PRIVATE_KEY =
  'live_fa33HqTiZIJcKbQBWNtw70LpTUY5HukjFC2et4u0KCvTkBcNxGaxomcWlFlUCUcD';

const searchInfo = {
  headers: { 'x-api-key': PRIVATE_KEY },
};

const elements = {
  loader : document.querySelector('.loader'),
  selection : document.querySelector('.breed-select'),
  errorBlock : document.querySelector('.error'),
  catInfo : document.querySelector('.cat-info'),
}


elements.loader.style.display = 'none';

export function fetchBreeds() {
  elements.loader.style.display = 'block';

  fetch('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json();
    })
    .then(data => {
      elements.loader.style.display = 'none';
      data.forEach(element => {
        const option = `<option value="${element.id}">${element.name}</option>`;
        elements.selection.insertAdjacentHTML('beforeend', option);
      });
      new SlimSelect({
        select: '#cats',
      });
    })
    .catch(error => {
      elements.loader.style.display = 'none';
      elements.errorBlock.style.color = 'red';
      elements.errorBlock.error.innerHTML =
        'Oops! Something went wrong! Try reloading the page!';
    });
}

export function fetchCatByBreed(event) {
  elements.errorBlock.setAttribute('hidden', '');
  elements.catInfo.style.display = 'none';
  elements.loader.style.display = 'block';

  const breed = event.target.value;

  fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breed}`, searchInfo)
    .then(response => {
      if (!response.ok) {
        throw new Error('Oops! Something went wrong! Try reloading the page!');
      }
      elements.errorBlock.setAttribute('hidden', '');
      return response.json();
    })
    .then(data => {
      elements.catInfo.innerHTML = ``
      const markUp = `<div class="text">
      <h1 class="title">${data[0].breeds[0].name}</h1>
      <p class="text-description">${data[0].breeds[0].description}</p>
      <p class="text-temperament"><b>Temperament: </b>${data[0].breeds[0].temperament}</p></div>`

      const image = new Image();
      image.src = data[0].url;
      image.width =  500;
      image.height = 500;
      image.onload = function () {
          elements.catInfo.innerHTML = markUp
          elements.catInfo.appendChild(image);
          elements.loader.style.display = "none";
      }

      elements.catInfo.style.display = "flex"
  })

    .catch(error => {
      elements.errorBlock.removeAttribute('hidden');
      elements.loader.style.display = 'none';
      elements.errorBlock.style.color = 'red';
      elements.errorBlock.innerHTML =
        'Oops! Something went wrong! Try reloading the page!';
        elements.catInfo.setAttribute('hidden', '');
    });
}






