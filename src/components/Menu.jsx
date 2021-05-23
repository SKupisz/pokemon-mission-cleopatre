import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';

import ChoosingGameMode from "./helpers/choosingGameMode.jsx";
import Main from "./Main.jsx";

import 'swiper/swiper.scss';

export default class Menu extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            gameMode: 0, // 1 - single player, 2 - two players
            gamePhase: 0, // phases: 0 - first menu, 1 - first gamer choose, 2 - second gamer choose, 3 - AI choose, 4 - fight
            chosenCharacterFirst: 0,
            chosenCharacterSecond: 0
        };
        this.fighters = require("../data/fighters.json");
        this.characters = this.fighters["fighters"];
        this.chooseGameMode = this.chooseGameMode.bind(this);
        this.chooseCharacter = this.chooseCharacter.bind(this);
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
                this.setState({
                    chosenCharacterSecond: Math.floor(Math.random()*this.characters.length),
                    gamePhase: 4
                }, () => {});
            }
        });
    }
    render(){
        return this.state.gamePhase === 0 ? <ChoosingGameMode chooseGameMode = {this.chooseGameMode}/> 
        : (this.state.gamePhase === 1 || this.state.gamePhase === 2)? <div className="menu-container next-phase">
            <header className="main-header block-center">{this.state.gameMode === 1 ? "Wybierz postać" : "Wybierz postać - gracz "+this.state.gamePhase}</header>
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
            secondGamer = {this.state.chosenCharacterSecond}/> : ""
    }
}