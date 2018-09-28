import React, { Component } from 'react';

// ----------------------------------------------------------------------
// IMPORT DATA
// ----------------------------------------------------------------------

import image0 from '../images/sample.png';

// ----------------------------------------------------------------------
// IMPORT COMPONENTS
// ----------------------------------------------------------------------

import ImageZoom from '../components/ImageZoom.jsx';
import PalletSwatches from './PalletSwatches.jsx';
import PalletMenu from '../components/PalletMenu';
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

let contextSource = {};

let dataSampled = {swatches:[]};
    dataSampled.swatches[0] = {rgb:[0,0,0],hex:'#000000', msl:{id:0}}
    dataSampled.swatches[1] = {rgb:[0,0,0],hex:'#000000', msl:{id:0}}

let dataSamples = {swatches:[]};

// ----------------------------------------------------------------------
// CANVAS COMPONENT
// ----------------------------------------------------------------------

class ImageSampler extends React.Component {

    constructor(props) {

      super(props);

      this.state = {
            dataSampled:dataSampled,
            dataSamples:dataSamples,
            swatchCount:0,
            point:{x:0,y:0},
            pointClicked:{x:0,y:0},
            sampleSize:1,
      };

      this.contextSource    = {}
      this.handleMouseMove  = this.handleMouseMove.bind(this);
      this.handleMouseDown  = this.handleMouseDown.bind(this);
      this.handleSelect     = this.handleSelect.bind(this);
    }

    // ----------------------------------------------------
    // START HANDEL EVENTS
    // ----------------------------------------------------

    handleSelect(value) {

        this.setState({sampleSize:value});
    }

    handleMouseMove(e) {
        this.pixelSampleCapture(e, 0);
    }

    handleMouseDown(e) {

        this.pixelSampleCapture(e, 1);
    }

    // ----------------------------------------------------
    // END HANDEL EVENTS
    // ----------------------------------------------------

    componentDidMount() {

        this.canvasUpdate();
    }

    // ----------------------------------------------------
    // START LOAD IMAGE
    // ----------------------------------------------------

    canvasUpdate() {
        
        const imageObject = new Image();
        const context = this.refs.canvas.getContext('2d');

        imageObject.src = image0;
        imageObject.onload = function() {

            context.fillStyle = 'rgb(255, 0, 255)';
            context.fillRect(0,0, 600, 399);
            context.drawImage(imageObject, 0, 0);    
        }

        this.contextSource = context;
    }

    // ----------------------------------------------------
    // END LOAD IMAGE
    // ----------------------------------------------------

    // ----------------------------------------------------
    // START PIXEL SAMPLER
    // ----------------------------------------------------

    pixelSampleCapture(e, toggle){

        let rect        = e.target.getBoundingClientRect()
        let point       = {}
            point.x     = e.clientX - rect.left
            point.y     = e.clientY - rect.top

        if(this.state.pointClicked.x === point.x && this.state.pointClicked.y === point.y ){
            return
        }

        let imageData   =  this.contextSource.getImageData(point.x, point.y, this.state.sampleSize, this.state.sampleSize);
        let rgb         = AverageRGB(imageData)

        this.setState({point:point});
        this.pixelSampleStore(toggle, point, rgb)
    }

    pixelSampleStore(toggle, point, rgb){

        let swatch      = new Swatch(toggle, point, rgb);
        let dataSampled = this.state.dataSampled;
        let dataSamples = this.state.dataSamples;

        dataSampled.swatches[toggle] = swatch;

        if(toggle === 1){

            let swatchCount = this.state.swatchCount + 1

            this.setState({
                swatchCount:swatchCount,
                pointClicked:point});

            swatch.id = this.state.swatchCount;

            dataSamples.swatches.push(swatch);
        }

        this.setState({
            dataSampled:dataSampled,
            dataSamples:dataSamples,

        })
    }

    // ----------------------------------------------------
    // END PIXEL SAMPLER
    // ----------------------------------------------------

    render() {
        return( <div>
                    <Grid>
                        <Row className="show-grid">
                            <Col xs={12} md={8}>
                                <canvas ref="canvas" 
                                        width={600} 
                                        height={399} 
                                        onMouseMove={this.handleMouseMove} 
                                        onMouseDown={this.handleMouseDown} />
                                <PalletMenu dataSwatches = {this.state.dataSamples.swatches}/>
                            </Col>
                            <Col xs={3} md={3}>
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
                            </Col>
                        </Row>
                    </Grid>
                </div>   
        );
    }
}

export default ImageSampler;

