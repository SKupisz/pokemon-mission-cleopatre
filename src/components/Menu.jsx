import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import ReactHowler from 'react-howler';

import ChoosingGameMode from "./helpers/choosingGameMode.jsx";
import Main from "./Main.jsx";

import snoopdogg from "../music/asterix_i_obelix.mp3";
import fighting from "../music/krwawobrody_theme.mp3";

import 'swiper/swiper.scss';

export default class Menu extends React.Component{
    constructor(props){
        super(props);

        this.fightingMusicRef = React.createRef();
        this.menuMusicRef = React.createRef();

        this.state = {
            gameMode: 0, // 1 - single player, 2 - two players
            gamePhase: -1, // phases: 0 - first menu, 1 - first gamer choose, 2 - second gamer choose, 3 - AI choose, 4 - fight
            aiOruser: 0,
            chosenCharacterFirst: 0,
            chosenCharacterSecond: 0,
            currentMusicVolume: 1.0,
            whichMusicPlaying: true
        };
        this.fighters = require("../data/fighters.json");
        this.characters = this.fighters["fighters"];
        this.chooseGameMode = this.chooseGameMode.bind(this);
        this.chooseCharacter = this.chooseCharacter.bind(this);
        this.erasingTheVolume = this.erasingTheVolume.bind(this);
        this.goBack = this.goBack.bind(this);
        this.fallBackALevel = this.fallBackALevel.bind(this);
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
                        this.erasingTheVolume(1.0);
                    }
                });
            }
            if(this.state.gamePhase === 4){
                for(let i = 1.0; i >=0.0; i-=0.1){
                    this.erasingTheVolume(1.0);
                }
            }
        });
    }
    erasingTheVolume(i){
        if(i >= 0){
            this.setState({
                currentMusicVolume: i
            }, () =>{
                setTimeout(() => {
                    this.erasingTheVolume(i-0.05);
                }, 150);
            });
        }
        else{
            this.setState({
                currentMusicVolume: 0.8,
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
                currentMusicVolume: 1.0,
                whichMusicPlaying: true
            }, () => {});
        }
        else{
            this.setState({
                gameMode: 0,
                gamePhase: 0,
                chosenCharacterFirst: 0,
                chosenCharacterSecond: 0,
                currentMusicVolume: 1.0,
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
    componentDidMount(){
        this.setState({
            gamePhase: 0
        }, () => {});
    }
    render(){
        return <div>
            <ReactHowler src={snoopdogg} volume = {this.state.currentMusicVolume} 
            playing = {this.state.whichMusicPlaying} loop = {true}
            ref = {this.menuMusicRef}/> 
            <ReactHowler src={fighting} volume = {this.state.currentMusicVolume} 
            playing = {!this.state.whichMusicPlaying} loop = {true}
            ref = {this.fightingMusicRef}/> 
            {this.state.gamePhase === 0 ? <ChoosingGameMode chooseGameMode = {this.chooseGameMode}/> 
        : (this.state.gamePhase === 1 || this.state.gamePhase === 2)? <div className="menu-container next-phase">
            <button className="go-backBtn" onClick = {() => {this.fallBackALevel()}}>⬅</button>
            <header className="main-header choosing-header block-center">{this.state.gameMode === 1 ? "Wybierz postać" : "Wybierz postać - gracz "+this.state.gamePhase}</header>
            <div className="instruction block-center">Przewijaj w poziomie, by wybierać kolejne postacie</div>
            <section className="gameOptions-characters block-center">
                <Swiper spaceBetween={10}
                    slidesPerView={1}>
                {this.characters.map((elem,index) => <SwiperSlide><div className="gameOption-widget" onClick = {() => {this.chooseCharacter(index);}}>
                    <header className="widget-header block-center">{elem["name"]}</header>
                    <div className={"photo-wrapper block-center "+elem["photoClassName"]}></div>
                    <div className="stats-wrapper block-center">
                        <div className="stats health">{elem["stats"]["hp"]}❤</div>
                        <div className="stats stamina">{elem["stats"]["sta"]}💪🏻</div>
                    </div>
                    <section className="block-center character-attacks">
                        {elem["skills"].map(skill => <div className="attack-wrapper block-center">
                            <div className="attack-skills attack-name">{skill[0]}</div>
                            <div className="attack-skills attack-specifics">{skill[2]}</div>
                            <div className="attack-skills attack-forWho">{skill[1] === "user" ? "🟩" : "🟥"}</div>
                        </div>)}
                    </section>
                </div></SwiperSlide>)}
                </Swiper>
                
            </section>
        </div> : this.state.gamePhase === 4 ? <Main gameType = {this.state.gameMode} firstGamer = {this.state.chosenCharacterFirst}
            secondGamer = {this.state.chosenCharacterSecond} goBack = {this.goBack}/> : ""}</div>
    }
}
/*  */