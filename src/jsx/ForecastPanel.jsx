import {Card} from "./Cards.jsx";
import PropTypes from "prop-types";
import "../css/ForecastPanel.css";

/**
 * ForecastPanel component that displays a 5-day weather forecast.
 * @param {array} weatherItem5Day - An array of weather items for the 5-day forecast.
 */
const ForecastPanel = ({weatherItem5Day}) => {
    return (<>
        <div className={"container w-100 mt-5"}>
            <div className={"ms-5 mb-3"}>
                <h4>
                    5 Day Forecast
                </h4>
            </div>
            <div className={"row flex-column flex-wrap align-items-center forecast-container"}>
                {weatherItem5Day?.map((item, key) => {
                    return <div className={"col forecast-card"} key={key}>
                        <Card imageLeft={true}
                              imgCode={item.weatherCode ? item.weatherCode : "0"}
                              cardTitle={item.time ? item.time : ""}
                              cardBody={`${item.temperature?.avg}°C`}
                              cardSecondary={item.weatherDescription ? item.weatherDescription : ""}
                        />
                    </div>
                })}
            </div>

        </div>
    </>);
}

ForecastPanel.propTypes = {
    weatherItem5Day: PropTypes.array
};

export default ForecastPanel;