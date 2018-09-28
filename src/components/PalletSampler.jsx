import React, { Component } from 'react';

// ----------------------------------------------------------------------
// IMPORT DATA
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
// IMPORT COMPONENTS
// ----------------------------------------------------------------------

import PalletMenu from '../components/PalletMenu';
import Swatch from '../classes/Swatch.js'

// ----------------------------------------------------------------------
// IMPORT HELPERS
// ----------------------------------------------------------------------

import { AverageRGB } from '../helpers/helper-color-avaerage-RGB.js';


// ----------------------------------------------------------------------
// CANVAS COMPONENT
// ----------------------------------------------------------------------

class PalletSampler extends React.Component {

    // CHANGE TO CANVAS SAMPLER 

    constructor(props) {

        super(props);

        this.handleSwatchClicked   = props.handleSwatchClicked

        this.state = {
            dataSamples:{swatches:[]}
        };
    }

    // ----------------------------------------------------
    // START HANDEL EVENTS
    // ----------------------------------------------------

    // ----------------------------------------------------
    // END HANDEL EVENTS
    // ----------------------------------------------------

    componentDidUpdate(nextProps){
        
        this.points                 = nextProps.points
        this.toggle                 = nextProps.toggle
        this.contextSource          = nextProps.contextSource
        this.sampleSize             = nextProps.sampleSize 
        this.handleSwatchClicked    = nextProps.handleSwatchClicked

        this.pixelSamples(this.points, this.toggle, this.sampleSize)
        this.setState({point:this.point});
    }

    // ----------------------------------------------------
    // START PIXEL SAMPLER
    // ----------------------------------------------------

    pixelSamples(points, toggle, sampleSize){

        //let names = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

        if(toggle === 1){

            let dataSamples = this.state.dataSamples
            let i
            
            dataSamples.length = 0

            for(i = 0; i < points.length; i++){

                let point       = points[i]
                let imageData   = this.contextSource.getImageData(point.x, point.y, sampleSize, sampleSize);
                let rgb         = AverageRGB(imageData)
                let swatch      = new Swatch(points[i].name, point, rgb);

                dataSamples.swatches[i] = swatch
            }

            this.setState({dataSamples:dataSamples}) 
       }
    }

    // ----------------------------------------------------
    // END PIXEL SAMPLES
    // ----------------------------------------------------

    render() {
        return( <div>
                    <PalletMenu dataSwatches            = {this.state.dataSamples.swatches} 
                                toggle                  = {this.state.toggle}
                                handleSwatchClicked     = {this.handleSwatchClicked }/>
                </div>   
        );
    }
}

export default PalletSampler;

