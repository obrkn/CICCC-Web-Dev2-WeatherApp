/**
 *
 * @param {{lat: string; lon: string; }} param
 * @return {void}
 */
const forecastDailyApi = async ({ lat, lon }) => {
    const API_KEY = "9c6c9f9d647a782c8d910a14542ffff5";

    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`;
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

    let currentDate = 0;
    const groupByDate = {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
    };
    for (let i = 0; i < list.length; i++) {
        const d = list[i];
        if (i === 0) {
            groupByDate[currentDate].push(d);
        } else {
            if (
                new Date(list[i - 1].dt_txt).getDay() !==
                new Date(d.dt_txt).getDay()
            ) {
                currentDate++;
            }
            if (currentDate > 4) {
                break;
            }
            groupByDate[currentDate].push(d);
        }
    }

    const summaryOfEachDays = Object.values(groupByDate).map((data) => {
        const res = {
            day: {
                0: "Sun",
                1: "Mon",
                2: "Tue",
                3: "Wed",
                4: "Thr",
                5: "Fri",
                6: "Sat",
            }[new Date(data[0].dt_txt).getDay()],
            weatherIcon: "",
            temp_max: Number.MIN_SAFE_INTEGER,
            temp_min: Number.MAX_SAFE_INTEGER,
            pop: 0,
            windSpeed: 0,
        };
        for (const d of data) {
            // get weather icon of 12:00 p.m.
            if (new Date(d.dt_txt).getHours() === 12) {
                res.weatherIcon = d.weather[0].icon;
            }
            if (res.temp_max < d.main.temp_max) {
                res.temp_max = d.main.temp_max;
            }
            if (res.temp_min > d.main.temp_min) {
                res.temp_min = d.main.temp_min;
            }
        }
        return {
            day: res.day,
            weatherIcon: res.weatherIcon,
            temp_max: res.temp_max,
            temp_min: res.temp_min,
        };
    });
    for (let i = 0; i < summaryOfEachDays.length; i++) {
        const data = summaryOfEachDays[i];

        const card = document.querySelectorAll("#daily .card").item(i);
        const pTags = card.querySelectorAll("p");
        // day
        pTags.item(0).textContent = data.day;
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
    navigator.geolocation.getCurrentPosition(
        (position) => {
            param.lat = position.coords.latitude;
            param.lng = position.coords.longitude;
        },
        (error) => {
            console.error(error);
        },
        {},
    );

    forecastDailyApi(param).catch((error) => {
        console.error(error);
    });
})();
