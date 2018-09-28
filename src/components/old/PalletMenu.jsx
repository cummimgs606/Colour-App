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

class PalletMenu extends React.Component {

    constructor(props, context) {

        super(props, context);

        this.handleSelect = this.handleSelect.bind(this);

        console.log(props.dataSwatches);
        
        this.state = {
            key: 1,
            dataSwatches:props.dataSwatches,
        };
        
    }

    handleSelect(key) {

        this.setState({key});
        this.sortOrderChange(key)
    }
  
    sortOrderChange(key){

        let swatches;

        if(key === 1){

            swatches = Swatches.sortByIndex(this.state.dataSwatches)

        }else if(key === 2){

            this.swatches = Swatches.sortByPosition(this.state.dataSwatches)

        }else if(key === 3){

            swatches = Swatches.sortByHue(this.state.dataSwatches)
            
        }else if(key === 4){

            swatches = Swatches.sortByMunsell(this.state.dataSwatches)
        }

        this.setState({swatches:swatches});
    }
    
    render() {
        return (
                <div>
                    <Tabs
                        activeKey={this.state.key}
                        onSelect={this.handleSelect}
                        id="controlled-tab-example"
                    >
                    <Tab eventKey={1} title="Selected"></Tab>
                    <Tab eventKey={2} title="Position"></Tab>
                    <Tab eventKey={3} title="Hue"></Tab>
                    <Tab eventKey={4} title="Munsel"></Tab>
                    </Tabs>
                    <div className = 'Pallet'>
                       <PalletSwatchesSmall dataSwatches= {this.state.dataSwatches}/>
                    </div> 
                </div>
        );
    }
}

export default PalletMenu;

