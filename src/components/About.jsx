import React from "react";
import {Link} from "react-router-dom";

export default class About extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return <div className="menu-container">
            <header className="main-header block-center">Credits</header>
            <section className="main-section block-center">
                <div className="info-wrapper block-center">Made by: Simon G. Kupisz</div>
                <a href="https://github.com/SKupisz" target="_blank">
                    <div className="info-wrapper link block-center">Github</div>
                </a>
                <Link to = "/">
                    <div className="info-wrapper link block-center">Powrót</div>
                </Link>
            </section>
        </div>
    }
}