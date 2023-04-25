import React from 'react';
import './WeatherBox.css';
import PropTypes from 'prop-types';
export default class WeatherBox extends React.Component {
  // returns weekday to a given Date value


  static propTypes = {
    date: PropTypes.string.isRequired,
    icon: PropTypes.string,
    temp: PropTypes.number.isRequired,
  };

  // returns weekday to a given Date value
  getDay = (date) => {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayIndex = new Date(date).getDay();
    return weekdays[dayIndex];
  };
 

  render(props) {
    return (
      <div className='weather-box'>
        <h1>{this.props.date ? this.getDay(this.props.date) : ''}</h1>
        <img
          src={
            this.props.icon
              ? require(`../images/${this.props.icon}.svg`)
              : require('../images/01d.svg')
          }
          alt='sun'
        />
        <span className='temp'>{Math.round(this.props.temp - 273.15)}°C</span>
      </div>
    );
  }
}




