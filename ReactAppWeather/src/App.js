import React from 'react';
import './App.css';
import MainWeatherWindow from './components/MainWeatherWindow';
import CityInput from './components/CityInput';
import WeatherBox from './components/WeatherBox';
  const NUM_DAYS = 5;

class App extends React.Component {
  // use destructuring to extract the required properties directly. This will make the code more concise and easier to read.

  // Use the Array.map() method: Instead of using a for loop to create the day objects, you can use the Array.map() method to create a new array with the required properties. This will also make the code more concise and easier to read.
  
  // Use a constant for the number of days: Instead of hardcoding the number of days as 5, you can use a constant to make the code more maintainable.
  state = {
    city: undefined,
    days: new Array(NUM_DAYS)
  };
  
  updateState = data => {
    const { name } = data.city;
    const dayIndices = this.getDayIndices(data);
    const days = dayIndices.slice(0, NUM_DAYS).map(index => {
      const { dt_txt, weather, main } = data.list[index];
      return {
        date: dt_txt,
        weather_desc: weather[0].description,
        icon: weather[0].icon,
        temp: main.temp
      };
    });
  
    this.setState({
      city: name,
      days: days
    });
  };
  
  // tries to make an API call with the given city name and triggers state update
  makeApiCall = async city => {
    const api_data = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=6557810176c36fac5f0db536711a6c52`
    ).then(resp => resp.json());

    if (api_data.cod === '200') {
      await this.updateState(api_data);
      return true;
    } else return false;
  };

  // returns array with Indices of the next five days in the list
  // from the API data (every day at 12:00 pm)
  // getDayIndices = data => {
  //   let dayIndices = [];
  //   dayIndices.push(0);

  //   let index = 0;
  //   let tmp = data.list[index].dt_txt.slice(8, 10);

  //   for (let i = 0; i < 4; i++) {
  //     while (
  //       tmp === data.list[index].dt_txt.slice(8, 10) ||
  //       data.list[index].dt_txt.slice(11, 13) !== '15'
  //     ) {
  //       index++;
  //     }
  //     dayIndices.push(index);
  //     tmp = data.list[index].dt_txt.slice(8, 10);
  //   }
  //   return dayIndices;
  // };

   getDayIndices = (data) => {
    const dayIndices = [0];
    const days = {};
    data.list.forEach((forecast, index) => {
      const date = forecast.dt_txt.slice(8, 10);
      if (!days[date] && forecast.dt_txt.slice(11, 13) === '15') {
        dayIndices.push(index);
        days[date] = true;
      }
    });
    return dayIndices;

  };
  
  // Instead of a while loop, we use a forEach loop to iterate over each forecast in the data array. This should be faster and more concise.
  // We use an object to keep track of the dates that have already been added to dayIndices. This avoids duplicate entries and makes the code simpler.
  // We use more descriptive variable names to make the code easier to understand.
  // We use const instead of let for variables that don't change. This is good practice and can help catch errors.
  render() {
    const WeatherBoxes = () => {
      const weatherBoxes = this.state.days.slice(1).map(day => (
        <li>
          <WeatherBox {...day} />
        </li>
      ));

      return <ul className='weather-box-list'>{weatherBoxes}</ul>;
    };

    return (
      <div className='App'>
        <header className='App-header'>
          <MainWeatherWindow data={this.state.days[0]} city={this.state.city}>
            <CityInput city={this.state.city} makeApiCall={this.makeApiCall.bind(this)} />
            <WeatherBoxes />
          </MainWeatherWindow>
        </header>
      </div>
    );
  }
}

export default App;
