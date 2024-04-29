import Card from "./Card.jsx";
import {faCloudRain} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const ForecastPanel = ({weatherItem5Day}) => {
    return (<>
        <div className={"container w-100 mt-5"}>
            {/*for medium and above, where the column is split, position vertically, and keep them small, on hover/click zoom it up and show, and unblur*/}
            <div className={"row flex-row flex-nowrap flex-md-column flex-md-wrap forecast-container"}>
                {weatherItem5Day?.map((item, key) => {
                    return <div className={"col forecast-card"} key={key}>
                        {/*todo create a weatherdescription mapping for the word to icon*/}
                        <Card imageLeft={true}
                              icon={faCloudRain}
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