import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import VolumeDown from "@material-ui/icons/VolumeDown";
import VolumeOff from "@material-ui/icons/VolumeOff";
import VolumeUp from "@material-ui/icons/VolumeUp";
import BrightnessLowIcon from '@material-ui/icons/BrightnessLow';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';


export default class OptionsPanel extends React.Component{
    render(){
        return <div className="options-panel">
            <div className="volume-container block-center">
                <Typography gutterBottom className="option-name">
                    Głośność
                </Typography>
                <Grid container spacing={2} className = "block-center">
                    <Grid item>
                        {this.props.defaultVolumeValue === 0 ? <VolumeOff className = "volume-item"/> : <VolumeDown className = "volume-item"/>}
                    </Grid>
                    <Grid item xs>
                        <Slider value = {this.props.defaultVolumeValue} 
                        min={0.0} max = {1.0} step = {0.01} key = {"volumeSlider"}
                        aria-labelledby="continuous-slider" className = "slider"
                        onChange = {(event,newValue) => {this.props.onVolumeChange("currentVolumePredictor",newValue)}}/>
                    </Grid>
                    <Grid item>
                        <VolumeUp className = "volume-item"/>
                    </Grid>
                </Grid>
            </div>
            <div className="volume-container brightness-container block-center">
                <Typography gutterBottom className="option-name">
                    Jasność ekranu
                </Typography>
                <Grid container spacing={2} className = "block-center">
                    <Grid item>
                        <BrightnessLowIcon className = "volume-item"/>
                    </Grid>
                    <Grid item xs>
                        <Slider value = {this.props.defaultBrightnessValue} 
                        min={0} max = {100} step = {1} key = {"brightnessSlider"}
                        aria-labelledby="continuous-slider" className = "slider"
                        onChange = {(event,newValue) => {this.props.onBrightnessChange("currentBrightnessPredictor", newValue)}}/>
                    </Grid>
                    <Grid item>
                        <BrightnessHighIcon className = "volume-item"/>
                    </Grid>
                </Grid>
            </div>
            <button type="button" className="going-back-button block-center" onClick = {() => {this.props.goingBackFunction()}}>Wróć</button>
        </div>
    }
}