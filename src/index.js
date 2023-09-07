import axios from "axios";
import {fetchBreeds, fetchCatByBreed} from "./cat-api"

axios.defaults.headers.common["x-api-key"] = 
"live_fa33HqTiZIJcKbQBWNtw70LpTUY5HukjFC2et4u0KCvTkBcNxGaxomcWlFlUCUcD";

const selection = document.querySelector(".breed-select");

fetchBreeds()

selection.addEventListener("change", fetchCatByBreed);








