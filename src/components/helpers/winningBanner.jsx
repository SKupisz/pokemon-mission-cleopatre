import React from "react";

const WinningBanner = ({stateOfTheWinning, auxiliaryFunction}) => {
    return <div className="game-container">
        <header className="winner-header block-center">{stateOfTheWinning === 1 ? "Gracz 1 wygrywa" : "Gracz 2 wygrywa"}</header>
        <div className="options-container block-center">
            <button className="after-game-option" onClick = {() => {auxiliaryFunction(0);}}>Menu główne</button>
            <button className="after-game-option" onClick = {() => {auxiliaryFunction(1);}}>Jeszcze raz</button>
        </div>
    </div>;
}

export default WinningBanner;