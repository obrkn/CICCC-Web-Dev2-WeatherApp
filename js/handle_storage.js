const $cityName = document.querySelector("#city-name");
const $cityLat = document.querySelector("#city-lat");
const $cityLon = document.querySelector("#city-lon");

const cityName = $cityName.textContent;
const cityLat = $cityLat.textContent;
const cityLon = $cityLon.textContent;

const favoriteCities = [
    {
        name: "",
        lat: "",
        lon: "",
    },
    {
        name: "",
        lat: "",
        lon: "",
    },
];

const favoriteBtn = () => {
    // if the city has already existed
    favoriteCities.forEach((favoriteCity) => {
        if (cityName === favoriteCity.name) {
            console.log("Already existed!!");
            return;
        } else {
            favoriteCities.push({ name: "", lat: "", lon: "" });
        }
    });

    favoriteCities[0].name = cityName;
    favoriteCities[0].lat = cityLat;
    favoriteCities[0].lon = cityLon;

    favoriteCities.forEach((favoriteCity) => {
        if (cityName === favoriteCity.name) {
            console.log("Already existed!!");
            return;
        } else {
            return;
        }
    });

    console.log(favoriteCities);
};

document.querySelector(".icon").addEventListener("click", favoriteBtn);
