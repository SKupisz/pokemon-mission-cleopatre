import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper/core';
import {Link} from "react-router-dom";

SwiperCore.use([Navigation]);

export default class Help extends React.Component{
    render(){
        return <div className="menu-container help-container">
            <header className="main-header block-center">Poradnik</header>
            <Swiper slidesPerView={1}
            spaceBetween = {0}
            loop = {true} className = "helper-wrapper block-center">
                <SwiperSlide>
                    <div className="helper-stage">
                        <header className="helper-stage-header block-center">Krok 1</header>
                        <header className="sub-header block-center">Wybierz wariant gry</header>
                        <section className="game-modes block-center">
                            <div className="game-mode-wrapper">
                                <header className="game-mode-header block-center">AI</header>
                                <div className="game-mode-desc">
                                    W tym trybie gracz mierzy się z komputerem i próbuje z nim wygrać.
                                </div>
                            </div>
                            <div className="game-mode-wrapper">
                                <header className="game-mode-header block-center">2 graczy</header>
                                <div className="game-mode-desc">
                                    Tryb dla dwóch graczy, jak sama nazwa wskazuje, pozwala grać dwóm graczom na tym samym komputerze jednocześnie.
                                </div>
                            </div>
                        </section>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="helper-stage">
                        <header className="helper-stage-header block-center">Krok 2</header>
                        <header className="sub-header block-center">Wybierz postać</header>
                        <section className="choosing-describe block-center">
                            Po wybraniu wariantu gry gracz wybiera jedną z czternastu postaci. Każda z nich posiada dwa rodzaje umiejętności: umiejętność ataku (czerwona) i umiejętność leczenia (zielona).
                            Jeżeli w pierwszym kroku wybrany został wariant AI, po wyborze komputer wylosuje postać i przejdzie do rozgrywki. Jeśli zaś wybrano wariant dwóch graczy, po pierwszym wyborze wybiera drugi gracz.
                        </section>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="helper-stage">
                        <header className="helper-stage-header block-center">Krok 3</header>
                        <header className="sub-header block-center">Rozgrywka</header>
                        <section className="game-describe block-center">
                            W trakcie gry gracz ma do dyspozycji 6 ruchów: 4 ataki wybranej przez niego postaci, ruch "pomiń" (premia do staminy za odpoczynek) i ruch "poddaj się", skutkujący zwycięstwem przeciwnika.
                            Zadaniem gracza jest zabrać przeciwnikowi wszystkie punkty HP. Ponadto każdy atak przynosi punkty SuperStaminy, które można potem wydać na leczenie postaci.
                        </section>
                    </div>
                </SwiperSlide>
            </Swiper>
            <Link to = "/">
                <button type="button" className="going-back-btn block-center">Wróć do menu</button>
            </Link>
        </div>;
    }
}