import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import '../css/App.css';

import {useEffect, useState} from "react";
import {
    faBars,
    faSearch,
    faTemperature0,
    faTemperature1,
    faTemperature2,
    faTemperature3,
    faTemperature4
} from "@fortawesome/free-solid-svg-icons";
import Card from "./Card.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

// design inspiration
// https://dribbble.com/shots/21260336-Weather-App-UI-UX-Design

function App() {
    // for current location of user, default 0,0
    const [currentLocation, setCurrentLocation] = useState({latitude: 0, longitude: 0});
    // use metric values by default
    const [isMetric, setIsMetric] = useState(true);

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
                        <CurrentPanel/>
                    </div>
                    <div className={"col"}>
                        {currentLocation.latitude}, {currentLocation.longitude}
                        <ForecastPanel/>
                    </div>
                    {/*<span className={"position-absolute d-inline d-md-none"} id={"collapseButton"}>*/}
                    {/*    <button className={"btn btn-primary"} type={"button"}*/}
                    {/*            data-bs-toggle={"offcanvas"} data-bs-target={"#sidebar"}>*/}
                    {/*        <FontAwesomeIcon icon={faBars}/>*/}
                    {/*    </button>*/}
                    {/*</span>*/}


                </div>
            </div>

        </>
    );
}

const ForecastPanel = () => {
    return (<>
        <div className={"container w-100"}>
            {/*for medium and above, where the column is split, position vertically, and keep them small, on hover/click zoom it up and show, and unblur*/}
            <div className={"row flex-row flex-nowrap flex-md-column flex-md-wrap forecast-container"}>
                {[...Array(5)].map((_, i) => {
                    return <div className={"col forecast-card"} key={i}>
                        <Card/>
                    </div>
                })}
            </div>

        </div>
    </>);
}

const CurrentPanel = () => {

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
                Locations
                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"
                        aria-label="Close"></button>
            </div>
            <div className={"offcanvas-body"}>
                <div className={"container search"}>
                    <form className={"d-flex justify-content-center position-relative"}
                          onSubmit={() => console.log('submit')}>
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
                <div className={"d-flex align-items-center justify-content-center position-relative city-drop"}>
                    <button className={"btn btn-primary position-absolute"} type={"button"} data-bs-toggle={"offcanvas"}
                            data-bs-target={"#locationPanel"} id={"sidePanelToggler"}>
                        <FontAwesomeIcon icon={faBars}/>
                    </button>
                    <h3>Tbilisi, Georgia</h3>
                </div>
            </div>
            <div className={"row"}>
                <div className={"d-flex align-items-center justify-content-center city-temp"}>
                <FontAwesomeIcon icon={temperatureIcon(12)} size={"3x"}/>
                    <h1 className={"mx-2"}>12&deg;C</h1>
                </div>
            </div>
            <hr/>
            <div className={"row"}>
                <div className={"city-weather"}>
                    Clear Sky
                    Precipitation
                    Humidity
                    Wind
                </div>
            </div>
        </div>
    </>);
}
export default App;
