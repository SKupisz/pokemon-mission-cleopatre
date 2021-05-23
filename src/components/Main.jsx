import React from "react";

export default class Main extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            isLoaded: -1
        };

        console.log(this.props.firstGamer);

        this.fightersGeneralData = require("../data/fighters.json");

    }
    componentDidMount(){
        this.setState({
            secondGamerStatus: {
                currHp: this.fightersGeneralData["fighters"][this.props.secondGamer]["stats"]["hp"],
                maxHp: this.fightersGeneralData["fighters"][this.props.secondGamer]["stats"]["hp"],
                currSta: this.fightersGeneralData["fighters"][this.props.secondGamer]["stats"]["sta"],
                maxSta: this.fightersGeneralData["fighters"][this.props.secondGamer]["stats"]["sta"]
            },
            firstGamerStatus: {
                currHp: this.fightersGeneralData["fighters"][this.props.firstGamer]["stats"]["hp"],
                maxHp: this.fightersGeneralData["fighters"][this.props.firstGamer]["stats"]["hp"],
                currSta: this.fightersGeneralData["fighters"][this.props.firstGamer]["stats"]["sta"],
                maxSta: this.fightersGeneralData["fighters"][this.props.firstGamer]["stats"]["sta"]
            },
            isLoaded: 1
        }, () => {});
    }
    render(){
        return this.state.isLoaded === 1 ? <div className="game-container">
            <div className="gamers-presenting-container">
                <div className={"gamers-images "+this.fightersGeneralData["fighters"][this.props.firstGamer]["photoClassName"]}>
                    <header className="character-name">{this.fightersGeneralData["fighters"][this.props.firstGamer]["name"]}</header>
                </div>
                <div className={"gamers-images second-fighter "+this.fightersGeneralData["fighters"][this.props.secondGamer]["photoClassName"]}>
                    <header className="character-name second-name">{this.fightersGeneralData["fighters"][this.props.secondGamer]["name"]}</header>
                </div>
            </div>
            <section className="main-game">
                <div className="game-characters">
                    <div className="second-gamer-level gamer-level">

                        <div className="stats">
                            <div className="stats-elem health block-center">❤ {this.state.secondGamerStatus["currHp"]+" / "+this.state.secondGamerStatus["maxHp"]}</div>
                            <div className="stats-elem stamina block-center">💪🏻 {this.state.secondGamerStatus["currSta"]+" / "+this.state.secondGamerStatus["maxSta"]}</div>
                            <div className="stats-elem block-center">

                            </div>
                        </div>

                        <div className="image-container">
                            <div className="image-surrounding second-surrounding block-center">
                                <div className={"image block-center "+this.fightersGeneralData["fighters"][this.props.secondGamer]["photoClassName"]}></div>
                            </div>
                        </div>

                    </div>
                    <div className="first-gamer-level gamer-level">

                        <div className="image-container first-container">
                            <div className="image-surrounding first-surrounding block-center">
                                <div className={"image block-center "+this.fightersGeneralData["fighters"][this.props.firstGamer]["photoClassName"]}></div>
                            </div>
                        </div>

                        <div className="stats first-stats">
                            <div className="stats-elem health block-center">❤ {this.state.firstGamerStatus["currHp"]+" / "+this.state.firstGamerStatus["maxHp"]}</div>
                            <div className="stats-elem stamina block-center">💪🏻 {this.state.firstGamerStatus["currSta"]+" / "+this.state.firstGamerStatus["maxSta"]}</div>
                            <div className="stats-elem block-center">

                            </div>
                        </div>

                    </div>
                </div>
                <div className="steering first-gamer">
                    <header className = "steering-turn block-center">Tura gracza 1</header>
                </div>
            </section>
        </div> : "";
    }
}
/**/