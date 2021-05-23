import React from "react";

import FightImage from "./helpers/fightImages.jsx";
import SkillsRendering from "./helpers/skillsRendering.jsx";

export default class Main extends React.Component{
    constructor(props){
        super(props);

        this.fightersGeneralData = require("../data/fighters.json");

        this.state = {
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
            firstGamerAttacks: this.fightersGeneralData["fighters"][this.props.firstGamer]["skills"],
            secondGamerAttacks: this.fightersGeneralData["fighters"][this.props.secondGamer]["skills"],
            isLoaded: -1,
            currentTurn: 1
        };

        this.nextTurn = this.nextTurn.bind(this);

    }
    nextTurn(hasDoneSomething){
        if(hasDoneSomething === false){
            if(this.state.currentTurn === 1){
                let operand = this.state.firstGamerStatus;
                if(operand["currSta"]+1 <= operand["maxSta"]) operand["currSta"]++;
                this.setState({
                   firstGamerStatus: operand
                }, () => {});
            }
            else{
                let operand = this.state.secondGamerStatus;
                if(operand["currSta"]+1 <= operand["maxSta"]) operand["currSta"]++;
                this.setState({
                    secondGamerStatus: operand
                }, () => {});
            }
        }
        this.setState({
            currentTurn: this.state.currentTurn*(-1)
        }, () => {});
    }
    componentDidMount(){
        this.setState({
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

                        <FightImage 
                            surroundingClasses = {this.state.currentTurn === -1 ? "image-surrounding second-surrounding block-center highlighted" : "image-surrounding second-surrounding block-center"}
                            imageClasses = {"image block-center "+this.fightersGeneralData["fighters"][this.props.secondGamer]["photoClassName"]}/>

                    </div>
                    <div className="first-gamer-level gamer-level">

                        <FightImage 
                            surroundingClasses = {this.state.currentTurn === 1 ? "image-surrounding first-surrounding block-center highlighted" : "image-surrounding first-surrounding block-center"}
                            imageClasses = {"image block-center "+this.fightersGeneralData["fighters"][this.props.firstGamer]["photoClassName"]}/>

                        <div className="stats first-stats">
                            <div className="stats-elem health block-center">❤ {this.state.firstGamerStatus["currHp"]+" / "+this.state.firstGamerStatus["maxHp"]}</div>
                            <div className="stats-elem stamina block-center">💪🏻 {this.state.firstGamerStatus["currSta"]+" / "+this.state.firstGamerStatus["maxSta"]}</div>
                            <div className="stats-elem block-center">

                            </div>
                        </div>

                    </div>
                </div>
                <div className="steering first-gamer">
                    <header className = "steering-turn block-center">Tura gracza {this.state.currentTurn === 1 ? 1 : 2}</header>
                    <section className="skills-and-attacks block-center">
                        {this.state.currentTurn === 1 ? <SkillsRendering skillsToMap = {this.state.firstGamerAttacks}/>: <SkillsRendering skillsToMap = {this.state.secondGamerAttacks}/>}
                    </section>
                    <button className = "skip-turn block-center" onClick = {() => {this.nextTurn(false)}}>Pomiń</button>
                </div>
            </section>
        </div> : "";
    }
}
/**/