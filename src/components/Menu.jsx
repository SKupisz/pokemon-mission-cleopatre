import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper/core';

import ChoosingGameMode from "./menuHelpers/choosingGameMode.jsx";
import MenuMusic from "./menuHelpers/menuMusic.jsx";
import OptionsPanel from "./menuHelpers/optionsPanel.jsx";
import Main from "./Main.jsx";

import snoopdogg from "../music/asterix_i_obelix.mp3";
import fighting from "../music/krwawobrody_theme.mp3";

import 'swiper/swiper.scss';
import "swiper/components/navigation/navigation.min.css";

SwiperCore.use([Navigation]);

export default class Menu extends React.Component{
    constructor(props){
        super(props);

        this.fightingMusicRef = React.createRef();
        this.menuMusicRef = React.createRef();

        this.optionsPanelVolumeRef = React.createRef();

        this.state = {
            gameMode: 0, // 1 - single player, 2 - two players
            gamePhase: -1, // phases: 0 - first menu, 1 - first gamer choose, 2 - second gamer choose, 3 - AI choose, 4 - fight
            aiOruser: 0,
            chosenCharacterFirst: 0,
            chosenCharacterSecond: 0,
            currentMusicVolume: 1.0,
            whichMusicPlaying: true,
            ifPanelOn: false,
            currentVolumePredictor: 1.0,
            currentBrightnessPredictor: 100,
            defaultGamersMenuColors: [["#1e90ff","f2"],["#ff0a0a","e6"]],
            currentGamersMenuColors: [["#1e90ff","f2"],["#ff0a0a","e6"]]
        };
        this.fighters = require("../data/fighters.json");
        this.characters = this.fighters["fighters"];
        this.chooseGameMode = this.chooseGameMode.bind(this);
        this.chooseCharacter = this.chooseCharacter.bind(this);
        this.erasingTheVolume = this.erasingTheVolume.bind(this);
        this.goBack = this.goBack.bind(this);
        this.fallBackALevel = this.fallBackALevel.bind(this);
        this.launchOptionsPanel = this.launchOptionsPanel.bind(this);
        this.readNewPredictor = this.readNewPredictor.bind(this);
    }
    chooseGameMode(option){
        this.setState({
            gameMode: option,
            gamePhase: 1
        }, () => {});
    }
    chooseCharacter(option){
        let objectToPassToState = {
            gamePhase: this.state.gameMode === 2 ? (this.state.gamePhase === 1 ? 2 : 4) : 3
        };
        if(this.state.gamePhase === 1){
            objectToPassToState["chosenCharacterFirst"] = option;
        }
        else{
            objectToPassToState["chosenCharacterSecond"] = option;
        }
        this.setState(objectToPassToState, () => {
            if(this.state.gamePhase === 3){
                let secondCharacterNumber = Math.floor(Math.random()*this.characters.length);
                while(secondCharacterNumber === this.state.chosenCharacterFirst){
                    secondCharacterNumber = Math.floor(Math.random()*this.characters.length)
                }
                this.setState({
                    chosenCharacterSecond: secondCharacterNumber,
                    gamePhase: 4,
                    aiOruser: 1
                }, () => {
                    if(this.state.gamePhase === 4){
                        this.erasingTheVolume(1.0*this.state.currentVolumePredictor);
                    }
                });
            }
            if(this.state.gamePhase === 4){
                this.erasingTheVolume(1.0*this.state.currentVolumePredictor);
            }
        });
    }
    erasingTheVolume(i){
        if(i >= 0){
            this.setState({
                currentMusicVolume: i
            }, () =>{
                setTimeout(() => {
                    this.erasingTheVolume(i-(0.05*this.state.currentVolumePredictor));
                }, 150);
            });
        }
        else{
            this.setState({
                currentMusicVolume: 0.8*this.state.currentVolumePredictor,
                whichMusicPlaying: false
            }, () => {
                this.menuMusicRef.current.stop();
            });
        }
    }
    goBack(where){
        if(where === 1){
            this.setState({
                gameMode: this.state.aiOruser === 1 ? 1 : 2,
                gamePhase: 1,
                chosenCharacterFirst: 0,
                chosenCharacterSecond: 0,
                currentMusicVolume: 1.0*this.state.currentVolumePredictor,
                whichMusicPlaying: true
            }, () => {});
        }
        else{
            this.setState({
                gameMode: 0,
                gamePhase: 0,
                chosenCharacterFirst: 0,
                chosenCharacterSecond: 0,
                currentMusicVolume: 1.0*this.state.currentVolumePredictor,
                whichMusicPlaying: true
            }, () => {});
        }
        this.fightingMusicRef.current.stop();
    }
    fallBackALevel(){
        this.setState({
            gamePhase: this.state.gamePhase-1
        }, () => {});
    }
    launchOptionsPanel(){
        this.setState({
            ifPanelOn: !this.state.ifPanelOn
        }, () => {});
    }
    readNewPredictor(predictorName, newPredictorValue, ind){
        let toPass = {};    
        if(typeof ind === "undefined") {
            toPass[predictorName] = newPredictorValue;
        }
        else {
            toPass[predictorName] = this.state[predictorName];
            toPass[predictorName][ind][0] = newPredictorValue;
        }
        this.setState(toPass, () => {});
    }
    componentDidMount(){
        this.setState({
            gamePhase: 0
        }, () => {});
    }
    render(){
        return <div style = {{
            filter: "brightness("+this.state.currentBrightnessPredictor+"%)"
        }}>
            <MenuMusic
                source1 = {[snoopdogg, this.state.currentMusicVolume*this.state.currentVolumePredictor, this.state.whichMusicPlaying, this.menuMusicRef]}
                source2 = {[fighting, this.state.currentMusicVolume*this.state.currentVolumePredictor, !this.state.whichMusicPlaying, this.fightingMusicRef]}/>
                        <button className={this.state.gamePhase >= 1 ? "go-backBtn options-btn good-phase-for-options" : "go-backBtn options-btn"} onClick = {() => {this.launchOptionsPanel()}}>??????</button>
            {this.state.ifPanelOn === true ? <OptionsPanel goingBackFunction = {this.launchOptionsPanel} 
            defaultVolumeValue = {this.state.currentVolumePredictor}
            defaultBrightnessValue = {this.state.currentBrightnessPredictor}
            gamersColors = {this.state.currentGamersMenuColors}
            gamersDefaultColors = {this.state.defaultGamersMenuColors}
            readStateFunction = {this.readNewPredictor}/> : ""}
            {this.state.gamePhase === 0 ? <ChoosingGameMode chooseGameMode = {this.chooseGameMode}/> 
        : (this.state.gamePhase === 1 || this.state.gamePhase === 2)? <div className="menu-container next-phase">
            <button className="go-backBtn" onClick = {() => {this.fallBackALevel()}}>???</button>
            <header className="main-header choosing-header block-center">{this.state.gameMode === 1 ? "Wybierz posta??" : "Wybierz posta?? - gracz "+this.state.gamePhase}</header>
            <div className="instruction block-center">Przewijaj w poziomie, by wybiera?? kolejne postacie</div>
            <section className="gameOptions-characters block-center">
                <Swiper spaceBetween={0}
                    slidesPerView={1}
                    loop = {true}
                    navigation = {true}>
                {this.characters.map((elem,index) => <SwiperSlide><div className="gameOption-widget" onClick = {() => {this.chooseCharacter(index);}}>
                    <header className="widget-header block-center">{elem["name"]}</header>
                    <div className={"photo-wrapper block-center "+elem["photoClassName"]}></div>
                    <div className="stats-wrapper block-center">
                        <div className="stats health">{elem["stats"]["hp"]}???</div>
                        <div className="stats stamina">{elem["stats"]["sta"]}????????</div>
                    </div>
                    <section className="block-center character-attacks">
                        {elem["skills"].map(skill => <div className="attack-wrapper block-center">
                            <div className="attack-skills attack-name">{skill[0]}</div>
                            <div className="attack-skills attack-specifics">{skill[2]}</div>
                            <div className="attack-skills attack-forWho">
                                <div className={skill[1] === "user" ? "attack-marking user-marking" : "attack-marking enemy-marking"}></div>
                            </div>
                        </div>)}
                    </section>
                </div></SwiperSlide>)}
                </Swiper>
                
            </section>
        </div> : this.state.gamePhase === 4 ? <Main gameType = {this.state.gameMode} firstGamer = {this.state.chosenCharacterFirst}
            secondGamer = {this.state.chosenCharacterSecond} goBack = {this.goBack} gamersColors = {this.state.currentGamersMenuColors}/> : ""}</div>
    }
}
/**/
