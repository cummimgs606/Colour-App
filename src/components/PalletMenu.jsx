import React, { Component } from 'react';
import { Tabs } from 'react-bootstrap';
import { Tab } from 'react-bootstrap';

// ----------------------------------------------------------------------
// IMPORT COMPONENTS
// ----------------------------------------------------------------------

import PalletSwatchesSmall from './PalletSwatchesSmall.jsx';
import Swatches from '../classes/Swatches.js'

// ----------------------------------------------------------------------
// CANVAS COMPONENT
// ----------------------------------------------------------------------

let arrayLength = 0

class PalletMenu extends React.Component {
  
    constructor(props) {

        super(props);

        this.handleSelect           = this.handleSelect.bind(this)
        //this.munsellID              = props.munsellID
        this.handleSwatchClicked1   = props.handleSwatchClicked1
        this.handleSwatchClicked2   = props.handleSwatchClicked2
        this.toggleEvent            = props.toggleEvent
        this.dataSwatches           = props.dataSwatches 


        this.state = {  mode:'POS',
                        dataSwatchesLength:0};
    }


    shouldComponentUpdate(nextProps, nextState){

        return nextProps.toggleEvent
    }

    static getDerivedStateFromProps(props, state){

        if(props.dataSwatches.length !== state.dataSwatchesLength){
            Swatches.sortBy(state.mode)
            return {dataSwatchesLength:props.dataSwatches.length}
        }        

        return null
    }
    
    handleSelect(mode) {

        if(mode !== this.state.mode){
            this.setState({mode:mode})
            Swatches.sortBy(mode);
        }
    }

    render() {

        //console.log('PalletMenu render()')

        return (
                <div>
                    <Tabs
                        activeKey   = {this.state.mode}
                        onSelect    = {this.handleSelect}
                        id          = "controlled-tab-example">

                        <Tab eventKey = {'POS'} title = "Position"></Tab>
                        <Tab eventKey = {'HSL'} title = "HSL"></Tab>
                        <Tab eventKey = {'HEX'} title = "HEX"></Tab>
                        <Tab eventKey = {'CMY'} title = "CMYK"></Tab>
                        <Tab eventKey = {'MSL'} title = "Munsel"></Tab>
                    </Tabs>

                    <div className  = "pallet-menu-small">
                        <div className  = 'pallet'>
                           <PalletSwatchesSmall dataSwatches            = {this.dataSwatches} 
                                                mode                    = {this.state.mode}
                                                handleSwatchClicked1    = {this.handleSwatchClicked1}
                                                handleSwatchClicked2    = {this.handleSwatchClicked2}/>
                        </div> 
                    </div>
                </div>
        );
    }
}

export default PalletMenu;
