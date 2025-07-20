document.addEventListener('DOMContentLoaded', () => {
    
    fetch('https://restcountries.com/v3/all') 
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta de la API');
            }
            return response.json();
        })
        .then(data => {
            
            data.sort((a, b) => a.name.common.localeCompare(b.name.common));

            const countriesList = document.getElementById('countries-list');
            if (!countriesList) {
                console.error('No se encontró el elemento #countries-list');
                return;
            }

            data.forEach(country => {
                const countryDiv = document.createElement('div');
                countryDiv.classList.add('country');
                countryDiv.innerHTML = `
                    <img src="${country.flags.svg}" alt="${country.name.common}">
                    <p>${country.name.common}</p>
                `;
                countryDiv.addEventListener('click', () => showInfo(country));
                countriesList.appendChild(countryDiv);
            });
        })
        .catch(error => {
            console.error('Error al cargar los datos:', error);
            const countriesList = document.getElementById('countries-list');
            countriesList.innerHTML = '<p>Error al cargar los países. Revisa la consola.</p>';
        });
});

function showInfo(country) {
    const popup = document.createElement('div');
    popup.classList.add('info-popup');
    popup.innerHTML = `
        <h2>${country.name.common}</h2>
        <img src="${country.flags.svg}" alt="${country.name.common}" style="max-width: 100px;">
        <p>Capital: ${country.capital ? country.capital[0] : 'N/A'}</p>
        <p>Población: ${country.population ? country.population.toLocaleString() : 'N/A'}</p>
        <p>Lado de la carretera: ${country.car ? country.car.side : 'N/A'}</p>
        <button class="close-btn" onclick="this.parentElement.style.display='none'">Cerrar</button>
    `;
    document.body.appendChild(popup);
    popup.style.display = 'block';
}