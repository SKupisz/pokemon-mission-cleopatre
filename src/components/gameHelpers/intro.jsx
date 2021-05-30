import React from "react";

const Intro = ({firstGeneralData,secondGeneralData}) => {
    return <div className="gamers-presenting-container">
        <div className={"gamers-images "+firstGeneralData["photoClassName"]}>
            <header className="character-name">{firstGeneralData["name"]}</header>
        </div>
        <div className={"gamers-images second-fighter "+secondGeneralData["photoClassName"]}>
            <header className="character-name second-name">{secondGeneralData["name"]}</header>
        </div>
    </div>
}

export default Intro;