import React, { Component } from 'react';
import SwatchBackground from './SwatchBackground.jsx';

// ----------------------------------------------------------------------
// IMPORT DATA
// ----------------------------------------------------------------------

// START LIFT SCOPE UP

import DataMunsellTable from '../data/data-munsell-table-colors.json';
import DataMunsellGray from '../data/data-munsell-table-grays.json';

// END LIFT SCOPE UP

// ----------------------------------------------------------------------
// DECLARE GLOBALS
// ----------------------------------------------------------------------

// START LIFT SCOPE UP

var dataMunsellGray = [];
var dataMunsellTable = [];

function parseMunsellGray(){

    dataMunsellGray  = DataMunsellGray;
    return dataMunsellGray 
}

function parseMunsellTable(){

    dataMunsellTable = DataMunsellTable;

    for (var i = dataMunsellTable.length - 1; i >= 0; i--) {

        for (var k = 0 ; k < 11; k++) {

            if(k > 0 && k < 10){

                dataMunsellTable[i][k].unshift(dataMunsellGray[k])
            }

            if(k === 0){

                dataMunsellTable[i].unshift([dataMunsellGray[k]])
            }

            if(k === 10){

                dataMunsellTable[i].push([dataMunsellGray[k]])
            }
            
        }
    };

    return dataMunsellTable
}

// END LIFT SCOPE UP

// ----------------------------------------------------------------------
// MUNSELL COMPONENTS
// ----------------------------------------------------------------------

function MunsellSwatch(props) {

    let rgb = props.dataSwatch.rgb

    return  <div className='MunsellSwatchBackground' style={SwatchBackground.AsRGB(rgb)}></div>
}

function MunsellRow(props) {

    let dataRow = props.dataRow

    const listItems = dataRow.map((item, index) =>
        <div className="MunsellSwatch" key={index}><MunsellSwatch dataSwatch = {item}/></div>
    );

    return listItems
}

function MunsellPallet(props) {

    let dataPallet = props.dataPallet

    const listItems = dataPallet.map((item, index) =>
        <div className="MunsellRow"  key={index}><MunsellRow dataRow = {item}/></div>
    );

    return listItems
}

function MunsellPallets(props) {

    let dataPallets = props.dataPallets

    const listItems = dataPallets.map((item, index) => 
        <div className="MunsellPallet"  key={index}><MunsellPallet dataPallet = {item} /></div>
    );
    
    return listItems
}

// ----------------------------------------------------------------------
// CLASS MUNSELL TABLE
// ----------------------------------------------------------------------

class MunsellTable extends Component{

	constructor(props) {
		super(props);

        // START LIFT SCOPE UP

        //this.dataPallets = props.dataMunsellTable;

        this.dataMunsellGray = parseMunsellGray()
        this.dataMunsellTable = parseMunsellTable()

        // END LIFT SCOPE UP
	}

  	render() {
	    return (<div><MunsellPallets dataPallets = {this.dataMunsellTable} /></div>)
	}
}

export default MunsellTable;