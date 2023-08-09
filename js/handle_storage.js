const $icon = document.querySelector(".icon");
const $iconFill = document.querySelector(".fill");
let $cityName = document.querySelector("#city-name");
let $cityLat = document.querySelector("#city-lat");
let $cityLon = document.querySelector("#city-lon");
const favoriteList = document.querySelector("#favorite-cities");

let cityName = $cityName.textContent;
let cityLat = $cityLat.textContent;
let cityLon = $cityLon.textContent;

let favoriteCities = JSON.parse(localStorage.getItem("favorite")) || [];

const isDataExisted = () =>
    favoriteCities.some((favoriteCity) => favoriteCity.name === cityName);

const showfavoriteList = () => {
    for (let i = 0; i < favoriteCities.length; i++) {
        const favoriteCityName = document.createElement("option");
        favoriteCityName.textContent = favoriteCities[i].name;
        favoriteCityName.setAttribute("value", favoriteCities[i].name);
        favoriteList.appendChild(favoriteCityName);
    }
};

const isFavorite = () => {
    if (isDataExisted()) {
        $iconFill.style.display = "block";
    } else {
        $iconFill.style.display = "none";
    }
};

const updateFavoriteCities = () => {
    favoriteCities = JSON.parse(localStorage.getItem("favorite")) || [];
};

const favoriteBtn = () => {
    updateFavoriteCities();
    updateCityData();

    if (isDataExisted()) {
        removeCityFromFavorites();
    } else {
        addCityToFavorites();
    }
    toggleIconStyle();
};

const updateCityData = () => {
    $cityName = document.querySelector("#city-name");
    $cityLat = document.querySelector("#city-lat");
    $cityLon = document.querySelector("#city-lon");
    cityName = $cityName.textContent;
    cityLat = $cityLat.textContent;
    cityLon = $cityLon.textContent;
};

const removeCityFromFavorites = () => {
    favoriteCities = favoriteCities.filter(
        (favoriteCity) => favoriteCity.name !== cityName,
    );
    localStorage.setItem("favorite", JSON.stringify(favoriteCities));
    updateFavoriteList();
};

const updateFavoriteList = () => {
    favoriteList.innerHTML = "";
    showfavoriteList();
};

const addCityToFavorites = () => {
    favoriteCities.push({
        name: cityName,
        lat: cityLat,
        lon: cityLon,
    });
    localStorage.setItem("favorite", JSON.stringify(favoriteCities));
    updateFavoriteList();
};

const toggleIconStyle = () => {
    $iconFill.style.display =
        $iconFill.style.display === "block" ? "none" : "block";
};

const cityNameChangedCallback = () => {
    updateCityData();
    isFavorite();
};

const observer = new MutationObserver(cityNameChangedCallback);
const config = { characterData: true, subtree: true, childList: true };
observer.observe($cityName, config);

showfavoriteList();
isFavorite();
$icon.addEventListener("click", favoriteBtn);
