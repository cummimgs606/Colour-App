import React, { Component } from 'react';
import SwatchBackground from './SwatchBackground.jsx';

// ----------------------------------------------------------------------
// IMPORT DATA
// ----------------------------------------------------------------------

// START LIFT SCOPE UP

import DataMunsellByID from '../data/data-munsell-ordered-by-id.json'
import DataMunsellTable from '../data/data-munsell-table-colors.json';
import DataMunsellGray from '../data/data-munsell-table-grays.json';
import DataMunsellCroma from '../data/data-munsell-table-croma.json';

// END LIFT SCOPE UP

// ----------------------------------------------------------------------
// DECLARE GLOBALS
// ----------------------------------------------------------------------

// START LIFT SCOPE UP

let dataMunsellGray = [];
let dataMunsellTable = [];


function parseMunsellTable(){

    dataMunsellTable = DataMunsellTable;
    dataMunsellGray  = DataMunsellGray;

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

    let selectedID                 = null
    let swatchRGB                  = props.swatch.rgb
    let swatchHueName              = props.swatch.hue.name
    let swatchHueID                = props.swatch.hue.id
    let swatchID                   = props.swatch.id
    let swatchValue                = props.swatch.value
    let swatchCroma                = props.swatch.croma
    let swatchLabel                      = ''

    let munsellSwatch              = 'munsell-swatch'
    let munsellSwatchBackground    = 'munsell-swatch-background'
    let munsellSwatchLabelSmall    = ''

    if(props.selectedSwatch.msl !== undefined){

        selectedID = props.selectedSwatch.msl.id
    }

    if(swatchID === selectedID){

        munsellSwatch               = 'munsell-swatch selected'
        munsellSwatchBackground     = 'munsell-swatch-background selected'
        munsellSwatchLabelSmall     = 'munsell-swatch-label-small'

        if(swatchHueID < 0){
            swatchLabel = swatchHueName+' '+swatchValue
        }else{
            swatchLabel = swatchHueID+' '+swatchValue+' '+swatchCroma
        }
    }

    return  <div className={munsellSwatch} >
                <div    className   = {munsellSwatchBackground} 
                        style       = {SwatchBackground.AsRGB(swatchRGB)} 
                        onClick     = {(e) => props.handleClickMunsell(e, swatchRGB)}>
                    <div className = {munsellSwatchLabelSmall}>{swatchLabel}</div>
                </div>
            </div>
}

function MunsellRow(props) {

    let dataRow         = props.dataRow
    let selectedSwatch  = props.selectedSwatch

    const listItems = dataRow.map((item, index) =>
       
            <MunsellSwatch  swatch              = {item}
                            key                 = {index}
                            selectedSwatch      = {selectedSwatch}
                            handleClickMunsell  = {props.handleClickMunsell}/>
       
    );

    return listItems
}

function MunsellPallets(props) {

    console.log(props.selectedPalletID)

    let selectedPalletID = props.selectedPalletID

    if(selectedPalletID < 0){
        selectedPalletID = 0
    }

    let dataPallet      = props.dataPallets[selectedPalletID]
    let selectedSwatch  = props.selectedSwatch 
    let listItems       = dataPallet.map((item, index) =>

        <div className = "MunsellRow" key = {index}> 
            <div className="munsell-row-label">{10 - index}</div> 
                <MunsellRow dataRow             = {item} 
                            selectedSwatch      = {selectedSwatch}
                            handleClickMunsell  = {props.handleClickMunsell}/>
        </div>
    );
   
    return listItems
}

// ----------------------------------------------------------------------

function MunselLabels(){

    let  dataPallet = []

    for (var i = 0; i <  20; i++) {

        dataPallet[i] = i * 2
    }

    const listItems = dataPallet.map((item, index) =>
        <div className="munsell-swatch-label-small" key={index}>{dataPallet[index]}</div>
    );

    return  <div className="munsell-col-label"> {listItems}</div>
}


// ----------------------------------------------------------------------
// CROMA COMPONENTS
// ----------------------------------------------------------------------

function CromaSwatch(props) {

    let rgb                 = props.dataRow.rgb
    let index               = props.index
    let selectedPalletID    = props.selectedPalletID
    let selectedSwatch      = props.selectedSwatch

    let cromaSwatchBackground   = 'croma-swatch-background'
    let cromaSwatch             = 'croma-swatch'
    let cromaLabel              = 'croma-label'

    if(selectedSwatch.id < 0){
        selectedPalletID = -1
    }


    if(selectedPalletID === index){
        cromaSwatchBackground       = 'croma-swatch-background selected'
        cromaSwatch                 = 'croma-swatch selected'
        cromaLabel                  = 'croma-label selected'
    }
  
    return  <div className={cromaSwatch}>
                <div className={cromaLabel}>{index}</div>
                <div className={cromaSwatchBackground} style={SwatchBackground.AsRGB(rgb)} onClick = {(e) => props.handleClickCroma (e, rgb ,index)}></div>
            </div>
}

function CromaRow(props){

    let dataRow             =  DataMunsellCroma
    let selectedPalletID    =  props.selectedPalletID 
    let selectedSwatch      =  props.selectedSwatch

    const listItems = dataRow.map((item, index) =>
        
        <CromaSwatch    dataRow             = {item} 
                        key                 = {index}
                        index               = {index}
                        handleClickCroma    = {props.handleClickCroma}
                        selectedPalletID    = {selectedPalletID}
                        selectedSwatch      = {selectedSwatch}/>
    );

    return <div className="croma-row">{listItems}</div>
}


// ----------------------------------------------------------------------
// CLASS MUNSELL TABLE
// ----------------------------------------------------------------------

class MunsellTable extends React.Component {

	constructor(props) {

		super(props)

        this.dataMunsellTable   = parseMunsellTable()
        this.toggleEvent        = props.toggleEvent
        this.handleClickMunsell = this.handleClickMunsell.bind(this)
        this.handleClickCroma   = this.handleClickCroma.bind(this)

        this.state = {
            selectedPalletID:0,
            selectedSwatch:{}
        };
	}
   
    componentWillReceiveProps(nextProps){

        if(this.selected){this.selected.swatch.selected = false}

        if(nextProps.swatchSelected.msl !== undefined){
            
            this.setState({selectedPalletID:nextProps.swatchSelected.msl.hue.id})
            this.setState({selectedSwatch:nextProps.swatchSelected})
        }
    }

    handleClickMunsell(e,rgb){

        //console.log(rgb)
    }

    handleClickCroma(e,rgb, selected){
       // console.log(selected)

        this.setState({selectedPalletID:selected})
    }

    shouldComponentUpdate(nextProps){

        if(nextProps.toggleEvent > 0){
            return nextProps.toggleEvent
        }else{
            return null
        }
    }

  	render() {

        return (<div className = 'pallet-menu-small'>
                    <CromaRow   selectedPalletID    = {this.state.selectedPalletID} 
                                selectedSwatch      = {this.state.selectedSwatch}
                                handleClickCroma    = {this.handleClickCroma}/>

                    <MunselLabels/>

                    <MunsellPallets     dataPallets         = {this.dataMunsellTable} 
                                        selectedPalletID    = {this.state.selectedPalletID}
                                        selectedSwatch      = {this.state.selectedSwatch} 
                                        toggleEvent         = {this.toggleEvent}
                                        handleClickMunsell  = {this.handleClickMunsell}/>   
         
                </div>)  
	}
}

/*
  
                                        */

export default MunsellTable