const $icon = document.querySelector(".icon");
const $iconFill = document.querySelector(".fill");
const $cityName = document.querySelector("#city-name");
const $cityLat = document.querySelector("#city-lat");
const $cityLon = document.querySelector("#city-lon");
const favoriteList = document.querySelector("#favorite-cities");

const cityName = $cityName.textContent;
const cityLat = $cityLat.textContent;
const cityLon = $cityLon.textContent;

const newFavoritecity = {
    name: cityName,
    lat: cityLat,
    lon: cityLon,
};

let favoriteCities = JSON.parse(localStorage.getItem("favorite")) || [];

const favoriteCitiesNames = favoriteCities.map(
    (favoriteCity) => favoriteCity.name,
);

const isDataExisted = favoriteCities.some(
    (favoriteCity) => favoriteCity.name === cityName,
);

const showfavoriteList = () => {
    for (let i = 0; i < favoriteCitiesNames.length; i++) {
        const favoriteCityName = document.createElement("option");
        favoriteCityName.textContent = favoriteCitiesNames[i];
        favoriteList.appendChild(favoriteCityName);
    }
};

const isFavorite = () => {
    if (isDataExisted) {
        $iconFill.style.display = "block";
    } else {
        $iconFill.style.display = "none";
    }
};

const favoriteBtn = () => {
    if (favoriteCities.some((favoriteCity) => favoriteCity.name === cityName)) {
        $iconFill.style.display = "none";
        const deleteFacorite = favoriteCities.filter(
            (favoriteCity) => favoriteCity.name !== cityName,
        );
        localStorage.setItem("favorite", JSON.stringify(deleteFacorite));
        favoriteCities = deleteFacorite;

        const optionToDelete = document.querySelector(
            `option[value="${cityName}"]`,
        );
        if (optionToDelete) {
            favoriteList.removeChild(optionToDelete);
        }
    } else {
        $iconFill.style.display = "block";
        favoriteCities.push(newFavoritecity);
        localStorage.setItem("favorite", JSON.stringify(favoriteCities));
        console.log(newFavoritecity);
        const newElement = document.createElement("option");
        newElement.textContent = newFavoritecity.name;
        newElement.setAttribute("value", newFavoritecity.name);
        favoriteList.appendChild(newElement);
    }
};

showfavoriteList();
isFavorite();
$icon.addEventListener("click", favoriteBtn);
