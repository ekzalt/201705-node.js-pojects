const url = 'http://api.openweathermap.org/data/2.5/weather?q=Kharkiv,ua&APPID=9fea622469655366e55b7443555daae8';
const btn = document.querySelector('button');

const printWeather = data => {
  // console.log('print! :)');
  const C = 273;
  let weather = document.querySelector('.weather');
  
  weather.querySelector('.weather__img').src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  weather.querySelector('.weather__city').textContent = data.name;;
  weather.querySelector('.weather__deg').textContent = `${parseInt(data.main.temp - C)} °C`;
  weather.querySelector('.weather__wind').textContent = `${parseInt(data.wind.speed)} m/s`;
  weather.querySelector('.weather__last').textContent = new Date(data.dt * 1000).toLocaleString();
};

const httpGet = url => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();

    const xhrLoad = e => {
      console.log(e);
      if (xhr.status === 200) {
        // console.log(xhr.response);
        resolve(xhr.response);

      } else {
        let err = new Error(xhr.statusText);
        err.code = xhr.status;
        console.error(err);
        reject(err);
      }
    };

    const xhrError = err => {
      console.error('Network Error', err);
      reject( new Error('Network Error') );
    };

    xhr.open('GET', url, true);
    xhr.addEventListener('load', xhrLoad);
    xhr.addEventListener('error', xhrError);
    xhr.send();
  });
};

const showWeather = e => {
  console.log(e);
  let dataJson;

  httpGet(url)
    .then(data => {
      try {
        dataJson = JSON.parse(data);
      } catch (err) {
        throw new Error('Invalid JSON');
      }

      console.log('Weather data:', dataJson);
      printWeather(dataJson);
      return dataJson;
    })
    .catch(err => console.error(err));
};

btn.addEventListener('click', showWeather);
