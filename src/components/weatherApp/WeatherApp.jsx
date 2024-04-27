import React from 'react';
import "./weatherApp.css";
import clear from "../Assets/clear.png"
import cloud from "../Assets/cloud.png"
import drizzle from "../Assets/drizzle.png"
import humidity from "../Assets/humidity.png"
import rain from "../Assets/rain.png"
import searchIcon from "../Assets/search.png"
import snow from "../Assets/snow.png"
import wind from "../Assets/wind.png"
import { useState } from 'react';

const WeatherApp = () => {

    let api_key = "cf4c3de6aae8abdd7e0617fd7f5450e3";

    const [Wicon, setWicon] = useState(cloud); 

    const search = async () => {

        const element = document.getElementsByClassName("city-input")
        if (element[0].value === "") {
            return 0;
        }

        console.log(element[0].value)
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`
    
    
        let response = await fetch(url);
        let data = await response.json();
        const humidity = document.getElementsByClassName("humidity-percentage");
        const wind = document.getElementsByClassName("wind-rate");
        const temperature = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");
    
        humidity[0].innerHTML = data.main.humidity + "%";
        wind[0].innerHTML = Math.floor(data.wind.speed )+ "km/h";
        temperature[0].innerHTML = Math.floor(data.main.temp) + "°c";
        location[0].innerHTML = data.name;
    
    
        if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
            setWicon(clear);
        }
        else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
            setWicon(cloud);
        }
        else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
            setWicon(drizzle);
        }
        else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
            setWicon(drizzle);
        }
        else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
            setWicon(rain);
        }
        else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
            setWicon(rain);
        }
        else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
            setWicon(snow);
        }
        else  {
            setWicon(clear);
        }
    }

    return (
        <div className='container'>
            <div className="topbar">
                <div className="search-icon">
                <input type="text" className="city-input" placeholder='City Name'/>
                    <button className='button' onClick={() => {
                        search()
                    }}>
                        Search
                    </button>
                </div>
            </div>
           
            <div className="weather-image">
                <img src={Wicon} alt="" />
            </div>
            <div className="weather-temp">24°C</div>
            <div className="weather-location">London</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity} alt="" className='icon' />
                    <div className="data">
                        <div className="humidity-percentage">64%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind} alt="" className='icon' />
                    <div className="data">
                        <div className="wind-rate">18 km/h</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default WeatherApp