import React from "react";

const StatsBlock = ({gamerData, wrapperClass}) => {
    let ending = "";
    if(gamerData["sex"] === "m") ending = "y";
    else ending = "a";
    let info = `zwart${ending} i gotow${ending}`;
    if(gamerData["currHp"]/gamerData["maxHp"] <= 0.2){
        info = `wykrwawion${ending}`;
    }
    else if(gamerData["currSta"]/gamerData["maxSta"] <= 0.3){
        info = `zmęczon${ending}`;
    }
    return <div className={wrapperClass}>
        <div className="stats-elem health block-center">❤ {gamerData["currHp"]+" / "+gamerData["maxHp"]}</div>
        <div className="stats-elem stamina block-center">💪🏻 {gamerData["currSta"]+" / "+gamerData["maxSta"]}</div>
        <div className="stats-elem stamina block-center">🏥 {gamerData["specialAttackPoints"]}</div>
        <div className="stats-elem character-info block-center">
            {info}
        </div>
    </div>;
}

export default StatsBlock;