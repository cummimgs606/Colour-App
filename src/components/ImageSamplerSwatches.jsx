import React, { Component } from 'react';

// ----------------------------------------------------------------------
// IMPORT COMPONENTS
// ----------------------------------------------------------------------

import ImageSamplerZoom         from '../components/ImageSamplerZoom.jsx';
import PalletSwatchesMedium     from './PalletSwatchesMedium.jsx';
import Swatch                   from '../classes/Swatch.js'


// ----------------------------------------------------------------------
// IMPORT HELPERS
// ----------------------------------------------------------------------

import { AverageRGB }       from '../helpers/helper-color-avaerage-RGB.js';

// ----------------------------------------------------------------------
// DECLARE VARIABLES
// ----------------------------------------------------------------------


let dataSampled = {swatches:[]};
    dataSampled.swatches[0] = {rgb:[0,0,0],hex:'#000000', msl:{id:0}}
    dataSampled.swatches[1] = {rgb:[0,0,0],hex:'#000000', msl:{id:0}}

// ----------------------------------------------------------------------
// CANVAS COMPONENT
// ----------------------------------------------------------------------

class ImageSamplerSwatches extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            dataSampled:dataSampled,
		};
    }


    // ----------------------------------------------------
    // END HANDEL EVENTS
    // ----------------------------------------------------

    componentWillReceiveProps(nextProps){
        
        this.geom           = nextProps.geom
        this.point          = {x:this.geom.x, y:this.geom.y}
        this.toggleEvent    = nextProps.toggleEvent
        this.contextSource  = nextProps.contextSource
        this.sampleSize 	= nextProps.sampleSize

        this.pixelSample(this.point, this.toggleEvent, this.sampleSize)
    }

    // ----------------------------------------------------
    // START PIXEL SAMPLER
    // ----------------------------------------------------

    pixelSample(point, toggleEvent, sampleSize){

        if(toggleEvent > 1){
            return
        }
        
        let imageData   = this.contextSource.getImageData(point.x, point.y, sampleSize, sampleSize);
        let rgb         = AverageRGB(imageData)
        let swatch      = new Swatch(toggleEvent, point, rgb);

        let dataSampled = this.state.dataSampled;
            dataSampled.swatches[toggleEvent] = swatch;

        this.setState({dataSampled:dataSampled})
    }

    // ----------------------------------------------------
    // END PIXEL SAMPLER
    // ----------------------------------------------------

    render() {
        return( <div>
                    <div className = 'PalletSmall'>
                        <ImageSamplerZoom       contextSource   = {this.contextSource} 
                                                point           = {this.point} 
                                                sampleSize      = {this.sampleSize}/>
                        <PalletSwatchesMedium   dataSwatches    = {this.state.dataSampled.swatches} />
                    </div>     
                </div>   
            );
    }
}

export default ImageSamplerSwatches;

