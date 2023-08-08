let autocomplete;

function onPlaceChanged() {
    const place = autocomplete.getPlace();
    document.getElementById("city-name").innerHTML = place.name;
    document.getElementById("city-lat").innerHTML = place.geometry.location
        .lat()
        .toFixed(4);
    document.getElementById("city-lon").innerHTML = place.geometry.location
        .lng()
        .toFixed(4);
}

// eslint-disable-next-line no-unused-vars
function initAutocomplete() {
    // eslint-disable-next-line no-undef
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById("search-bar"),
        {
            types: ["(cities)"],
            // fields: ["geometry.location", "name"],
        },
    );
    autocomplete.addListener("place_changed", onPlaceChanged);
}
