import React from "react";

import Intro from "./gameHelpers/intro.jsx";
import LevelRendering from "./gameHelpers/levelRendering.jsx";
import SkillsRendering from "./gameHelpers/skillsRendering.jsx";
import WinningBanner from "./gameHelpers/winningBanner.jsx";

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
                specialAttackPoints: 0,
                sex: this.fightersGeneralData["fighters"][this.props.secondGamer]["sex"],
                movingClasses: ""
            },
            firstGamerStatus: {
                currHp: this.fightersGeneralData["fighters"][this.props.firstGamer]["stats"]["hp"],
                maxHp: this.fightersGeneralData["fighters"][this.props.firstGamer]["stats"]["hp"],
                currSta: this.fightersGeneralData["fighters"][this.props.firstGamer]["stats"]["sta"],
                maxSta: this.fightersGeneralData["fighters"][this.props.firstGamer]["stats"]["sta"],
                specialAttackPoints: 0,
                sex: this.fightersGeneralData["fighters"][this.props.firstGamer]["sex"],
                movingClasses: ""
            },
            firstGamerAttacks: this.fightersGeneralData["fighters"][this.props.firstGamer]["skills"],
            secondGamerAttacks: this.fightersGeneralData["fighters"][this.props.secondGamer]["skills"],
            isLoaded: -1,
            currentTurn: 1,
            isEnded: 0,
            doingNextTurnMove: false
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
        this.setState({
            doingNextTurnMove: true
        }, () => {
            setTimeout( () => {
                let StaminaStep = 2.5, searchInd = "firstGamerStatus";
                if(this.state.currentTurn === -1){
                    searchInd = "secondGamerStatus";
                }
                let operand = this.state[searchInd];
                if(hasDoneSomething === false){
                    operand["currSta"]+=StaminaStep;
                    if(operand["currSta"] > operand["maxSta"]) operand["currSta"] = operand["maxSta"];
                }
                operand["movingClasses"] = "";
                let toPutToTheState = {};
                toPutToTheState[searchInd] = operand;
                this.setState(toPutToTheState, () => {});
                if(this.state.firstGamerStatus["currHp"] === 0 || this.state.secondGamerStatus["currHp"] === 0){
                    this.setState({
                        isEnded: this.state.currentTurn
                    }, () => {});
                }
                else{   
                    this.setState({
                        currentTurn: this.state.currentTurn*(-1),
                        doingNextTurnMove: false
                    }, () => {
                        if(operand["movingClasses"] === "user-healed") {
                            return;
                        }
                        else if(this.state.currentTurn === -1 && this.props.gameType === 1) this.manageAIturn();
                    });
                }
            },200);
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
                        let getTheNumberOfHelping = this.getTheNumberFromTheSkill(helper[j]), addingInd = "Hp";
                        if(helper[j][helper[j].length - 1] === "a") addingInd = "Sta";
                        aiBase["curr"+addingInd]+=getTheNumberOfHelping;
                        if(aiBase["curr"+addingInd] > aiBase["max"+addingInd]) aiBase["curr"+addingInd] = aiBase["max"+addingInd];
                    }
                    aiBase["movingClasses"] = "user-healed";
                    break;
                }
            }
        }
        if(aiBase["currHp"]/aiBase["maxHp"] > 0.4 || flag === false){
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
                    aiBase["specialAttackPoints"]-=(getTheNumberOfHelping*0.25);
                }
                aiBase["currSta"]-=aiAttacks[mostPowerfulAttackInd][3];
                playerBase["movingClasses"]="user-attacked";
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
            let toAnalyze = infoAboutTheAttack[i], ending = "Hp";
            if(toAnalyze[toAnalyze.length - 1].toLowerCase() === "a") ending = "Sta";
            final["curr"+ending]+=getTheNumber;
            if(ifAttack){
                if(final["curr"+ending] < 0) final["curr"+ending] = 0;
                countSpecialPoints-=(getTheNumber*0.25);
            }
            else{
                if(final["curr"+ending] > final["max"+ending]) final["curr"+ending] = final["max"+ending];
                final["specialAttackPoints"]-=(getTheNumber*0.75);
            }
        }
        if(operand[1] === "user"){
            final['movingClasses'] = "user-healed";
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
            final["movingClasses"] = "user-attacked";
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
                    }, () => {this.nextTurn(true);});
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
            <Intro
            firstGeneralData = {this.fightersGeneralData["fighters"][this.props.firstGamer]}
            secondGeneralData = {this.fightersGeneralData["fighters"][this.props.secondGamer]}/>
            <section className="main-game">
                <div className="game-characters">
                    <LevelRendering levelClasses = "second-gamer-level gamer-level" 
                    gamerStatsBlock = {[this.state.secondGamerStatus, "stats"]}
                    gamerImage = {[this.state.currentTurn === -1 ? "image-surrounding second-surrounding block-center highlighted "+this.state.secondGamerStatus["movingClasses"] : 
                    "image-surrounding second-surrounding block-center "+this.state.secondGamerStatus["movingClasses"],
                    "image block-center "+this.fightersGeneralData["fighters"][this.props.secondGamer]["photoClassName"]]}/>
                    <LevelRendering levelClasses = "first-gamer-level gamer-level" 
                    gamerStatsBlock = {[this.state.firstGamerStatus, "stats first-stats"]}
                    gamerImage = {[this.state.currentTurn === 1 ? "image-surrounding first-surrounding block-center highlighted "+this.state.firstGamerStatus["movingClasses"] : 
                    "image-surrounding first-surrounding block-center "+this.state.firstGamerStatus["movingClasses"],
                    "image block-center "+this.fightersGeneralData["fighters"][this.props.firstGamer]["photoClassName"]]}/>
                </div>
                <div className={this.state.currentTurn === 1 ? "steering first-gamer" : "steering second-gamer"}>
                    <header className = "steering-turn block-center">Tura gracza {this.state.currentTurn === 1 ? 1 : 2}</header>
                    {
                        this.props.gameType === 1 && this.state.currentTurn === -1 ? "" : <span>
                            <section className="skills-and-attacks block-center">
                                {this.state.currentTurn === 1 ? <SkillsRendering skillsToMap = {this.state.firstGamerAttacks} userData = {this.state.firstGamerStatus}
                                handleTheAttack = {this.handleTheAttack} mappingForbidden = {this.state.doingNextTurnMove}/>: <SkillsRendering skillsToMap = {this.state.secondGamerAttacks} userData = {this.state.secondGamerStatus}
                                handleTheAttack = {this.handleTheAttack} mappingForbidden = {this.state.doingNextTurnMove}/>}
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