let autocomplete;

function onPlaceChanged() {
    const place = autocomplete.getPlace();
    document.getElementById("city-name").innerHTML = place.name;
    const lat = place.geometry.location.lat().toFixed(4);
    document.getElementById("city-lat").innerHTML = lat;
    const lon = place.geometry.location.lng().toFixed(4);
    document.getElementById("city-lon").innerHTML = lon;

    // eslint-disable-next-line no-undef
    getCurrentWeather({
        latitude: lat,
        longitude: lon,
    }).catch((error) => {
        console.error(error);
    });

    // eslint-disable-next-line no-undef
    forecastDailyApi({
        lat,
        lon,
    }).catch((error) => {
        console.error(error);
    });

    // eslint-disable-next-line no-undef
    forecastHourlyApi({
        lat,
        lon,
        targetIndex: 0,
    }).catch((error) => {
        console.error(error);
    });
}

// eslint-disable-next-line no-unused-vars
function initAutocomplete() {
    // eslint-disable-next-line no-undef
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById("search-bar"),
        {
            types: ["(cities)"],
            fields: ["geometry.location", "name"],
        },
    );
    autocomplete.addListener("place_changed", onPlaceChanged);
}
