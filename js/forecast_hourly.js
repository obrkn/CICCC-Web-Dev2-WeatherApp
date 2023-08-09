/**
 *
 * @param {{lat: string; lon: string; targetIndex: number; }} param
 * @return {void}
 */
const forecastHourlyApi = async ({ lat, lon, targetIndex }) => {
    const API_KEY = "9c6c9f9d647a782c8d910a14542ffff5";

    const VANCOUVER_LAT = "49.2827";
    const VANCOUVER_LON = "-123.1207";

    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${
        lat ?? VANCOUVER_LAT
    }&lon=${lon ?? VANCOUVER_LON}&units=imperial&appid=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
        console.warn({
            message: await response.text(),
            url,
            status: response.status,
        });
        return;
    }
    const { list } = await response.json();

    const dataEveryThreeHours = [];
    let currentDateIndex = 0;
    for (let i = 0; i < list.length; i++) {
        const d = list[i];
        if (
            i !== 0 &&
            new Date(list[i - 1].dt_txt).getDay() !==
                new Date(d.dt_txt).getDay()
        ) {
            currentDateIndex++;
        }
        if (currentDateIndex === targetIndex) {
            dataEveryThreeHours.push({
                time: {
                    0: "0-3",
                    3: "3-6",
                    6: "6-9",
                    9: "9-12",
                    12: "12-15",
                    15: "15-18",
                    18: "18-21",
                    21: "21-0",
                }[new Date(d.dt_txt).getHours()],
                weatherIcon: d.weather[0].icon,
                temp_max: d.main.temp_max,
                temp_min: d.main.temp_min,
            });
        }
    }

    for (let i = 0; i < dataEveryThreeHours.length; i++) {
        const data = dataEveryThreeHours[i];

        const card = document.querySelectorAll("#hourly .card").item(i);
        const pTags = card.querySelectorAll("p");
        // day
        pTags.item(0).textContent = data.time;
        // image of weather
        card.querySelector("img").setAttribute(
            "src",
            // https://openweathermap.org/weather-conditions
            `https://openweathermap.org/img/wn/${data.weatherIcon}@2x.png`,
        );
        // temperature
        pTags.item(1).textContent = `${Math.round(data.temp_max)}/${Math.round(
            data.temp_min,
        )}°F`;
    }
};

(() => {
    const VANCOUVER_LAT = "49.2827";
    const VANCOUVER_LON = "-123.1207";
    const param = {
        lat: VANCOUVER_LAT,
        lon: VANCOUVER_LON,
    };
    navigator.geolocation.getCurrentPosition((position) => {
        param.lat = position.coords.latitude;
        param.lng = position.coords.longitude;
    });

    forecastHourlyApi({
        ...param,
        targetIndex: 0,
    }).catch((error) => {
        console.error(error);
    });
})();

document.querySelectorAll("#daily .card").forEach((card, index) => {
    card.addEventListener("click", (event) => {
        event.preventDefault();
        forecastHourlyApi({
            lat: undefined,
            lon: undefined,
            targetIndex: index,
        }).catch((error) => {
            console.error(error);
        });
    });
});
