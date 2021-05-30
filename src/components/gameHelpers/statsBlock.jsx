import React from "react";

const StatsBlock = ({gamerData, wrapperClass}) => {
    let info = "zwarty i gotowy";
    if(gamerData["currHp"]/gamerData["maxHp"] <= 0.2){
        info = "wykrwawiony";
    }
    else if(gamerData["currSta"]/gamerData["maxSta"] <= 0.3){
        info = "zmęczony";
    }
    return <div className={wrapperClass}>
        <div className="stats-elem health block-center">❤ {gamerData["currHp"]+" / "+gamerData["maxHp"]}</div>
        <div className="stats-elem stamina block-center">💪🏻 {gamerData["currSta"]+" / "+gamerData["maxSta"]}</div>
        <div className="stats-elem character-info block-center">
            {info}
        </div>
    </div>;
}

export default StatsBlock;