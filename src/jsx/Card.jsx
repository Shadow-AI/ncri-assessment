import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Card = ({
                  className,
                  imageLeft = false,
                  icon,
                  cardTitle = "",
                  cardBody = "",
                  cardSecondary = ""
              }) => {
    return (
        <div className={`card d-inline-block mx-auto ${className}`}>
            <div className={"row"}>
                <div className={`${imageLeft ? "col-4" : ""}`}>
                    {icon ? <FontAwesomeIcon icon={icon} size={"5x"}/> :
                        <img src={"https://via.placeholder.com/150"}
                             alt="placeholder"
                             style={imageLeft ? {width: "100%"} : {}}/>
                    }
                </div>
                <div className={"col"}>
                    <h2>{cardTitle}</h2>
                    <p>{cardBody}</p>
                    <p>{cardSecondary}</p>
                </div>
            </div>
        </div>
    )
}
Card.propTypes = {
    className: PropTypes.string,
    imageLeft: PropTypes.bool,
    icon: PropTypes.object,
    cardTitle: PropTypes.string,
    cardBody: PropTypes.string,
    cardSecondary: PropTypes.string
};

export default Card;