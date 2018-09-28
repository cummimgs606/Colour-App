import React, { Component }     from 'react';
import ReactDom from 'react-dom';
// ----------------------------------------------------------------------
// IMPORT DATA
// ----------------------------------------------------------------------

import image0                   from '../images/1800x1600.jpg';

// ----------------------------------------------------------------------
// IMPORT CLASSES
// ----------------------------------------------------------------------

import Points                   from '../classes/Points.js'
import Canvas                   from '../classes/Canvas.js'
import Swatches                 from '../classes/Swatches.js'
import DataFile                 from '../classes/DataFile.js'
import DataStorage              from '../classes/DataStorage.js'

// ----------------------------------------------------------------------
// IMPORT COMPNENTS
// ----------------------------------------------------------------------

import PointLabels              from '../components/PointLabels.jsx'
import PalletMenu               from '../components/PalletMenu'
import ImageSamplerSwatches     from '../components/ImageSamplerSwatches.jsx'
import ImageSamplerSize         from '../components/ImageSamplerSize.jsx'
import FileManager              from '../components/FileManager.jsx'
import MunsellTable             from '../components/MunsellTable.jsx'
import MunsellPallets           from '../components/MunsellPallets.jsx'
import MusellDataMaker          from '../components/MusellDataMaker.jsx'

// ----------------------------------------------------------------------
// IMPORT BOOTSTRAP
// ----------------------------------------------------------------------

import { ButtonToolbar }        from 'react-bootstrap';
import { ToggleButtonGroup }    from 'react-bootstrap';
import { ButtonGroup }          from 'react-bootstrap';
import { ToggleButton }         from 'react-bootstrap';
import { Grid }                 from 'react-bootstrap';
import { Row }                  from 'react-bootstrap';
import { Col }                  from 'react-bootstrap';
import { Glyphicon }            from 'react-bootstrap';
import { Badge }                from 'react-bootstrap';
import { Well }                 from 'react-bootstrap';
import { PageHeader }           from 'react-bootstrap';

// ----------------------------------------------------------------------
// IMPORT EXTRAS
// ----------------------------------------------------------------------


// ----------------------------------------------------------------------
// DECLARE VARIABLES
// ----------------------------------------------------------------------



// ----------------------------------------------------------------------
// CANVAS COMPONENT
// ----------------------------------------------------------------------

class PointSampler extends React.Component {

    constructor(props) {

      super(props);

        this.state = {
            geom:{name:0,style:0,x:0,y:0,l:0,t:0,r:0,b:0,w:0,h:0},
            mode:'modeAdd',
            sampleSize:1,
            toggleEvent:0,
            munsellID:0,
            swatchSelected:{}
        };

        this.canvas                     = new Canvas(1800, 1600, 1, 1) 
        //this.munsellID                  = 0

        this.handleSelectSize           = this.handleSelectSize.bind(this)
        this.handleSelectMode           = this.handleSelectMode.bind(this)

        this.handleFileNew              = this.handleFileNew.bind(this)
        this.handleFileSave             = this.handleFileSave.bind(this)
        this.handleFileLoad             = this.handleFileLoad.bind(this)

        this.handelCanvasMove           = this.handelCanvasMove.bind(this)
        this.handelCanvasDown           = this.handelCanvasDown.bind(this)
        this.handleCanvasLeave          = this.handleCanvasLeave.bind(this)

        this.handleMouseDown            = this.handleMouseDown.bind(this)
        this.handleDragEnd              = this.handleDragEnd.bind(this)
        this.handleDragStart            = this.handleDragStart.bind(this)
        this.handleMouseOver            = this.handleMouseOver.bind(this)
        this.handleSwatchClicked1       = this.handleSwatchClicked1.bind(this)
        this.handleSwatchClicked2       = this.handleSwatchClicked2.bind(this)
    }

    // ----------------------------------------------------
    // HANDLE EVENT FROM PalletSwatchesSmall
    // ----------------------------------------------------  

    handleSwatchClicked1(swatch, mode) {

        console.log('handleSwatchClicked1(swatch, mode)')

        this.scrollCanavs(swatch)
        this.setState({geom:swatch.point}) 
        this.setState({munsellID:swatch.msl.id})
        this.setState({swatchSelected:swatch})


        //console.log(this.state.swatchSelected)

        this.munsellID = swatch.msl.id 


        this.setState({toggleEvent:1})
    }  

    handleSwatchClicked2(swatch, mode) {

        //console.log('handleSwatchClicked2(props)')
   
    }  

    // ----------------------------------------------------
    // HANDLE EVENT FROM ToggelButtonGroup - ADD DELETE MOVE
    // ----------------------------------------------------

    handleSelectMode(value) {

        this.setState({mode:value})
    }

    // ----------------------------------------------------
    // HANDLE EVENT FROM ImageSamplerSize
    // ----------------------------------------------------

    handleSelectSize(value) {

        this.setState({sampleSize:value})
    }

    // ----------------------------------------------------
    // HANDLE EVENT FROM FileManager
    // ----------------------------------------------------

    handleFileNew(source, width, height, name){

        Swatches.delete()
        Points.pointsDelete();
        
        this.canvas     = DataFile.new(this.refs.canvas.getContext('2d'), source, width, height, name) 
        this.munsellID  = null

        DataStorage.save(this.canvas, Points.points)
        this.setState({toggleEvent:1})
    }

    handleFileLoad(json){

        Swatches.delete()
        Points.pointsDelete()
        Points.pointsAdd(json.points)

        let callback    = (context) => {    Swatches.update(context, Points.points, 1);
                                            this.setState({toggleEvent:1})}

        this.canvas     = DataFile.loadCanvas(callback, this.refs.canvas.getContext('2d'), json)
        this.munsellID  = null

        DataStorage.save(this.canvas, Points.points)
        this.setState({toggleEvent:1})
    }

    handleFileSave(){

        DataFile.save(this.canvas, Points.points)
    }
    
    // ----------------------------------------------------
    // HANDLE EVENT FROM canvas
    // ----------------------------------------------------

    handelCanvasMove(e) {

        //console.log('handelCanvasMove(e)')
        
        this.setState({geom:Points.geom(e)}) 
        this.setState({toggleEvent:0})
    }

    handleCanvasLeave(e) {

        //console.log('handleCanvasLeave(e)')

        if(e !== undefined){

            this.setState({toggleEvent:2})
        }
    }

    handelCanvasDown(e) {

        //console.log('handelCanvasDown(e')

        if(this.state.mode === 'modeAdd'){

            if(e !== undefined){

                this.setState({toggleEvent:1})
                this.labelAdd(e)
            }
        }
    }

    // ----------------------------------------------------
    // HANDLE EVENT FROM PointLabels
    // ----------------------------------------------------

    handleMouseDown(e, index){

        if(this.state.mode === 'modeDelete'){

            if(index !== undefined && e !== undefined){

                this.setState({toggleEvent:1})
                this.labelDelete(index)
            }
        }
    }

    handleDragStart(e, index) {

        if(this.state.mode === 'modeMove'){

            if(index !== undefined && e !== undefined){
                this.setState({toggleEvent:0})
                this.labelDragStart(index)
            }
        }
    }

    handleDragEnd(e, index){

        if(this.state.mode === 'modeMove'){

            if(index !== undefined && e !== undefined){

                this.setState({toggleEvent:1})
                this.labelDragEnd(e, index)
            }
        }
    }

    handleMouseOver(e, index) {

        this.setState({toggleEvent:0})

        if(this.state.mode !== 'modeMove'){

            this.labelMouseOver(index)
        }
    }

    // ----------------------------------------------------
    // END EVENTS
    // ---------------------------------------------------- 

    // ----------------------------------------------------
    // START MODIFYERS FOR PointLabels
    // ----------------------------------------------------

    labelAdd(e){

        let geom    = Points.geom(e)

        if(!Points.geomCompare(geom)){

            Points.pointAdd(geom)
            Points.unselect()
            Points.rename()
            Points.style()
            Swatches.update(this.canvas.contextSource, Points.points, this.state.sampleSize)
            DataStorage.save(this.canvas, Points.points)
        }
    }

    labelDelete(index){

        Points.pointDelete(index)
        Points.unselect()
        Points.rename()
        Swatches.update(this.canvas.contextSource, Points.points, this.state.sampleSize)
        DataStorage.save(this.canvas, Points.points)
    }

    // ----------------------------------------------------

    labelDragStart(index){

        Points.styleDrag(index)
        this.setState({toggleEvent:1})
    }

    labelDragEnd(e, index){

        Points.geomBoundary(e, index, this.state.geom)
        Points.unselect()
        Points.rename()
        Points.style()
        
        Swatches.update(this.canvas.contextSource, Points.points, this.state.sampleSize)
        DataStorage.save(this.canvas, Points.points)
    }

    labelMouseOver(index){

        this.setState({geom:Points.point(index)})
    }

    // ----------------------------------------------------
    // START MODIFYERS FOR Canavs
    // ----------------------------------------------------

    scrollCanavs(swatch){

        let canvasWindow = ReactDom.findDOMNode(this.refs.canvasWindow)

        Points.unselect()
        Points.select(swatch.id)

        canvasWindow.scrollLeft     = Points.point(swatch.id).x - (canvasWindow.clientWidth/2)
        canvasWindow.scrollTop      = Points.point(swatch.id).y - (canvasWindow.clientHeight/2)
    }

    // ----------------------------------------------------
    // CYCLE HOOKS
    // ----------------------------------------------------


    componentDidMount() {

        //console.log('componentDidMount()')

        if(JSON.parse(localStorage.getItem("name"))){

            let callback    = (context) => {    Swatches.update(context, Points.points, 1);
                                                this.setState({toggleEvent:1})}

            let data =  DataStorage.load()

            this.canvas     = {}
            this.canvas     = new Canvas(data.width, data.height, 1, 1)
            this.canvas.addImage(data.source, this.refs.canvas.getContext('2d'), data.name, callback)

            Points.pointsDelete()
            Points.pointsAdd(data.points)

        }else{

            //this.canvas.addImage(image0, this.refs.canvas.getContext('2d')) 
        }

        this.setState({toggleEvent:1})
    }

    // ----------------------------------------------------
    // END LOAD IMAGE
    // ----------------------------------------------------


    render() {
        return( <div>
                    <Grid>

                        <PageHeader>
                          Swatch IT <small>image sampler</small>
                        </PageHeader>
    
                        <Row className="show-grid">

                            <Col sm={8} md={8}>

                                <Well>
 
                                    <ButtonToolbar>

                                        <ButtonGroup>

                                            <FileManager    handleFileNew     = {this.handleFileNew}
                                                            handleFileSave    = {this.handleFileSave}
                                                            handleFileLoad    = {this.handleFileLoad}/>

                                        </ButtonGroup>


                                        <ToggleButtonGroup  type         = "radio"
                                                            value        = {this.state.value}
                                                            defaultValue = {'modeAdd'}
                                                            onChange     = {this.handleSelectMode}
                                                            name         = "options">

                                            <ToggleButton value = {'modeAdd'}><Glyphicon glyph="plus" /></ToggleButton>
                                            <ToggleButton value = {'modeDelete'}><Glyphicon glyph="minus" /></ToggleButton>
                                            <ToggleButton value = {'modeMove'}><Glyphicon glyph="move" /></ToggleButton>
                                            <ToggleButton value = {'modeCount'} disabled><Badge>{Points.points.length}</Badge></ToggleButton>
                                                    
                                        </ToggleButtonGroup>

                                    </ButtonToolbar>

                                </Well>

                                
                                <div id="canvas-window" ref = 'canvasWindow'>

                                    <PointLabels    points          = {Points.points}
                                                    toggleEvent     = {this.state.toggleEvent}
                                                    handleMouseDown = {this.handleMouseDown}
                                                    handleDragStart = {this.handleDragStart}
                                                    handleDragEnd   = {this.handleDragEnd}
                                                    handleMouseOver = {this.handleMouseOver}/>

                                    <canvas ref             = "canvas" 
                                            width           = {this.canvas.totalWidth} 
                                            height          = {this.canvas.totalHeight}  
                                            onMouseMove     = {this.handelCanvasMove} 
                                            onMouseDown     = {this.handelCanvasDown}
                                            onMouseLeave    = {this.handleCanvasLeave}/>  

                                </div> 

                            </Col>

                            <Col sm={4} md={4}>

                                <Well>
                                    <ImageSamplerSize handleSelectSize = {this.handleSelectSize}/>
                                </Well>

                                <ImageSamplerSwatches   contextSource   = {this.canvas.contextSource} 
                                                        geom            = {this.state.geom}
                                                        toggleEvent     = {this.state.toggleEvent}
                                                        sampleSize      = {this.state.sampleSize}/>
                            </Col>

                        </Row>

                        <Row className="show-grid">

                            <Col sm={8} md={8}>

                                <PalletMenu dataSwatches            = {Swatches.swatches} 
                                            toggleEvent             = {this.state.toggleEvent}
                                            handleSwatchClicked1    = {this.handleSwatchClicked1}
                                            handleSwatchClicked2    = {this.handleSwatchClicked2 }/>
                              
                            </Col>
                        </Row>

                        <Row className="show-grid">

                            <Col sm={8} md={8}>

                                <MunsellTable   toggleEvent     = {this.state.toggleEvent}
                                                swatchSelected  = {this.state.swatchSelected}/>
                              
                            </Col>
                        </Row>
                        <Row className="show-grid">

                            <Col sm={8} md={8}>

                                <MunsellPallets     dataSwatches    = {Swatches.swatches} 
                                                    swatchSelected  = {this.state.swatchSelected}/>

                                <MusellDataMaker/>
                              
                            </Col>
                        </Row>



                        
                    </Grid>
                </div>
            );
    }
}

/*<MusellDataMaker/>*/
export default PointSampler;

