/**
 *
 * @param {{latitude: string; longitude: string; }} param
 * @return {void}
 */
const getCurrentWeather = async ({ latitude, longitude }) => {
    try {
        const API_KEY = "9c6c9f9d647a782c8d910a14542ffff5";

        const data = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_KEY}`,
        );
        const res = await data.json();
        const weatherIcon = res.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
        const card = document.querySelector("#current .card");
        const img = card.querySelector("img");
        const temp = card.querySelector(".temp");
        const humidity = card.querySelector(".humidity");
        const wind = card.querySelector(".wind");

        img.setAttribute("src", iconUrl);
        temp.textContent = Math.round(res.main.temp) + "°F";
        humidity.textContent = Math.round(res.main.humidity) + "%";
        wind.textContent = Math.round(res.wind.speed) + "mph";
    } catch (err) {
        console.log(err);
    }
};

(() => {
    const VANCOUVER_LAT = "49.2827";
    const VANCOUVER_LON = "-123.1207";

    navigator.geolocation.getCurrentPosition(
        (position) => {
            getCurrentWeather({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            }).catch((error) => {
                console.error(error);
            });
        },
        () => {
            getCurrentWeather({
                latitude: VANCOUVER_LAT,
                longitude: VANCOUVER_LON,
            }).catch((error) => {
                console.error(error);
            });
        },
    );
})();
