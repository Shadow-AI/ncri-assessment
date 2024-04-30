import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import '../css/App.css';

import {useEffect, useState} from "react";
import ForecastPanel from "./ForecastPanel.jsx";
import CentralPanel from "./CentralPanel.jsx";

import weatherCodeMapping from "../assets/weatherCodes.json";

// design inspiration
// https://dribbble.com/shots/21260336-Weather-App-UI-UX-Design

/**
 * App component that serves as the main entry point for the application.
 */
function App() {
    // for current location of user, default 0,0
    const [currentLocation, setCurrentLocation] = useState({latitude: 0, longitude: 0});

    const [location, setLocation] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [latlng, setLatlng] = useState("");
    const [weatherItemToday, setWeatherItemToday] = useState({});
    const [weatherItems5Day, setWeatherItems5Day] = useState([]);

    // api calls
    const base_url = 'https://api.tomorrow.io/v4/weather/forecast?apikey=86PXB6dOg6euSSy3mHhHz0lfPy5ank4w';

    /** It returns a promise that resolves to an object containing the weather data.
     *
     * @param {string} user_location - The location to fetch weather data for. Default is the current location's latitude and longitude.
     * @param {string} units - The units to use for the weather data. Default is "metric".
     * @param {string} timesteps - The timesteps to use for the weather data. Default is "1d".
     * @return {Promise} - A promise that resolves to an object containing the weather data.
     */
    const call_api = (user_location = `${currentLocation.latitude},${currentLocation.longitude}`,
                      units = "metric",
                      timesteps = "1d") => {

        let locale = "";
        let state = "";
        let country = "";
        let latlng = ""
        let weatherItemToday = {};
        let weatherItems5Day = {};

        /**
         * checkIfNumber function that checks if a string is a number.
         * @param {string} str - The string to check.
         * @return {boolean} - True if the string is a number, false otherwise.
         */
        const checkIfNumber = (str) => {
            return !isNaN(parseFloat(str));
        }

        return fetch(`${base_url}&location=${encodeURIComponent(user_location)}&units=${encodeURIComponent(units)}&timesteps=${encodeURIComponent(timesteps)}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let location = data.location.name || null;
                if (location) {
                    // location is csv
                    // get first name as location if text
                    // last entry as the country
                    // second last is the state, if not number.
                    location = location.split(",");
                    locale = location[0];
                    state = (checkIfNumber(location[location.length - 2]) ? // check if second last value is a number.
                        location[location.length - 3] : // if it is a number, that means it is a zip, so take third last
                        location[location.length - 2]); // else take second last
                    country = location[location.length - 1];
                }
                latlng = data.location.lat + "," + data.location.lon;

                // get weather items
                /**
                 * minifyJSON function that takes a weather item and returns a minified version of it with only relevant info.
                 * @param {object} item - A weather item object.
                 * @returns {object} - A minified weather item object.
                 */
                const minifyJSON = (item) => {
                    console.log(item.values);
                    const weatherCodes = [item.values.weatherCodeMin, item.values.weatherCodeMax];
                    const weatherCode = weatherCodes[0];
                    let weatherDescription;
                    if (weatherCodes[0] === weatherCodes[1]) {
                        weatherDescription = weatherCodeMapping[weatherCodes[0]];
                    } else {
                        weatherDescription = `${weatherCodeMapping[weatherCodes[0]]} - ${weatherCodeMapping[weatherCodes[1]]}`;
                    }
                    const date = new Date(item.time);

                    let sunriseTime = new Date(item.values.sunriseTime);
                    let sunsetTime = new Date(item.values.sunsetTime);
                    sunriseTime = sunriseTime.toLocaleTimeString();
                    sunsetTime = sunsetTime.toLocaleTimeString();
                    return {
                        "time": date.toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                        }),
                        "temperature": {
                            "min": item.values.temperatureMin,
                            "max": item.values.temperatureMax,
                            "avg": item.values.temperatureAvg
                        },
                        "feelsLike": {
                            "min": item.values.temperatureApparentMin,
                            "max": item.values.temperatureApparentMax,
                            "avg": item.values.temperatureApparentAvg
                        },
                        "windSpeed": {
                            "min": item.values.windSpeedMin,
                            "max": item.values.windSpeedMax,
                            "avg": item.values.windSpeedAvg
                        },
                        "windDirection": item.values.windDirectionAvg,
                        "humidity": {
                            "min": item.values.humidityMin,
                            "max": item.values.humidityMax,
                            "avg": item.values.humidityAvg
                        },
                        "weatherDescription": weatherDescription,
                        "weatherCode": weatherCode,
                        "sunriseTime": sunriseTime,
                        "sunsetTime": sunsetTime
                    }
                }
                weatherItemToday = data.timelines.daily.slice(0, 1).map(minifyJSON);
                weatherItems5Day = data.timelines.daily.slice(1).map(minifyJSON);
                return {
                    "location": locale.trim(),
                    "state": state.trim(),
                    "country": country.trim(),
                    "latlng": latlng,
                    "weatherItemToday": weatherItemToday,
                    "weatherItems5Day": weatherItems5Day
                };
            })
            .catch(error => console.log(error));
    }

    /*
     * submitLocation function that submits the location entered by the user and updates the weather information.
     * @param {event} e - The submit event.
     */
    const submitLocation = (e) => {
        e.preventDefault();
        const response = call_api(e.target[0].value);
        response.then(data => {
            console.log(data);
            setLocation(data.location);
            setState(data.state);
            setCountry(data.country);
            setLatlng(data.latlng);
            setWeatherItemToday(data.weatherItemToday[0]);
            setWeatherItems5Day(data.weatherItems5Day);

            //clear the input
            e.target[0].value = "";
        });
    }

    /*
     * updateCurrentLocation function that updates the weather information for the current location of the user.
     */
    const updateCurrentLocation = () => {
        // call api on page load for current location
        call_api().then(data => {
            setLocation("Current Location");
            setState("");
            setCountry("");
            setLatlng(data.latlng);
            setWeatherItemToday(data.weatherItemToday[0]);
            setWeatherItems5Day(data.weatherItems5Day);
        });
    }

    // receive location from user device
    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setCurrentLocation({latitude: position.coords.latitude, longitude: position.coords.longitude});

                call_api().then(data => {
                    setLocation("Current Location");
                    setState("");
                    setCountry("");
                    setLatlng(data.latlng);
                    setWeatherItemToday(data.weatherItemToday[0]);
                    setWeatherItems5Day(data.weatherItems5Day);
                });

            }, (error) => {
                console.log('Error: ', error.message);
                // load with pittsburgh as default
                call_api("Pittsburgh").then(data => {
                    setLocation(data.location);
                    setState(data.state);
                    setCountry(data.country);
                    setLatlng(data.latlng);
                    setWeatherItemToday(data.weatherItemToday[0]);
                    setWeatherItems5Day(data.weatherItems5Day);
                });
            });
        } else {
            console.log('Geolocation is not available');
            // load with pittsburgh as default
            call_api("Pittsburgh").then(data => {
                setLocation(data.location);
                setState(data.state);
                setCountry(data.country);
                setLatlng(data.latlng);
                setWeatherItemToday(data.weatherItemToday[0]);
                setWeatherItems5Day(data.weatherItems5Day);
            });
        }
    }, []);

    return (
        <>
            <div className="container-fluid">
                <div className={"row position-relative"}>
                    <div className={"col-12 col-md-7"}>
                        <CentralPanel updateLocation={submitLocation} updateCurrentLocation={updateCurrentLocation}
                                      location={location} state={state} country={country} latlng={latlng}
                                      weatherItemToday={weatherItemToday}/>
                    </div>
                    <div className={"col"}>
                        <ForecastPanel weatherItem5Day={weatherItems5Day}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
