import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";

import SliderComponent from "./sliderComponent.jsx";


export default class OptionsPanel extends React.Component{
    render(){
        return <div className="options-panel">
            <SliderComponent
            sliderName="Głośność" sliderKey = "volumeSlider"
            defaultValue = {this.props.defaultVolumeValue} minValue = {0.0} maxValue = {1.0} step = {0.01}
            predictorName = "currentVolumePredictor"
            callBackFunction = {this.props.readStateFunction}
            type = "volume" classes = {"volume-container block-center"}/>
            <SliderComponent
            sliderName="Jasność ekranu" sliderKey = "brightnessSlider"
            defaultValue = {this.props.defaultBrightnessValue} minValue = {0} maxValue = {100} step = {1}
            predictorName = "currentBrightnessPredictor"
            callBackFunction = {this.props.readStateFunction}
            type = "brightness" classes = {"volume-container block-center"}/>
            <div className="volume-container gamers-colors-container block-center">
                <Typography gutterBottom className="option-name">Kolory paneli graczy</Typography>
                <Grid container spacing={2} className = "colors-grid block-center">
                    <Grid item xs = {12}>
                        <InputBase type = "color" value = {this.props.gamersColors[0][0]} 
                            onChange = {(event) => {this.props.readStateFunction("currentGamersMenuColors", event.target.value, 0)}} className = "color-input"/>
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