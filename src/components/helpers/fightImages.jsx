import React from "react";

const FightImage = ({surroundingClasses,imageClasses}) => {
    return <div className="image-container">
        <div className={surroundingClasses}>
            <div className={imageClasses}></div>
        </div>
    </div>
};

export default FightImage;