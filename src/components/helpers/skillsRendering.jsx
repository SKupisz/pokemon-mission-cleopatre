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
                <header className="skill-name">{elem[0]}</header>
                <div className="describe-attack block-center">
                    <div className="describe-elem">{elem[1] === "user" ? "Leczenie" : "Atak"}</div>
                    <div className={elem[1] === "user" ? "describe-elem healing" : "describe-elem attack"}>{elem[2]}</div>
                    <div className="describe-elem">{final === 1 ? "Dostępne" : "Niedostępne"}</div>
                </div>
            </div>; 
        });
    }
}