import {
    faBars, faDroplet,
    faSearch,
    faTemperature0,
    faTemperature1,
    faTemperature2,
    faTemperature3,
    faTemperature4, faTemperatureHigh, faWind
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Card from "./Card.jsx";
import PropTypes from "prop-types";

const CentralPanel = ({
                          updateLocation,
                          location,
                          state,
                          country,
                          latlng,
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

    const submitLocation = (e) => {
        updateLocation(e);
    }

    // useEffect(() => {
    //     // const response = call_api("pittsburgh");
    //     // response.then(data => {
    //     //     console.log(data);
    //     //     setLocation(data.location);
    //     //     setState(data.state);
    //     //     setCountry(data.country);
    //     //     setLatlng(data.latlng);
    //     //     console.log(data.weatherItemToday[0]);
    //     //     setWeatherItemToday(data.weatherItemToday);
    //     //     setWeatherItems5Day(data.weatherItems5Day);
    //
    // }, []);

    return (<>
        <div className={"offcanvas offcanvas-start"} id={"locationPanel"}>
            <div className={"offcanvas-header mt-5"}>
                Locations
                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"
                        aria-label="Close"></button>
            </div>
            <div className={"offcanvas-body"}>
                <div className={"container search"}>
                    <form className={"d-flex justify-content-center position-relative"}
                          onSubmit={submitLocation}>
                        <input type={"text"} className={"form-control d-inline-block"}
                               placeholder={"Search for a location"}/>
                        <button type={"submit"} className={"position-absolute d-inline-block"} id={"searchLocation"}>
                            <FontAwesomeIcon icon={faSearch}/></button>
                    </form>
                </div>
                <div className={"container locations my-5"}>
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
                        <h4 className={"text-center"}>{state}, {country}</h4>
                    </div>
                    <div className={"lat-lng"}>
                        {latlng}
                    </div>
                </div>
            </div>
            <div className={"row"}>
                <div className={"d-flex align-items-center justify-content-center city-temp"}>
                    <FontAwesomeIcon icon={temperatureIcon(parseFloat(weatherItemToday.temperature?.avg))}
                                     size={"3x"}/>
                    <h1 className={"mx-2"}>
                        {weatherItemToday.temperature?.avg}&deg;C
                    </h1>
                    {/*todo add highs and lows*/}
                </div>
            </div>

            <hr/>

            <div className={"row"}>
                <div className={"city-weather"}>
                    <div className={"container d-flex flex-column"}>
                        <div className={"row mx-auto my-4"}>
                            <div className={"col"}>
                                <h2>{weatherItemToday.weatherDescription}</h2>
                            </div>
                        </div>
                        <div className={"row mx-auto my-4"}>
                            <div className={"col-12 col-md-6"}>
                                <Card imageLeft={true}
                                      icon={faTemperatureHigh}
                                      cardTitle={`${weatherItemToday.feelsLike?.avg}°C`}
                                      cardBody={`${weatherItemToday.feelsLike?.min} - ${weatherItemToday.feelsLike?.max}`}
                                      cardSecondary={"Feels Like Temperature"}/>
                            </div>
                            <div className={"col-12 col-md-6"}>
                                <Card imageLeft={true}
                                      icon={faDroplet}
                                      cardTitle={`${weatherItemToday.humidity?.avg}`}
                                      cardBody={`${weatherItemToday.humidity?.min} - ${weatherItemToday.humidity?.max}`}
                                      cardSecondary={"Humidity"}/>
                            </div>
                        </div>
                        <div className={"row mx-auto my-4"}>
                            <div className={"col-12 col-md-6"}>
                                <Card imageLeft={true}
                                      icon={faWind}
                                      cardTitle={`${weatherItemToday.windSpeed?.avg} km/h`}
                                      cardBody={`${weatherItemToday.windSpeed?.min} - ${weatherItemToday.windSpeed?.max}`}
                                      cardSecondary={"Wind Speed"}/>
                            </div>
                            <div className={"col-12 col-md-6"}>
                                <Card imageLeft={true}
                                      icon={faWind}
                                      cardTitle={`${weatherItemToday.windDirection ? weatherItemToday.windDirection : ""}°`}
                                      cardBody={" "}
                                      cardSecondary={"Wind Direction"}/>
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
    location: PropTypes.string,
    state: PropTypes.string,
    country: PropTypes.string,
    latlng: PropTypes.string,
    weatherItemToday: PropTypes.object
};

export default CentralPanel;