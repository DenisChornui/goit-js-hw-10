import { create, createMarkUp, elms } from './marcup';

export const fetchBreeds = function () {
  return fetch(`${elms.BASE_URL}/breeds/`)
  
  .then(responce => {
    
    if (!responce.ok) {
      
      throw new Error(responce.statusText);
      
    }
   
    return responce.json();
    
  });
  
};

export const fetchCatByBreed = function (breedId) {
  return fetch(
    `${elms.BASE_URL}/images/search?breed_ids=${breedId}&api_key=${elms.APIkey}`
  ).then(responce => {
    
    if (!responce.ok) {
      throw new Error(responce.statusText);
      
    }
    return responce.json();
  });
};


