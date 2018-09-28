import React, { Component } from 'react';


// ----------------------------------------------------------------------
// IMPORT HELPERS
// ----------------------------------------------------------------------

import { RGB2MSL }       from '../helpers/helper-color-convert-RGB.jsx'


// ----------------------------------------------------------------------
// IMPORT COMPONENTS
// ----------------------------------------------------------------------

import SwatchBackground from './SwatchBackground.jsx';
import SwatchLabel from './SwatchLabel.jsx';

// ----------------------------------------------------------------------
// DECLARE VARIABLES
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
// SWATCH LIST
// ----------------------------------------------------------------------

function SwatchItem(props) {

    const swatch = props.swatch;
    const handleSwatchClick = props.handleSwatchClick

    const r = swatch.rgb[0];
    const g = swatch.rgb[1];
    const b = swatch.rgb[2];

    swatch.msl = RGB2MSL(r, g, b)

    let swatchMedium = 'swatch-medium'

    if(swatch.id == 1){
        swatchMedium = 'swatch-medium selected'
    }

    
    return  <div className = {swatchMedium}>
                
                <SwatchLabel.asRGB  swatch      = {swatch} 
                                    className   = {'swatch-medium-label'} />

                <div    className   = 'swatch-medium-background' 
                        style       = {SwatchBackground.AsRGB(swatch.rgb)} 
                        onClick     = {() => handleSwatchClick(swatch)}> 
                </div>


                <div    className   = 'swatch-medium-background' 
                        style       = {SwatchBackground.AsRGB(swatch.msl.rgb)}></div>  

                <SwatchLabel.asMSL  swatch      = {swatch} 
                                    className   = {'swatch-medium-label'} />

                <SwatchLabel.asRGB  swatch      = {swatch} 
                                    className   = {'swatch-medium-label'} />

            </div>;
}

function SwatchList(props) {

    const dataSwatches = props.dataSwatches;
    const handleSwatchClick = props.handleSwatchClick

    const listItems     = dataSwatches.map((item, index) =>
        <SwatchItem key ={index} swatch={item} handleSwatchClick = {handleSwatchClick}/>
    );
    
    return listItems
}

// ----------------------------------------------------------------------
// CLASS SWATCHPALLET
// ----------------------------------------------------------------------

class PalletSwatchesMedium extends Component{

	constructor(props) {
		super(props);
        this.dataSwatches = props.dataSwatches
        this.handleSwatchClick = this.handleSwatchClick.bind(this);
	}

    handleSwatchClick(e) {

        console.log(e.rgb[0])
        console.log(e.rgb[1])
        console.log(e.rgb[2])
    }

  	render() {

        //console.log(' PalletSwatchesMedium render()')
        
	    return (<div>
                    <div className = 'pallet-medium'>
                        <SwatchList dataSwatches={this.dataSwatches} handleSwatchClick = {this.handleSwatchClick}/>
                    </div>
                </div>
                )
	}
}

export default PalletSwatchesMedium;