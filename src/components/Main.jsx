import React from "react";

import FightImage from "./helpers/fightImages.jsx";
import SkillsRendering from "./helpers/skillsRendering.jsx";
import WinningBanner from "./helpers/winningBanner.jsx";

export default class Main extends React.Component{
    constructor(props){
        super(props);

        this.fightersGeneralData = require("../data/fighters.json");

        this.defaultSet = {
            secondGamerStatus: {
                currHp: this.fightersGeneralData["fighters"][this.props.secondGamer]["stats"]["hp"],
                maxHp: this.fightersGeneralData["fighters"][this.props.secondGamer]["stats"]["hp"],
                currSta: this.fightersGeneralData["fighters"][this.props.secondGamer]["stats"]["sta"],
                maxSta: this.fightersGeneralData["fighters"][this.props.secondGamer]["stats"]["sta"],
                specialAttackPoints: 0
            },
            firstGamerStatus: {
                currHp: this.fightersGeneralData["fighters"][this.props.firstGamer]["stats"]["hp"],
                maxHp: this.fightersGeneralData["fighters"][this.props.firstGamer]["stats"]["hp"],
                currSta: this.fightersGeneralData["fighters"][this.props.firstGamer]["stats"]["sta"],
                maxSta: this.fightersGeneralData["fighters"][this.props.firstGamer]["stats"]["sta"],
                specialAttackPoints: 0
            },
            firstGamerAttacks: this.fightersGeneralData["fighters"][this.props.firstGamer]["skills"],
            secondGamerAttacks: this.fightersGeneralData["fighters"][this.props.secondGamer]["skills"],
            isLoaded: -1,
            currentTurn: 1,
            isEnded: 0
        };

        this.state = this.defaultSet;

        this.handleTheAttack = this.handleTheAttack.bind(this);
        this.getTheNumberFromTheSkill = this.getTheNumberFromTheSkill.bind(this);
        this.manageAIturn = this.manageAIturn.bind(this);
        this.nextTurn = this.nextTurn.bind(this);
        this.surrender = this.surrender.bind(this);
        this.headingBack = this.headingBack.bind(this);

    }
    getTheNumberFromTheSkill(text){
        let getTheNumber = text.substring(0,3);
        if(isNaN(Number(getTheNumber)) === true) {getTheNumber = getTheNumber.substring(0,2);}
        getTheNumber = Number(getTheNumber);
        return getTheNumber;
    }
    nextTurn(hasDoneSomething){
        if(hasDoneSomething === false){
            let StaminaStep = 1.5;
            if(this.state.currentTurn === 1){
                let operand = this.state.firstGamerStatus;
                operand["currSta"]+=StaminaStep;
                if(operand["currSta"] > operand["maxSta"]) operand["currSta"] = operand["maxSta"];
                this.setState({
                   firstGamerStatus: operand
                }, () => {});
            }
            else{
                let operand = this.state.secondGamerStatus;
                operand["currSta"]+=StaminaStep;
                if(operand["currSta"] > operand["maxSta"]) operand["currSta"] = operand["maxSta"];
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
    surrender(){
        if(this.props.gameType === 1 && this.state.currentTurn === -1) return;
        else {
            this.setState({
                isEnded: this.state.currentTurn*(-1)
            }, () => {});
        }
    }
    manageAIturn(){
        let aiBase = this.state.secondGamerStatus, aiAttacks = this.state.secondGamerAttacks;
        let playerBase = this.state.firstGamerStatus;
        let flag = false, helper, ifDoingNothing = true;
        if(aiBase["currHp"]/aiBase["maxHp"] <= 0.4){
            for(let i = 0 ; i < aiAttacks.length; i++){
                if(aiAttacks[i][1] === "user" && aiAttacks[i][3] <= aiBase["specialAttackPoints"]){
                    flag = true;
                    helper = aiAttacks[i][2].split(", ");
                    for(let j = 0 ; j < helper.length; j++){
                        let getTheNumberOfHelping = this.getTheNumberFromTheSkill(helper[j]);
                        if(helper[j][helper[j].length - 1] === "a") {
                            aiBase["currSta"]+=getTheNumberOfHelping;
                            if(aiBase["currSta"] > aiBase["maxSta"]) aiBase["currSta"] = aiBase["maxSta"];
                        }
                        else{
                            aiBase["currHp"]+=getTheNumberOfHelping;
                            if(aiBase["currHp"] > aiBase["maxHp"]) aiBase["currHp"] = aiBase["maxHp"]; 
                        }
                    }
                    break;
                }
            }
        }
        if(aiBase["currHp"]/aiBase["maxHp"] > 0.4 || flag === false){
            console.log("jest");
            let mostPowerfulAttackInd = -1, maxPower = 0, currentPower = 0;
            for(let i = 0 ; i < aiAttacks.length; i++){
                if(aiAttacks[i][1] === "enemy" && aiAttacks[i][3] <= aiBase["currSta"]){
                    helper = aiAttacks[i][2].split(", ");
                    currentPower = 0;
                    for(let j = 0 ; j < helper.length; j++){
                        let getTheNumberOfHelping = this.getTheNumberFromTheSkill(helper[j]);
                        currentPower-=getTheNumberOfHelping;
                    }
                    if(currentPower > maxPower){
                        maxPower = currentPower;
                        mostPowerfulAttackInd = i;
                    }
                }
            }
            if(mostPowerfulAttackInd !== -1){
                helper = aiAttacks[mostPowerfulAttackInd][2].split(", ");
                for(let j = 0 ; j < helper.length; j++){
                    let getTheNumberOfHelping = this.getTheNumberFromTheSkill(helper[j]);
                    let playerBaseInd = helper[j][helper[j].length - 1] === "a" ? "currSta" : "currHp";
                    playerBase[playerBaseInd]+=getTheNumberOfHelping;
                    if(playerBase[playerBaseInd] < 0) playerBase[playerBaseInd] = 0;
                }
                aiBase["currSta"]-=aiAttacks[mostPowerfulAttackInd][3];
            }
            else{
                ifDoingNothing = false;
            }
        }
        setTimeout(() => {
            this.setState({
                secondGamerStatus: aiBase,
                firstGamerStatus: playerBase
            }, () => {
                this.nextTurn(ifDoingNothing);
            });
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
        let countSpecialPoints = 0;
        for(let i = 0 ; i < infoAboutTheAttack.length; i++){
            let getTheNumber = this.getTheNumberFromTheSkill(infoAboutTheAttack[i]);
            let toAnalyze = infoAboutTheAttack[i];
            if(toAnalyze[toAnalyze.length - 1].toLowerCase() === "a"){
                final["currSta"]+=getTheNumber;
                if(ifAttack){
                    if(final["currSta"] < 0) final["currSta"] = 0;
                }
                else{
                    if(final["currSta"] > final["maxSta"]) final["currSta"] = final["maxSta"];
                    final["specialAttackPoints"]-=(getTheNumber*0.75);
                }
            }
            else{
                final["currHp"]+=getTheNumber;
                if(ifAttack){
                    if(final["currHp"] < 0) final["currHp"] = 0;
                    countSpecialPoints-=(getTheNumber*0.5);
                }
                else{
                    if(final["currHp"] > final["maxHp"]) final["currHp"] = final["maxHp"];
                    final["specialAttackPoints"]-=getTheNumber;
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
                    if(ifAttack) finalOperand["specialAttackPoints"]+=countSpecialPoints;
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
                    finalOperand["specialAttackPoints"]+=countSpecialPoints;
                    this.setState({
                        secondGamerStatus: finalOperand
                    }, () => {this.nextTurn(true)});
                });
            }
        }
    }
    headingBack(where){
        this.setState(this.defaultSet, () => {this.props.goBack(where);});
    }
    componentDidMount(){
        this.setState({
            isLoaded: 1
        }, () => {});
    }
    render(){
        return this.state.isLoaded === 1 ? this.state.isEnded !== 0 ? <WinningBanner
                    stateOfWinning = {this.state.isEnded}
                    auxiliaryFunction = {this.headingBack}/> :  <div className="game-container">
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
                                userData = {this.state.firstGamerStatus}
                                handleTheAttack = {this.handleTheAttack}/>: <SkillsRendering skillsToMap = {this.state.secondGamerAttacks} 
                                userData = {this.state.secondGamerStatus}
                                handleTheAttack = {this.handleTheAttack}/>}
                            </section>
                            <div className="user-options">
                                <button className = "skip-turn block-center" onClick = {() => {this.nextTurn(false)}}>Pomiń</button>
                                <button className = "skip-turn surrender block-center" onClick = {() => {this.surrender()}}>Poddaj się</button>
                            </div>
                        </span>
                    }
                </div>
            </section>
        </div> : "";
    }
}
/**/