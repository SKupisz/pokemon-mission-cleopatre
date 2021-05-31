import React from "react";

import FightImage from "./fightImages.jsx";
import StatsBlock from "./statsBlock.jsx";

export default class LevelRendering extends React.Component{
    render(){
        return <div className={this.props.levelClasses}>
            <StatsBlock
                gamerData = {this.props.gamerStatsBlock[0]}
                wrapperClass = {this.props.gamerStatsBlock[1]}/>

            <FightImage 
                surroundingClasses = {this.props.gamerImage[0]}
                imageClasses = {this.props.gamerImage[1]}/>
        </div>;
    }
}
/**/