import './css/styles.css';
import debounce  from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    list: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info')
}


refs.input.addEventListener('input', debounce(getCountry, DEBOUNCE_DELAY));

function getCountry() {
    clearMarkup()
    const country = refs.input.value.trim();

    if (!country) {
        clearMarkup()
        return;
    }

    fetchCountries(country)
        .then(data => {
            if (data.length > 10) {
                Notify.info('Too many matches found. Please enter a more specific name.')
            }else if (data.length > 1) {
                markupList(data)
            } else {
                markupCountry(data)
            }
        })
        .catch(error => {
        Notify.warning('Oops, there is no country with that name');
        })
}



function markupList(data) {
    const markup = data.map(country => 
        `<li><img src="${country.flags.svg}" alt="${country.name.official}" width="50"><span class="country-name"> ${country.name.official}</span></li>`
    ).join('');

    refs.list.innerHTML = markup;
}

function markupCountry(data) {
    const markup = data.map(country => 
        `<div><img src="${country.flags.svg}" alt="${country.name.official}" width="100"></div>
         <h1>${country.name.official}</h1>
         <p>Capital: ${country.capital}</p>
         <p>Population: ${country.population}</p>
         <p>Languages: ${Object.values(country.languages).join(', ')}</p>`
    ).join();

    refs.countryInfo.innerHTML = markup;    
}

function clearMarkup() {
    refs.list.innerHTML = ``;
    refs.countryInfo.innerHTML = ``;
}
