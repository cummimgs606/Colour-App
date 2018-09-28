import React, { Component } from 'react';

// ----------------------------------------------------------------------
// IMPORT COMPONENTS
// ----------------------------------------------------------------------

import SwatchBackground     from './SwatchBackground.jsx';
import { OverlayTrigger }   from 'react-bootstrap';
import { Tooltip }          from 'react-bootstrap';
import SwatchLabel          from '../classes/SwatchLabel.js'

// ----------------------------------------------------------------------
// SWATCH LIST
// ----------------------------------------------------------------------

function SwatchItem(props) {

    // CHANGE AND MANAGE COLOURTYPE

    let mode                    = props.mode
    let swatch                  = props.swatch;
    let handleSwatchClicked1    = props.handleSwatchClicked1
    let handleSwatchClicked2    = props.handleSwatchClicked2
    let label                   = SwatchLabel.label(swatch, mode)
    let selected                = props.swatch.point.selected

    let styleSelected

    if(selected === true){

       styleSelected = 'selected'

    }else{

        styleSelected = ''
    }

    const tooltip = (
        <Tooltip id="tooltip">
            <h6>{label}</h6>
        </Tooltip>
    );

    return  <div className={'swatch-small '+styleSelected}>

                <div    className       = {'swatch-small-background '+styleSelected}
                        style           = {SwatchBackground.AsRGB(swatch.rgb)} 
                        onClick         = {() => handleSwatchClicked1(swatch, mode)}> 

                    <OverlayTrigger placement="top" overlay={tooltip}>

                        <div    className   = {'swatch-small-label '+styleSelected}
                                onClick     = {() => handleSwatchClicked2(swatch, mode)}>{swatch.id}


                        </div>

                    </OverlayTrigger>

                    </div>
                  
                
            </div>
}


function SwatchList(props) {

    const mode                      = props.mode
    const dataSwatches              = props.dataSwatches;
    const handleSwatchClicked1      = props.handleSwatchClicked1
    const handleSwatchClicked2      = props.handleSwatchClicked2

    const listItems = dataSwatches.map((item, index) =>
        <SwatchItem key                     = {index} 
                    mode                    = {mode} 
                    swatch                  = {item} 
                    handleSwatchClicked1 = {handleSwatchClicked1}
                    handleSwatchClicked2 = {handleSwatchClicked2}/>
    );
    
    return listItems
}

// ----------------------------------------------------------------------
// CLASS SWATCHPALLET
// ----------------------------------------------------------------------

class PalletSwatchesSmall extends Component{

	constructor(props) {

		super(props);

        this.mode                   = props.mode
        this.dataSwatches           = props.dataSwatches
        this.handleSwatchClicked1   = props.handleSwatchClicked1
        this.handleSwatchClicked2   = props.handleSwatchClicked2
	}

    handleSwatchClicked1(props) {

        this.handleSwatchClicked1(props)
    }

    handleSwatchClicked2(props) {

        this.handleSwatchClicked2(props)
    }

    componentWillReceiveProps(nextProps){
        /*this.mode = nextProps.mode*/
    }

  	render() {

        //console.log('PalletSwatchesSmall render()')
        
	    return (<div>
                    <div className = 'pallet-small'>
                        <SwatchList mode                    = {this.mode} 
                                    dataSwatches            = {this.dataSwatches} 
                                    handleSwatchClicked1    = {this.handleSwatchClicked1}
                                    handleSwatchClicked2    = {this.handleSwatchClicked2}/>
                    </div>
                </div>
                )
	}
}

export default PalletSwatchesSmall;