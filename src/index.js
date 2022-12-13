import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const DEBOUNCE_DELAY = 300;

form = document.querySelector('#search-box');
countryList = document.querySelector('.country-list');
countryInfo = document.querySelector('.country-info');

form.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
    const name = e.target.value.trim();
    
    countryInfo.innerHTML = '';

    fetchCountries(name)
        .then(country => {
        if (country.length > 10) {
            return Notiflix.Notify.info
                ('Too many matches found. Please enter a more specific name.');
        }  else
            {
            createCountryList(country);
        }
    }).catch(error =>
        Notiflix.Notify.info('Oops, there is no country with that name'));
};

function createCountryInfo(country) {
    const markup = country.map(({ name, capital, population,flags, languages }) => {
        return `
        <div class = country_container ><img src="${flags.svg}" width="150px" alt="${name.official}">
        <p class = country_title>${name.official}</p> </div>
        <p > Capital: <span>${capital}</span></p>
        <p > Population: <span>${population}</span></p>
        <p > Languages: <span>${Object.values(
          languages
        )}</span></p>
        </div>`;
    }) .join('');
    countryInfo.innerHTML = markup;
    countryList.innerHTML = '';
};

function createCountryList(country) {
    const markup = country
        .map(({ name, flags }) => {
            return `
            <li class = country_item>
            <img class = country_img src="${flags.svg}" alt="Flag of ${name.official}" width="50" hight="200">
            <p class = country_name>${name.official}</p>
            </li>
        `;
        }).join('');
    
        
    countryList.innerHTML = markup;
    if (country.length === 1) {
            createCountryInfo(country);
            }
   
}