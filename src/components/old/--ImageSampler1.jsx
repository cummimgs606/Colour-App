import React, { Component } from 'react';

// ----------------------------------------------------------------------
// IMPORT DATA
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
// IMPORT COMPONENTS
// ----------------------------------------------------------------------

import ImageZoom from '../components/ImageZoom.jsx';
import PalletMenu from '../components/PalletMenu';
import PalletSwatches from './PalletSwatches.jsx';
import Swatch from '../classes/Swatch.js'


// ----------------------------------------------------------------------
// IMPORT BOOTSTRAP
// ----------------------------------------------------------------------

import { ButtonToolbar } from 'react-bootstrap';
import { ToggleButtonGroup } from 'react-bootstrap';
import { ToggleButton } from 'react-bootstrap';
import { Grid } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';


// ----------------------------------------------------------------------
// IMPORT HELPERS
// ----------------------------------------------------------------------

import { AverageRGB } from '../helpers/helper-color-avaerage-RGB.js';

// ----------------------------------------------------------------------
// DECLARE VARIABLES
// ----------------------------------------------------------------------


let dataSampled = {swatches:[]};
    dataSampled.swatches[0] = {rgb:[0,0,0],hex:'#000000', msl:{id:0}}
    dataSampled.swatches[1] = {rgb:[0,0,0],hex:'#000000', msl:{id:0}}

//let dataSamples = {swatches:[]};

// ----------------------------------------------------------------------
// CANVAS COMPONENT
// ----------------------------------------------------------------------

class ImageSampler extends React.Component {

    constructor(props) {

      super(props);

      this.state = {
            value:0,
            dataSampled:dataSampled,
            dataSamples:{swatches:[]},
            sampleSize:1,
      };

      this.handleSelect = this.handleSelect.bind(this);
    }

    // ----------------------------------------------------
    // START HANDEL EVENTS
    // ----------------------------------------------------

    handleSelect(value) {

        this.setState({sampleSize:value});
    }

    // ----------------------------------------------------
    // END HANDEL EVENTS
    // ----------------------------------------------------

    componentWillReceiveProps(nextProps){
        
        this.geom           = nextProps.geom
        this.point          = {x:nextProps.geom.x,y:nextProps.geom.y}
        this.points         = nextProps.points
        this.toggle         = nextProps.toggle
        this.contextSource  = nextProps.contextSource

        this.pixelSampled(this.point, this.toggle)
        this.pixelSamples(this.points, this.toggle)
        this.setState({point:this.point});
    }

    // ----------------------------------------------------
    // START PIXEL SAMPLER
    // ----------------------------------------------------

    pixelSampled(point, toggle){
        
        let rgb         = this.getImageDataRGB(point.x, point.y, this.state.sampleSize, this.state.sampleSize);
        let swatch      = new Swatch(toggle, point, rgb);
        let dataSampled = this.state.dataSampled;
            dataSampled.swatches[toggle] = swatch;
    }

    pixelSamples(points, toggle){

        if(toggle === 1){

            let dataSamples = this.state.dataSamples
            let i

            for(i = points.length; i >= 0 ; i--){

                dataSamples.swatches.pop()
            }

            for(i = 0; i < points.length; i++){

                let point   = points[i]
                let rgb     = this.getImageDataRGB(point.x, point.y, this.state.sampleSize, this.state.sampleSize);
                let swatch  = new Swatch(points[i].name, point, rgb);

                dataSamples.swatches[i] = swatch
            }

            this.setState({dataSamples:dataSamples}) 
       }
    }

    getImageDataRGB(x,y,w,h){

        let imageData   = this.contextSource.getImageData(x, y, w, h);
        let rgb         = AverageRGB(imageData)

        return rgb
    }

    // ----------------------------------------------------
    // END PIXEL SAMPLER
    // ----------------------------------------------------

    render() {
        return( <div>
                    <Grid>
                        <Row className="show-grid">
                            <Col xs={4} md={8}>
                                <ButtonToolbar>
                                    <ToggleButtonGroup  type="radio"
                                                        value={this.state.value}
                                                        onChange={this.handleSelect}
                                                        name="options">
                                        <ToggleButton value={1}>1x1</ToggleButton>
                                        <ToggleButton value={3}>3x3</ToggleButton>
                                        <ToggleButton value={5}>5x5</ToggleButton>
                                        <ToggleButton value={7}>7x7</ToggleButton>
                                    </ToggleButtonGroup>
                                </ButtonToolbar>
                                <div className = 'Pallet'>
                                    <ImageZoom  contextSource = {this.contextSource} 
                                                point = {this.state.point} 
                                                sampleSize = {this.state.sampleSize}/>
                                    <PalletSwatches dataSwatches = {this.state.dataSampled.swatches} />
                                </div> 
                                   
                                <PalletMenu dataSwatches = {this.state.dataSamples.swatches}/>
                            </Col>
                        </Row>
                    </Grid>
                </div>   
        );
    }
}

export default ImageSampler;

