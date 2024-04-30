import {
    faBars,
    faDroplet,
    faLocationArrow,
    faSearch,
    faSun,
    faTemperature0,
    faTemperature1,
    faTemperature2,
    faTemperature3,
    faTemperature4,
    faTemperatureHigh,
    faWind
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Card, WeatherFeatureCard} from "./Cards.jsx";
import PropTypes from "prop-types";

import "../css/CentralPanel.css";

import weatherImage from '../assets/weatherCodeImage.json';

/**
 * CentralPanel component that displays the main weather information for a given location.
 * @param {function} updateLocation - A function to update the location.
 * @param {function} updateCurrentLocation - A function to update the current location.
 * @param {string} location - The name of the location.
 * @param {string} state - The state of the location.
 * @param {string} country - The country of the location.
 * @param {object} weatherItemToday - An object containing weather information for the current day.
 */
const CentralPanel = ({
                          updateLocation,
                          updateCurrentLocation,
                          location,
                          state,
                          country,
                          weatherItemToday
                      }) => {

    const temperatureIcon = (temp) => {
        if (temp >= 35) {
            return faTemperature4;
        } else if (temp >= 25) {
            return faTemperature3;
        } else if (temp >= 15) {
            return faTemperature2;
        } else if (temp >= 5) {
            return faTemperature1;
        } else {
            return faTemperature0;
        }
    }

    return (<>
        <div className={"offcanvas offcanvas-start"} id={"locationPanel"}>
            <div className={"offcanvas-header mt-5"}>
                <span className={""}>
                    <h5>Locations</h5>
                </span>
                <span className={"mx-1"}>
                    <FontAwesomeIcon icon={faLocationArrow} size={"lg"} onClick={updateCurrentLocation}
                                     aria-label={"Current Location"}/>
                </span>
                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"
                        aria-label="Close"></button>
            </div>
            <div className={"offcanvas-body"}>
                <div className={"container search"}>
                    <form className={"d-flex justify-content-center position-relative"}
                          onSubmit={updateLocation}>
                        <input type={"text"} className={"form-control d-inline-block"}
                               placeholder={"Search for a location"}/>
                        <button type={"submit"} className={"position-absolute d-inline-block"} id={"searchLocation"}>
                            <FontAwesomeIcon icon={faSearch}/></button>
                    </form>
                </div>
                <div className={"container locations my-3"}>
                    <div className={"d-flex flex-column align-items-center"}>
                        <Card className={"my-3"} imageLeft={true}/>
                        <Card className={"my-3"} imageLeft={true}/>
                        <Card className={"my-3"} imageLeft={true}/>
                        <Card className={"my-3"} imageLeft={true}/>
                        <Card className={"my-3"} imageLeft={true}/>
                        <Card className={"my-3"} imageLeft={true}/>
                        <Card className={"my-3"} imageLeft={true}/>
                        <Card className={"my-3"} imageLeft={true}/>
                        <Card className={"my-3"} imageLeft={true}/>
                        <Card className={"my-3"} imageLeft={true}/>
                        <Card className={"my-3"} imageLeft={true}/>
                    </div>
                </div>
            </div>

        </div>
        <div className={"container"}>
            <div className={"row mt-5 mb-4"}>
                <div className={"position-relative city-drop"}>
                    <button className={"btn btn-primary position-absolute"} type={"button"} data-bs-toggle={"offcanvas"}
                            data-bs-target={"#locationPanel"} id={"sidePanelToggler"}>
                        <FontAwesomeIcon icon={faBars}/>
                    </button>
                    <div className={"city-name"}>
                        <h3 className={"text-center"}>{location}</h3>
                    </div>
                    <div className={"state-name"}>
                        {state && country ? <h4 className={"text-center"}>{state}, {country}</h4> : ""}
                    </div>
                </div>
            </div>
            <div className={"row"}>
                <div className={"d-flex align-items-center justify-content-center city-temp mt-2"}>
                    <FontAwesomeIcon icon={temperatureIcon(parseFloat(weatherItemToday.temperature?.avg))}
                                     size={"3x"}/>
                    <h1 className={"mx-2"}>
                        {weatherItemToday.temperature?.avg}&deg;C
                    </h1>
                </div>
                <div className={"d-flex align-items-center justify-content-center city-temp-range"}>
                    {weatherItemToday.temperature?.min}&deg;C - {weatherItemToday.temperature?.max}&deg;C
                </div>
            </div>

            <hr/>

            <div className={"row"}>
                <div className={"city-weather"}>
                    <div className={"container d-flex flex-column align-items-center"}>
                        <div className={"row mx-auto my-4"}>
                            <div className={"col"}>
                                <h2>
                                    <img src={weatherImage[weatherItemToday.weatherCode]} alt={"weather icon"}/>
                                    <span className={"mx-2"}>
                                        {weatherItemToday.weatherDescription}
                                    </span>
                                </h2>
                            </div>
                        </div>
                        <div className={"row my-4"}>
                            <div className={"col-6 col-md-6 text-center"}>
                                <WeatherFeatureCard
                                    faIcon={faTemperatureHigh}
                                    attributeValue={`${weatherItemToday.feelsLike?.avg}°C`}
                                    attributeRange={`${weatherItemToday.feelsLike?.min}°C - ${weatherItemToday.feelsLike?.max}°C`}
                                    cardTitle={"Feels Like Temperature"}/>
                            </div>
                            <div className={"col-6 col-md-6 text-center"}>
                                <WeatherFeatureCard
                                    faIcon={faDroplet}
                                    attributeValue={`${weatherItemToday.humidity?.avg}%`}
                                    attributeRange={`${weatherItemToday.humidity?.min}% - ${weatherItemToday.humidity?.max}%`}
                                    cardTitle={"Humidity"}/>
                            </div>
                        </div>
                        <div className={"row my-4"}>
                            <div className={"col-6 col-md-6 text-center"}>
                                <WeatherFeatureCard
                                    faIcon={faWind}
                                    attributeValue={`${weatherItemToday.windSpeed?.avg} km/h`}
                                    attributeRange={`${weatherItemToday.windSpeed?.min} km/h - ${weatherItemToday.windSpeed?.max} km/h`}
                                    cardTitle={"Wind Speed"}/>
                            </div>
                            <div className={"col-6 col-md-6 text-center"}>
                                <WeatherFeatureCard
                                    faIcon={faWind}
                                    attributeValue={`${weatherItemToday.windDirection ? weatherItemToday.windDirection : ""}°`}
                                    cardTitle={"Wind Direction"}/>
                            </div>
                        </div>
                        <div className={"row my-4"}>
                            <div className={"col-6 col-md-6 text-center"}>
                                <WeatherFeatureCard
                                    faIcon={faSun}
                                    attributeValue={`${weatherItemToday.sunriseTime ? weatherItemToday.sunriseTime : ""} GMT`}
                                    cardTitle={"Sun Rise Time"}/>
                            </div>
                            <div className={"col-6 col-md-6 text-center"}>
                                <WeatherFeatureCard
                                    faIcon={faSun}
                                    attributeValue={`${weatherItemToday.sunsetTime ? weatherItemToday.sunsetTime : ""} GMT`}
                                    cardTitle={"Sun Set Time"}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

CentralPanel.propTypes = {
    updateLocation: PropTypes.func,
    updateCurrentLocation: PropTypes.func,
    location: PropTypes.string,
    state: PropTypes.string,
    country: PropTypes.string,
    weatherItemToday: PropTypes.object
};

export default CentralPanel;