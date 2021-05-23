import React from "react";

export default class SkillsRendering extends React.Component{
    render(){
        return this.props.skillsToMap.map(elem => {
            return <div className="skill-attack">
                <header>{elem[0]}</header>
            </div>; 
        });
    }
}