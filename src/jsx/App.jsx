import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import '../css/App.css';
import weatherCode from "../assets/weatherCodes.json"

import {useEffect, useState} from "react";
import ForecastPanel from "./ForecastPanel.jsx";
import CentralPanel from "./CentralPanel.jsx";

// design inspiration
// https://dribbble.com/shots/21260336-Weather-App-UI-UX-Design

function App() {
    // for current location of user, default 0,0
    const [currentLocation, setCurrentLocation] = useState({latitude: 0, longitude: 0});
    // use metric values by default
    const [isMetric, setIsMetric] = useState(true);

    const [location, setLocation] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [latlng, setLatlng] = useState("");
    const [weatherItemToday, setWeatherItemToday] = useState({});
    const [weatherItems5Day, setWeatherItems5Day] = useState([]);

    // api calls
    const base_url = 'https://api.tomorrow.io/v4/weather/forecast?apikey=86PXB6dOg6euSSy3mHhHz0lfPy5ank4w';

    const call_api = (user_location = `${currentLocation.latitude},${currentLocation.longitude}`,
                      units = isMetric ? "metric" : "imperial",
                      timesteps = "1d") => {

        let locale = "";
        let state = "";
        let country = "";
        let latlng = ""
        let weatherItemToday = {};
        let weatherItems5Day = {};

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
                const minifyJSON = (item) => {
                    const weatherCodes = [item.values.weatherCodeMin, item.values.weatherCodeMax];
                    let weatherDescription = "";
                    if (weatherCodes[0] === weatherCodes[1]) {
                        weatherDescription = weatherCode[weatherCodes[0]];
                    } else {
                        weatherDescription = `${weatherCode[weatherCodes[0]]} - ${weatherCode[weatherCodes[1]]}`;
                    }
                    return {
                        "time": item.time,
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
                        "weatherDescription": weatherDescription
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
        });
    }
    // todo remove temporary tester
    useEffect(() => {
        setWeatherItemToday({
            "time": "item.time",
            "temperature": {
                "min": "0",
                "max": "10",
                "avg": "5"
            },
            "feelsLike": {
                "min": "0",
                "max": "10",
                "avg": "5"
            },
            "windSpeed": {
                "min": "0",
                "max": "10",
                "avg": "5"
            },
            "windDirection": "234.5",
            "humidity": {
                "min": "0",
                "max": "10",
                "avg": "5"
            },
            "weatherDescription": "cloudy"
        });
        setWeatherItems5Day([
            {
                "time": "item.time",
                "temperature": {
                    "min": "0",
                    "max": "10",
                    "avg": "5"
                },
                "feelsLike": {
                    "min": "0",
                    "max": "10",
                    "avg": "5"
                },
                "windSpeed": {
                    "min": "0",
                    "max": "10",
                    "avg": "5"
                },
                "windDirection": "234.5",
                "humidity": {
                    "min": "0",
                    "max": "10",
                    "avg": "5"
                },
                "weatherDescription": "cloudy"
            },
            {
                "time": "item.time",
                "temperature": {
                    "min": "0",
                    "max": "10",
                    "avg": "5"
                },
                "feelsLike": {
                    "min": "0",
                    "max": "10",
                    "avg": "5"
                },
                "windSpeed": {
                    "min": "0",
                    "max": "10",
                    "avg": "5"
                },
                "windDirection": "234.5",
                "humidity": {
                    "min": "0",
                    "max": "10",
                    "avg": "5"
                },
                "weatherDescription": "cloudy"
            },
            {
                "time": "item.time",
                "temperature": {
                    "min": "0",
                    "max": "10",
                    "avg": "5"
                },
                "feelsLike": {
                    "min": "0",
                    "max": "10",
                    "avg": "5"
                },
                "windSpeed": {
                    "min": "0",
                    "max": "10",
                    "avg": "5"
                },
                "windDirection": "234.5",
                "humidity": {
                    "min": "0",
                    "max": "10",
                    "avg": "5"
                },
                "weatherDescription": "cloudy"
            },
            {
                "time": "item.time",
                "temperature": {
                    "min": "0",
                    "max": "10",
                    "avg": "5"
                },
                "feelsLike": {
                    "min": "0",
                    "max": "10",
                    "avg": "5"
                },
                "windSpeed": {
                    "min": "0",
                    "max": "10",
                    "avg": "5"
                },
                "windDirection": "234.5",
                "humidity": {
                    "min": "0",
                    "max": "10",
                    "avg": "5"
                },
                "weatherDescription": "cloudy"
            },
            {
                "time": "item.time",
                "temperature": {
                    "min": "0",
                    "max": "10",
                    "avg": "5"
                },
                "feelsLike": {
                    "min": "0",
                    "max": "10",
                    "avg": "5"
                },
                "windSpeed": {
                    "min": "0",
                    "max": "10",
                    "avg": "5"
                },
                "windDirection": "234.5",
                "humidity": {
                    "min": "0",
                    "max": "10",
                    "avg": "5"
                },
                "weatherDescription": "cloudy"
            }
        ]);
        setLocation("Pittsburgh");
        setState("PA");
        setCountry("USA");
        setLatlng("40.4406248,-79.9958864");
    }, []);

    // receive location from user device
    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setCurrentLocation({latitude: position.coords.latitude, longitude: position.coords.longitude});
            }, (error) => {
                console.log('Error: ', error.message);
            });
        } else {
            console.log('Geolocation is not available');
        }
    }, []);

    return (
        <>
            <div className="container-fluid">
                <div className={"row position-relative"}>
                    <div className={"col-12 col-md-7"}>
                        <CentralPanel updateLocation={submitLocation} location={location}
                                      state={state} country={country} latlng={latlng}
                                      weatherItemToday={weatherItemToday}/>
                    </div>
                    <div className={"col"}>
                        5 Day Forecast
                        <ForecastPanel weatherItem5Day={weatherItems5Day}/>
                    </div>
                </div>
            </div>

        </>
    );
}

export default App;
