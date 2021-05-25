import React from "react";

export default class SkillsRendering extends React.Component{
    render(){
        return this.props.skillsToMap.map((elem,index) => {
            let final = 0;
            if(elem[1] === "enemy"){
                if(this.props.userData["currSta"] - elem[3] >= 0) final = 1;
                else final = -1;
            }
            else{
                if(this.props.userData["specialAttackPoints"] - elem[3] >= 0) final = 1;
                else final = -1;
            }
            return <div className={final === 1 ? "skill-attack block-center" : "skill-attack block-center unaviable"} onClick = {() => {if(final === 1){
                this.props.handleTheAttack(index);
            }}}>
                <header className="skill-name">
                    <label className="main-text">{elem[0]}</label>
                        <label className="resp-text">{elem[0].length >= 16 ? elem[0].substring(0,13)+"..." : elem[0]}</label>
                </header>
                <div className="describe-attack block-center">
                    <div className="describe-elem non-rwd">{elem[1] === "user" ? "Leczenie" : "Atak"}</div>
                    <div className={elem[1] === "user" ? "describe-elem healing" : "describe-elem attack"}>
                        {elem[2]}
                    </div>
                    <div className="describe-elem non-rwd">{final === 1 ? "Dostępne" : "Niedostępne"}</div>
                </div>
            </div>; 
        });
    }
}