import React, { Component } from 'react';
import { Tabs } from 'react-bootstrap';
import { Tab } from 'react-bootstrap';

// ----------------------------------------------------------------------
// IMPORT DATA
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
// IMPORT COMPONENTS
// ----------------------------------------------------------------------

import PalletSwatchesSmall from './PalletSwatchesSmall.jsx';

// S TEST
//import dataTest from '../data/data-test-sampled.json';
// E TEST

// ----------------------------------------------------------------------
// DECLARE VARIABLES
// ----------------------------------------------------------------------

let oldProps = '';
let newProps = '';

let dataSamplesOrderd

// ----------------------------------------------------------------------
// CANVAS COMPONENT
// ----------------------------------------------------------------------

class PalletMenu extends React.Component {

    constructor(props, context) {

        super(props, context);

        this.handleSelect = this.handleSelect.bind(this);

        this.state = {
            key: 1,
            dataSamples:props.dataSamples,
            sortFunction:'sortByPosition'
        };
    }

    componentWillUpdate(nextProps){

        this.newProps = nextProps.dataSamples.swatches.length;

        if(this.newProps != this.oldProps){

            console.log('DIFF')

            let temp =  this[this.state.sortFunction](this.state.dataSamples.swatches)

            this.setState({dataSample:temp})
        }
    }

    componentDidUpdate(nextProps){

        this.oldProps  = nextProps.dataSamples.swatches.length;
    }

    handleSelect(key) {

        this.setState({key});
        this.changeSortOrder(key)
    }

    changeSortOrder(key){

        if(key === 1){

            this.setState({sortFunction:'sortByPosition'})
            this.state.dataSamples.swatches = this.sortByPosition(this.state.dataSamples.swatches)

        }else if(key === 2){

            this.setState({sortFunction:'sortByHue'})
            this.state.dataSamples.swatches = this.sortByHue(this.state.dataSamples.swatches)

        }else if(key === 3){

            this.setState({sortFunction:'sortByMunsell'});
            this.state.dataSamples.swatches = this.sortByMunsell(this.state.dataSamples.swatches)
        }

        //console.log('CHANGE ORDER')
    }

    sortByPosition(dataSamples){

        //console.log('sortByPosition(dataSamples)');

        function compare(a, b) {

            const valueA = a.point.x;
            const valueB = b.point.x;

            let comparison = 0;

            if (valueA > valueB) {

                comparison = 1;

            }else if (valueA < valueB) {

                comparison = -1;
            }

            return comparison;
        }
        
        dataSamples.sort(compare);   

        return dataSamples;
    }

    sortByHue(dataSamples){

        //console.log('sortByHue(dataSamples)');

        function compare(a, b) {

            const valueA = a.hsl[0];
            const valueB = b.hsl[0];

            let comparison = 0;

            if (valueA > valueB) {

                comparison = 1;

            }else if (valueA < valueB) {

                comparison = -1;
            }

            return comparison;
        }
        
        dataSamples.sort(compare);   

        return dataSamples;
    }

    sortByMunsell(dataSamples){

        //console.log('sortByMunsell(dataSamples)');

        function compare(a, b) {

            //console.log(a.msl)

            const valueA = a.msl.id;
            const valueB = b.msl.id;

            let comparison = 0;

            if (valueA > valueB) {

                comparison = 1;

            }else if (valueA < valueB) {

                comparison = -1;
            }

            return comparison;
        }
        
        dataSamples.sort(compare); 

        return dataSamples;
    }

    render() {
        return (
            <div>
                <Tabs
                    activeKey={this.state.key}
                    onSelect={this.handleSelect}
                    id="controlled-tab-example"
                >
                <Tab eventKey={1} title="Position"></Tab>
                <Tab eventKey={2} title="Hue"></Tab>
                <Tab eventKey={3} title="Munsel"></Tab>
                </Tabs>
                <div className = 'Pallet'>
                   <PalletSwatchesSmall dataSwatches= {this.state.dataSamples.swatches}/>
                </div> 
            </div>

    );
  }
}
//<PalletSwatchesSmall dataSwatches= {this[this.state.sortFunction](this.state.dataSamples.swatches)}/>
//<PalletSwatchesSmall dataSwatches= {this[this.state.sortFunction](dataTest)}/>
export default PalletMenu;

