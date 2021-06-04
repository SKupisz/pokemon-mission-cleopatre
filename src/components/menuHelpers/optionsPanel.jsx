import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import VolumeDown from "@material-ui/icons/VolumeDown";
import VolumeOff from "@material-ui/icons/VolumeOff";
import VolumeUp from "@material-ui/icons/VolumeUp";
import BrightnessLowIcon from '@material-ui/icons/BrightnessLow';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";


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
                        onChange = {(event,newValue) => {this.props.readStateFunction("currentVolumePredictor",newValue)}}/>
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
                        onChange = {(event,newValue) => {this.props.readStateFunction("currentBrightnessPredictor", newValue)}}/>
                    </Grid>
                    <Grid item>
                        <BrightnessHighIcon className = "volume-item"/>
                    </Grid>
                </Grid>
            </div>
            <div className="volume-container gamers-colors-container block-center">
                <Typography gutterBottom className="option-name">Kolory paneli graczy</Typography>
                <Grid container spacing={2} className = "colors-grid block-center">
                    <Grid item sm={6}>
                        <InputBase type = "color" value = {this.props.gamersColors[0][0]} 
                        onChange = {(event) => {this.props.readStateFunction("currentGamersMenuColors", event.target.value, 0)}} className = "color-input"/>
                    </Grid>
                    <Grid item sm={6}>
                        <InputBase type = "color" value = {this.props.gamersColors[1][0]} 
                        onChange = {(event) => {this.props.readStateFunction("currentGamersMenuColors", event.target.value, 1)}} className = "color-input"/>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type = "button" className = "reset-colors-btn block-center"
                        onClick = {() => {this.props.readStateFunction("currentGamersMenuColors",this.props.gamersDefaultColors)}}>Reset</Button>
                    </Grid>
                </Grid>
            </div>
            <button type="button" className="going-back-button block-center" onClick = {() => {this.props.goingBackFunction()}}>Wróć</button>
        </div>
    }
}