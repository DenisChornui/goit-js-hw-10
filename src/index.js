import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { elms, createMarkUp, create } from './marcup';

fetchBreeds()
  .then(data => (elms.select.innerHTML = createMarkUp(data)))
  .catch(error => {
    console.log(error);
    elms.errorText.classList.replace('error-hiden', 'error');
    elms.loader.classList.replace('loader', 'loader-hiden');
  });

elms.select.addEventListener('change', elms.select.onchange);
elms.select.onchange = function (event) {
  event.preventDefault();
  let item = elms.select.value;

  fetchCatByBreed(item)
    .then(
      data => (elms.list.innerHTML = create(data[0])),
      elms.errorText.classList.replace('error', 'error-hiden'),
      
    )

    .catch(error => {
      console.log(error);
      elms.errorText.classList.replace('error-hiden', 'error');
    });
  elms.loader.classList.replace('loader-hiden', 'loader');
  elms.list.classList.replace('cat-info', 'cat-info-hiden');
};







