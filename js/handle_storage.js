const $icon = document.querySelector(".icon");
const $iconFill = document.querySelector(".fill");
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

let favoriteCities = JSON.parse(localStorage.getItem("favorite")) || [];

const isDataExisted = favoriteCities.some(
    (favoriteCity) => favoriteCity.name === cityName,
);

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
    } else {
        $iconFill.style.display = "block";
        favoriteCities.push(newFavoritecity);
        localStorage.setItem("favorite", JSON.stringify(favoriteCities));
        alert("The city has saved successfully!!");
    }
};

isFavorite();
$icon.addEventListener("click", favoriteBtn);
