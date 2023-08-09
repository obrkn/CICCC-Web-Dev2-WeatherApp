let autocomplete;

function onPlaceChanged() {
    const place = autocomplete.getPlace();
    document.getElementById("city-name").innerHTML = place.name;
    const latitude = place.geometry.location.lat().toFixed(4);
    document.getElementById("city-lat").innerHTML = latitude;
    const longitude = place.geometry.location.lng().toFixed(4);
    document.getElementById("city-lon").innerHTML = longitude;

    // eslint-disable-next-line no-undef
    getCurrentWeather({
        latitude,
        longitude,
    }).catch((error) => {
        console.error(error);
    });

    // eslint-disable-next-line no-undef
    forecastDailyApi({
        latitude,
        longitude,
    }).catch((error) => {
        console.error(error);
    });

    // eslint-disable-next-line no-undef
    forecastHourlyApi({
        latitude,
        longitude,
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
