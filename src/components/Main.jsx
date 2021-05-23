import React from "react";

import FightImage from "./helpers/fightImages.jsx";
import SkillsRendering from "./helpers/skillsRendering.jsx";
import WinningBanner from "./helpers/winningBanner.jsx";

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
            currentTurn: 1,
            isEnded: 0
        };

        this.handleTheAttack = this.handleTheAttack.bind(this);
        this.manageAIturn = this.manageAIturn.bind(this);
        this.nextTurn = this.nextTurn.bind(this);
        this.headingBack = this.headingBack.bind(this);

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
        if(this.state.firstGamerStatus["currHp"] === 0){
            this.setState({
                isEnded: -1
            }, () => {});
        }
        else if(this.state.secondGamerStatus["currHp"] === 0){
            this.setState({
                isEnded: 1
            }, () => {});
        }
        this.setState({
            currentTurn: this.state.currentTurn*(-1)
        }, () => {
            if(this.state.currentTurn === -1 && this.props.gameType === 1){
                this.manageAIturn();
            }
        });
    }
    manageAIturn(){
        setTimeout(() => {
            this.nextTurn(false);
        },500);
    }
    handleTheAttack(ind){
        let operand = this.state.firstGamerAttacks[ind];
        if(this.state.currentTurn === -1) operand = this.state.secondGamerAttacks[ind];
        let infoAboutTheAttack = operand[2].split(", ");
        let final = {}, ifAttack = true;
        if(operand[1] === "user"){ 
            final = this.state.firstGamerStatus; 
            if(this.state.currentTurn === -1) final = this.state.secondGamerStatus;
            ifAttack = false;
        }
        else{
            final = this.state.secondGamerStatus;
            if(this.state.currentTurn === -1) final = this.state.firstGamerStatus;
        }
        for(let i = 0 ; i < infoAboutTheAttack.length; i++){
            let toAnalyze = infoAboutTheAttack[i];
            let getTheNumber = toAnalyze.substring(1,3);
            if(isNaN(Number(getTheNumber)) === true) {getTheNumber = getTheNumber.substring(0,1);}
            getTheNumber = Number(getTheNumber);
            if(toAnalyze[toAnalyze.length - 1].toLowerCase() === "a"){
                if(ifAttack){
                    final["currSta"]-=getTheNumber;
                    if(final["currSta"] < 0) final["currSta"] = 0;
                }
                else{
                    final["currSta"]+=getTheNumber;
                    if(final["currSta"] > final["maxSta"]) final["currSta"] = final["maxSta"];
                }
            }
            else{
                if(ifAttack){
                    final["currHp"]-=getTheNumber;
                    if(final["currHp"] < 0) final["currHp"] = 0;
                }
                else{
                    final["currHp"]+=getTheNumber;
                    if(final["currHp"] > final["maxHp"]) final["currHp"] = final["maxHp"];
                }
            }
        }
        if(operand[1] === "user"){
            if(this.state.currentTurn === 1){
                this.setState({
                    firstGamerStatus: final
                }, () => {this.nextTurn(true);});
            }
            else{
                this.setState({
                    secondGamerStatus: final
                }, () => {this.nextTurn(true);});
            }
        }
        else{
            if(this.state.currentTurn === 1){
                this.setState({
                    secondGamerStatus: final
                }, () => {
                    let finalOperand = this.state.firstGamerStatus;
                    finalOperand["currSta"]-=operand[3];
                    this.setState({
                        firstGamerStatus: finalOperand
                    }, () => {this.nextTurn(true);});
                });
            }
            else{
                this.setState({
                    firstGamerStatus: final
                }, () => {
                    let finalOperand = this.state.secondGamerStatus;
                    finalOperand["currSta"]-=operand[3];
                    this.setState({
                        secondGamerStatus: finalOperand
                    }, () => {this.nextTurn(true)});
                });
            }
        }
    }
    headingBack(where){
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
            firstGamerAttacks: this.fightersGeneralData["fighters"][this.props.firstGamer]["skills"],
            secondGamerAttacks: this.fightersGeneralData["fighters"][this.props.secondGamer]["skills"],
            isLoaded: -1,
            currentTurn: 1,
            isEnded: 0
        }, () => {this.props.goBack(where);});
    }
    componentDidMount(){
        this.setState({
            isLoaded: 1
        }, () => {});
    }
    render(){
        return this.state.isLoaded === 1 ? this.state.isEnded !== 0 ? <WinningBanner
                    stateOfWinning = {this.state.isEnded}
                    auxiliaryFunction = {this.headingBack}/> : 
        <div className="game-container">
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

                        <div className="stats first-stats">
                            <div className="stats-elem health block-center">❤ {this.state.firstGamerStatus["currHp"]+" / "+this.state.firstGamerStatus["maxHp"]}</div>
                            <div className="stats-elem stamina block-center">💪🏻 {this.state.firstGamerStatus["currSta"]+" / "+this.state.firstGamerStatus["maxSta"]}</div>
                            <div className="stats-elem block-center">

                            </div>
                        </div>

                        <FightImage 
                            surroundingClasses = {this.state.currentTurn === 1 ? "image-surrounding first-surrounding block-center highlighted" : "image-surrounding first-surrounding block-center"}
                            imageClasses = {"image block-center "+this.fightersGeneralData["fighters"][this.props.firstGamer]["photoClassName"]}/>

                    </div>
                </div>
                <div className={this.state.currentTurn === 1 ? "steering first-gamer" : "steering second-gamer"}>
                    <header className = "steering-turn block-center">Tura gracza {this.state.currentTurn === 1 ? 1 : 2}</header>
                    {
                        this.props.gameType === 1 && this.state.currentTurn === -1 ? "" : <span>
                            <section className="skills-and-attacks block-center">
                                {this.state.currentTurn === 1 ? <SkillsRendering skillsToMap = {this.state.firstGamerAttacks} 
                                hp = {this.state.firstGamerStatus["currHp"]}
                                sta = {this.state.firstGamerStatus["currSta"]}
                                handleTheAttack = {this.handleTheAttack}/>: <SkillsRendering skillsToMap = {this.state.secondGamerAttacks} 
                                hp = {this.state.secondGamerStatus["currHp"]}
                                sta = {this.state.secondGamerStatus["currSta"]}
                                handleTheAttack = {this.handleTheAttack}/>}
                            </section>
                            <button className = "skip-turn block-center" onClick = {() => {this.nextTurn(false)}}>Pomiń</button>
                        </span>
                    }
                </div>
            </section>
        </div> : "";
    }
}
/*
*/