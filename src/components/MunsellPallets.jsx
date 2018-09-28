import React, { Component } from 'react';

// ----------------------------------------------------------------------
// IMPORT COMPONENTS
// ----------------------------------------------------------------------

import Swatches             from '../classes/Swatches.js'
import SwatchBackground     from './SwatchBackground.jsx';
import SwatchLabel          from './SwatchLabel.jsx';
import DataMunsellTable     from '../data/data-munsell-table-colors.json';
import DataMunsellGray      from '../data/data-munsell-table-grays.json';
import DataMunsellCroma     from '../data/data-munsell-table-croma.json';

// ----------------------------------------------------------------------
// PARSE DATA
// ----------------------------------------------------------------------

function makeLinks(dataSwatches){

    let prevSwatch = {}
    let nextSwatch = {}

    let prevHue = ''
    let nextHue = ''

    for (let i = 0; i < dataSwatches.length; i++) {
    
        dataSwatches[i].link = {left:0,right:0}
    }

    for (let i = 0; i < dataSwatches.length-1; i++) {

        prevSwatch = dataSwatches[i]
        nextSwatch = dataSwatches[i+1]

        prevHue = prevSwatch.msl.hue.id
        nextHue = nextSwatch.msl.hue.id

        if(prevHue !== nextHue){
            prevSwatch.link.right = 1
        }

        if(nextHue !== prevHue){
            nextSwatch.link.left = 1
        }

        if(i === 0){
            prevSwatch.link.left = 1
        }
        if(i === dataSwatches.length-2){
            nextSwatch.link.right = 1
        }
    }
}

function SwatchItemColours(props){

    let selectedID      = props.swatch.msl.hue.id
    let swatchValue     = props.swatch.msl.value
    let swatchHue       = props.swatch.msl.hue
    let swatchRGB       = props.swatch.rgb     
    let swatchlightness = (Math.max(swatchRGB[0], swatchRGB[1], swatchRGB[2]) + Math.min(swatchRGB[0], swatchRGB[1], swatchRGB[2])) / 2;

    let RGBMunsell  = props.swatch.msl.rgb
    let RGBCroma    = DataMunsellCroma[selectedID].rgb
    let RGBValue    = DataMunsellGray[10-swatchValue].rgb
    let RGBLuma     = [swatchlightness, swatchlightness, swatchlightness]

    let swatchMicroBackground = 'swatch-micro-background'

    if(swatchHue  < 0){
        swatchMicroBackground = 'swatch-micro-background empty'
        RGBCroma = [0,0,0]
    }

    return  <div className='pallet-micro'>
                <div className={swatchMicroBackground}          style={SwatchBackground.AsRGB(RGBCroma)}></div>
                <div className={'swatch-micro-background'}      style={SwatchBackground.AsRGB(RGBMunsell)}></div>
                <div className={'swatch-micro-background'}      style={SwatchBackground.AsRGB(RGBValue)}></div>
                <div className={'swatch-micro-background long'} style={SwatchBackground.AsRGB(RGBLuma)}></div>
            </div>
}

// ----------------------------------------------------------------------
// SWATCH LIST
// ----------------------------------------------------------------------

function SwatchItem(props) {

    let swatch                  = props.swatch;
    let swatchRGB               = props.swatch.rgb
    let swatchID                = props.swatchSelected.id
    let swatchLarge             = 'swatch-large'
    let swatchLargeLabel        = 'swatch-large-label'
    let swatchLargeBackground   = 'swatch-large-background'
    let handleSwatchClick       = props.handleSwatchClick

    if(swatch.id === swatchID){
        swatchLarge             = 'swatch-large selected'
        swatchLargeBackground   = 'swatch-large-background selected'
        swatchLargeLabel        = 'swatch-large-label selected' 
    }

    if(swatch.link.left){
        swatchLargeBackground += ' left'
        swatchLarge += ' left'
    }

    if(swatch.link.right){
        swatchLargeBackground += ' right'
    }

    return  <div className={swatchLarge}>
                <div    className   = {swatchLargeBackground} 
                        style       = {SwatchBackground.AsRGB(swatchRGB)} 
                        onClick     = {() => handleSwatchClick(swatch)}> 
                    <SwatchLabel.asMSL  className   = {swatchLargeLabel}
                                        swatch      = {swatch} />
                    <div className = 'swatch-large-label'>
                        <SwatchItemColours swatch = {swatch} />
                    </div>
                </div>
            </div>;
}

function SwatchList(props) {

    let swatchSelected      = props.swatchSelected
    let handleSwatchClick   = props.handleSwatchClick
    let dataSwatches        = Swatches.copy(props.dataSwatches)
        dataSwatches        = Swatches.sortByMSL(dataSwatches)

        makeLinks(dataSwatches)

    const listItems = dataSwatches.map((item, index) =>

        <SwatchItem key                 = {index} 
                    swatch              = {item} 
                    swatchSelected      = {swatchSelected}
                    handleSwatchClick   = {handleSwatchClick}/>
    );
    
    return listItems
}

// ----------------------------------------------------------------------
// CLASS SWATCHPALLET
// ----------------------------------------------------------------------

class MunsellPallets extends Component{

	constructor(props) {
		super(props);

        this.dataSwatches       = props.dataSwatches
        this.swatchSelected     = props.swatchSelected
        this.handleSwatchClick  = this.handleSwatchClick.bind(this);
	}

    componentWillReceiveProps(nextProps){
  
        this.swatchSelected = nextProps.swatchSelected
    }

    handleSwatchClick(e) {

        //console.log(e.rgb[0])
        //console.log(e.rgb[1])
        //console.log(e.rgb[2])
    }

  	render() {

	    return (
                    <div className = 'pallet-menu-small'>
                        <div className = 'pallet'>
                            <SwatchList dataSwatches        = {this.dataSwatches} 
                                        swatchSelected      = {this.swatchSelected}
                                        handleSwatchClick   = {this.handleSwatchClick}/>
                        </div>
                    </div>
              
                )
	       }
}

export default MunsellPallets;