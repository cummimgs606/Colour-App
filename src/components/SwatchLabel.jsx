import React, { Component } from 'react';

class SwatchLabel extends Component{

    static asRGB(props){

        let swatchHex = props.swatch.hex;
        let className = props.className

        return  <div className = {className}>
                    HEX: {swatchHex}
                </div>
    }

    static asMSL(props){

        let swatchID    = props.swatch.id
        let mslValue    = props.swatch.msl.value;
        let mslCroma    = props.swatch.msl.croma;
        let mslHueID    = props.swatch.msl.hue.id
        let mslHueName  = props.swatch.msl.hue.name;
        let whiteSpace  = '&nbsp;'

        return  <div className={props.className}>
                    {swatchID}&nbsp;<span>H:{mslHueID} V:{mslValue} C:{mslCroma}</span>&nbsp;{mslHueName }
                </div> 
    }
}

export default SwatchLabel;

