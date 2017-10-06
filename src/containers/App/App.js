import React, { Component } from 'react';
import { myKey } from '../../dark-sky-api-key';
import axios from 'axios';
import moment from 'moment';
import './App.scss';
import InputFields from '../../components/InputFields/InputFields';
import Button from '../../components/Button/Button';

import ClearDay from '../../images/clear-day.svg';
import ClearNight from '../../images/clear-night.svg';
import PartlyCloudyDay from '../../images/partly-cloudy-day.svg';
import PartlyCloudyNight from '../../images/partly-cloudy-night.svg';
import Cloudy from '../../images/cloudy.svg';
import Rain from '../../images/rain.svg';
import Sleet from '../../images/sleet.svg';
import Snow from '../../images/snow.svg';
import Wind from '../../images/wind.svg';
import Fog from '../../images/fog.svg';


class App extends Component {

  constructor() {
    super();

    this.state = {
      currentTime: '',
      timezone: '',
      currentTemperature: '',
      weatherIcon: '',
      latitude: '',
      longitude: ''
    }

    this._handleInput = this._handleInput.bind(this);
    this._fetchWeatherData = this._fetchWeatherData.bind(this);
    this._submitCoordinates = this._submitCoordinates.bind(this);
  }

  _handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  _fetchWeatherData(latitude, longitude) {
    return axios.get(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${myKey}/${latitude},${longitude}?exclude=daily,minutely,alerts,flags`);
  }

  _submitCoordinates(e) {
    e.preventDefault();
    this._fetchWeatherData(this.state.latitude, this.state.longitude)
      .then(response => {
        this.setState({
          currentTime: moment.unix(response.data.currently.time).format('MMMM D, YYYY'),
          timezone: response.data.timezone,
          currentTemperature: response.data.currently.temperature,
          weatherIcon: response.data.currently.icon
        })
      })
      .catch(error => {
        console.log(error);
      });
  }

  _renderWeatherIcons() {

    const icons = [
      { weather: 'clear-day', image: ClearDay, styles: 'rotating-sun' },
      { weather: 'clear-night', image: ClearNight, styles: 'rocking-moon' },
      { weather: 'partly-cloudy-day', image: PartlyCloudyDay, styles: 'disappearing-sun' },
      { weather: 'partly-cloudy-night', image: PartlyCloudyNight, styles: 'disappearing-moon' },
      { weather: 'cloudy', image: Cloudy, styles: 'heavy-clouds' },
      { weather: 'rain', image: Rain, styles: 'falling-rain' },
      { weather: 'sleet', image: Sleet, styles: 'snow-rain-combo' },
      { weather: 'snow', image: Snow, styles: 'snow-fall' },
      { weather: 'wind', image: Wind, styles: 'gusty-winds' },
      { weather: 'fog', image: Fog, styles: 'dense-fog' }
    ];

    return icons.map((item, index) => {
      if(this.state.weatherIcon === item.weather) {
        return (
          <div className='weather-icon' key={ index }>
            <img className={ item.styles } src={ item.image } alt='weather icon' />
          </div>
        )
      } else {
        return null;
      }
    });
  }

  render() {
    return (
      <div className='app'>
        <h1>Weather Forecast</h1>
        <div className='form'>
          <InputFields
            latitude={ this.state.latitude }
            longitude={ this.state.longitude }
            handleInput={ this._handleInput }
          />
          <Button
            submitCoordinates={ this._submitCoordinates }
          />
        </div>
        { this.state.currentTime !== '' ?
          <div className='weather-info'>
            <p>Region: { this.state.timezone }</p>
            <p>Date: { this.state.currentTime }</p>
            <p>Current Temperature: { this.state.currentTemperature } &#8457;</p>
            { this._renderWeatherIcons() }
          </div>
          :
          null
        }
      </div>
    );
  }
}

export default App;
