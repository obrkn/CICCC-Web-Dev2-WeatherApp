const $cityName = document.querySelector("#city-name");
const $cityLat = document.querySelector("#city-lat");
const $cityLon = document.querySelector("#city-lon");

const cityName = $cityName.textContent;
const cityLat = $cityLat.textContent;
const cityLon = $cityLon.textContent;

const newFavoritecity = {
    name: cityName,
    lat: cityLat,
    lon: cityLon,
};

const favoriteCities = JSON.parse(localStorage.getItem("favorite")) || [];

const favoriteBtn = () => {
    const isDataExisted = favoriteCities.some(
        (favoriteCity) => favoriteCity.name === cityName,
    );
    if (isDataExisted) {
        alert("The city has already saved!!");
    } else {
        favoriteCities.push(newFavoritecity);
        localStorage.setItem("favorite", JSON.stringify(favoriteCities));
        alert("The city has saved successfully!!");
    }
    console.log(favoriteCities);
};

document.querySelector(".icon").addEventListener("click", favoriteBtn);
