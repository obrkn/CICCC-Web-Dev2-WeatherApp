// テスト用
// console.log(CurrentWeather('49.2827', '-123.1207'));

const latitude = '49.2827';
const longtitude = '-123.1207';
const API_KEY = '9c6c9f9d647a782c8d910a14542ffff5';


const getCurrentWeather = async () => {
       try {
              const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&appid=${API_KEY}`);
              const res = await data.json();
              console.log(res);
       } catch (err) {
              console.log(err); 
       }
}

getCurrentWeather();