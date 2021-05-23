import React from "react";
import {Link} from "react-router-dom";

export default class ChoosingGameMode extends React.Component{
    render(){
        return <div className="menu-container">
        <header className="main-header block-center">Pokemon - misja Kleopatra</header>
        <section className="menu block-center">
            <button className="choosing-btn" onClick = {() => {this.props.chooseGameMode(1)}}>AI</button>
            <button className="choosing-btn" onClick = {() => {this.props.chooseGameMode(2)}}>2 graczy</button>
            <Link to = "/about">
                <button className="credits-btn">Credits</button>
            </Link>
        </section>
    </div> 
    }
}