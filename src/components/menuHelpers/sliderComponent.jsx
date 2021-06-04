import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import VolumeDown from "@material-ui/icons/VolumeDown";
import VolumeOff from "@material-ui/icons/VolumeOff";
import VolumeUp from "@material-ui/icons/VolumeUp";
import BrightnessLowIcon from '@material-ui/icons/BrightnessLow';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';

const SliderComponent = ({sliderName, sliderKey, defaultValue,  minValue, maxValue, step, predictorName, callBackFunction, type, classes}) => {
    return <div className={classes}>
        <Typography gutterBottom className="option-name">
            {sliderName}
        </Typography>
        <Grid container spacing={2} className = "block-center">
            <Grid item>
                {type === "volume" ? defaultValue === 0 ? <VolumeOff className = "volume-item"/> : <VolumeDown className = "volume-item"/> : <BrightnessLowIcon className = "volume-item"/>}
            </Grid>
            <Grid item xs>
                <Slider value = {defaultValue} 
                min={minValue} max = {maxValue} step = {step} key = {sliderKey}
                aria-labelledby="continuous-slider" className = "slider"
                onChange = {(event,newValue) => {callBackFunction(predictorName,newValue)}}/>
            </Grid>
            <Grid item>
                {type === "volume" ? <VolumeUp className = "volume-item"/> : <BrightnessHighIcon className = "volume-item"/>}
            </Grid>
        </Grid>
    </div>;
};

export default SliderComponent;