import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import "../css/Cards.css";
import weatherImage from '../assets/weatherCodeImage.json';

/**
 * Card component that displays weather information in a card format (for forecasts and location).
 * @param {string} className - Additional class names for the card component.
 * @param {boolean} imageLeft - Determines if the image is displayed on the left or top side of the card.
 * @param {string} imgCode - The code for the weather image to be displayed.
 * @param {string} cardTitle - The title of the card.
 * @param {string} cardBody - The main body of the card.
 * @param {string} cardSecondary - Secondary information to be displayed on the card.
 */
const Card = ({
                  className = "",
                  imageLeft = false,
                  imgCode,
                  cardTitle = "",
                  cardBody = "",
                  cardSecondary = ""
              }) => {
    // in case invalid code is returned, set img to null and use placeholder
    const img = weatherImage[imgCode] ? weatherImage[imgCode] : null;
    return (
        <div className={`card d-inline-block mx-auto ${className}`}>
            <div className={"row"}>
                <div className={`${imageLeft ? "col-4" : ""} mx-2`}>
                    <img src={img ? img : "https://via.placeholder.com/150"}
                         alt={img ? "weather" : "placeholder"}
                         style={imageLeft ? {width: "100%"} : {}}/>
                </div>
                <div className={"col"}>
                    <h3 className={"my-1"}>{cardTitle}</h3>
                    <div className={"temperature"}>{cardBody}</div>
                    <div className={"conditions"}>{cardSecondary}</div>
                </div>
            </div>
        </div>
    );
}

/**
 * WeatherFeatureCard component that displays specific weather features in a card format (main page).
 * @param {string} className - Additional class names for the WeatherFeatureCard component.
 * @param {object} faIcon - The FontAwesomeIcon object to be displayed on the card.
 * @param {string} cardTitle - The title of the card.
 * @param {string} attributeValue - The value of the weather attribute to be displayed.
 * @param {string} attributeRange - The range of the weather attribute to be displayed.
 */
const WeatherFeatureCard = ({className = "", faIcon, cardTitle, attributeValue, attributeRange}) => {
    return (
        <div className={`card weather-feature d-inline-block mx-auto ${className}`}>
            <div className={"container"}>
                <h6 className={"my-2 text-start"}>
                    <span className={"mx-1"}>
                        <FontAwesomeIcon icon={faIcon}/>
                    </span>
                    <span className={"mx-1"}>{cardTitle}</span>
                </h6>
                <div className={"mx-1 d-flex justify-content-between align-items-baseline weather-attributes"}>
                    <div>{attributeValue}</div>
                    <div>{attributeRange}</div>
                </div>
            </div>
        </div>
    )
}
Card.propTypes = {
    className: PropTypes.string,
    imageLeft: PropTypes.bool,
    imgCode: PropTypes.string,
    cardTitle: PropTypes.string,
    cardBody: PropTypes.string,
    cardSecondary: PropTypes.string
};
WeatherFeatureCard.propTypes = {
    className: PropTypes.string,
    cardTitle: PropTypes.string,
    faIcon: PropTypes.object,
    attributeValue: PropTypes.string,
    attributeRange: PropTypes.string
}

export {Card, WeatherFeatureCard};