import React from "react";
import ReactHowler from "react-howler";

const MenuMusic = ({source1, source2}) => { // source structure - music file, volume, playing state, ref
    return <span>
            <ReactHowler src={source1[0]} volume = {source1[1]} 
                playing = {source1[2]} loop = {true}
                ref = {source1[3]}/> 
            <ReactHowler src={source2[0]} volume = {source2[1]} 
                playing = {source2[2]} loop = {true}
                ref = {source2[3]}/> 
    </span>
}

export default MenuMusic;