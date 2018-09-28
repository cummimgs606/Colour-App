import React, { Component } from 'react';
import SwatchBackground from './SwatchBackground.jsx';


// ----------------------------------------------------------------------
// MUNSELL COMPONENTS
// ----------------------------------------------------------------------


function MunsellSwatch(props) {

    let rgb = props.dataMunsellTable.rgb

    return  <div className='MunsellSwatchBackground' style={SwatchBackground.AsRGB(rgb)}></div>
}

function MunsellRow(props) {

    const dataMunsellTable = props.dataMunsellTable

    const listItems = dataMunsellTable.map((dataMunsellTable, index) =>
        <div className="MunsellSwatch"><MunsellSwatch key={index} dataMunsellTable = {dataMunsellTable}/></div>
    );

    return listItems
}

function MunsellPallet(props) {

    const dataMunsellTable = props.dataMunsellTable

    const listItems = dataMunsellTable.map((dataMunsellTable, index) =>
        <div className="MunsellRow"><MunsellRow key={index} dataMunsellTable = {dataMunsellTable}/></div>
    );

    return listItems
}

function MunsellPallets(props) {

    const dataMunsellTable = props.dataMunsellTable
    
    const listItems = dataMunsellTable.map((dataMunsellTable, index) =>
        <div className="MunsellPallet"><MunsellPallet key={index} dataMunsellTable = {dataMunsellTable}/></div>
    );

    return listItems
}


// ----------------------------------------------------------------------
// CLASS MUNSELL TABLE
// ----------------------------------------------------------------------


class MunsellTable extends Component{

	constructor(props) {
		super(props);
		this.dataMunsellTable = props.dataMunsellTable;
	}

  	render() {
	    return (
                <div>
                    <MunsellPallets dataMunsellTable = {this.dataMunsellTable} />
                </div>  
	    )
	}
}

export default MunsellTable;