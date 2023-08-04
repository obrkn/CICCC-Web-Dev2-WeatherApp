require('dotenv').config()
const API_KEY = process.env.WEATHER_API_KEY;

const ApiTest = async () => {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Tokyo&units=metric&APPID=${API_KEY}`);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

ApiTest();