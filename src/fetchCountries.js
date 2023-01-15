
const BASE_URL = 'https://restcountries.com/v3.1/name/';

export function fetchCountries(country) {
    return fetch(`${BASE_URL}${country}?fields=name,capital,population,flags,languages`)
        .then(resp => {
            if (!resp.ok) {
                throw new Error('Country not found');
            }
            return resp.json();
        });
};
