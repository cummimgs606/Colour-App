import React, { Component } from 'react';
import SwatchBackground from './SwatchBackground.jsx';

// ----------------------------------------------------------------------
// IMPORT DATA
// ----------------------------------------------------------------------

// START LIFT SCOPE UP

//import DataMunselColors from '../data/data-munsell-table-colors-pallets.json';
import DataMunsellIndex from '../data/data-munsell-ordered-by-rgb.json'
import DataMunsellTable from '../data/data-munsell-table-colors.json';
import DataMunsellGray from '../data/data-munsell-table-grays.json';
//import DataGrays from '../data/data-munsell-table-grays-pallets.json';
import DataMunsellCroma from '../data/data-munsell-table-croma.json';

// END LIFT SCOPE UP

// ----------------------------------------------------------------------
// DECLARE GLOBALS
// ----------------------------------------------------------------------

// START LIFT SCOPE UP

let dataMunsellGray = [];
let dataMunsellTable = [];


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


// ----------------------------------------------------------------------
// MUNSELL COMPONENTS
// ----------------------------------------------------------------------



function findSelected(munsellID, dataMunsellTable){

    let pallet = 0
    let swatch = {}
    let count = 0

    for (var i = dataMunsellTable.length - 1; i >= 0; i--) {

        for (var j = 0 ; j < 11; j++) {

            for(var k = 0; k < dataMunsellTable[i][j].length; k++){

                if(dataMunsellTable[i][j][k].id === munsellID){

                    if(munsellID !== 0 ){

                        swatch = dataMunsellTable[i][j][k]
                        swatch.pallet = i
                        pallet = i                    
                    }   
                }
            }
        }
    }

    return {pallet:pallet, swatch:swatch}
}

function  addDataColors(){

    /*

    let json = JSON.stringify(DataMunselColors)
        
    let dataMunsellColors = JSON.parse(json); 
    //

    
    for (var i = 0; i < dataMunsellColors.length; i++) {

        for (var j = 0 ; j < 9; j++) {

            //console.log(dataMunsellColors[i][j].length)

            for(var k = 0; k < dataMunsellColors[i][j].length; k++){

                let hue = dataMunsellColors[i][j][k].hue

                if(hue === -1){
                    hue = 'grey'
                }

                dataMunsellColors[i][j][k].hue = {id:i, name:hue}
            }
        }
    }
    */
    
    //console.log(JSON.stringify(dataMunsellColors))
}

function  addDataGreys(){

    /*
    let json = JSON.stringify(DataGrays)
    let dataGrays = JSON.parse(json); 


    
    for (var i = 0; i < dataGrays.length; i++) {

        //console.log(dataGrays[i])
        let hue = dataGrays[i].hue
        let id = dataGrays[i].id

        dataGrays[i].hue = {id:id, name:'nuetral'}

    }
    */
    //console.log(JSON.stringify(dataGrays))
}

function addDataList(){



    //let json = JSON.stringify(DataMunsellIndex)
        
    //let dataMunsellIndex = JSON.parse(json); 

    //let names = ["2.5R", "5.0R", "7.5R", "10.0R", "2.5YR", "5.0YR", "7.5YR", "10.0YR", "2.5Y", "5.0Y", "7.5Y", "10.0Y", "2.5GY", "5.0GY", "7.5GY", "10.0GY", "2.5G", "5.0G", "7.5G", "10.0G", "2.5BG", "5.0BG", "7.5BG", "10.0BG", "2.5B", "5.0B", "7.5B", "10.0B", "2.5PB", "5.0PB", "7.5PB", "10.0PB", "2.5P", "5.0P", "7.5P", "10.0P", "2.5RP", "5.0RP", "7.5RP", "10.0RP"]

    //for (var i = 0; i < dataMunsellIndex.length; i++) {
        //names.push(dataMunsellIndex[i].hue)
    //}

    //var uniqueArray = Array.from(new Set(names)) 
    /*
    for (var i = 0; i < dataMunsellIndex.length; i++) {

        for (var k = 0; k < names.length; k++) {

            let hue = dataMunsellIndex[i].hue

            if(hue === names[k]){

                dataMunsellIndex[i].hue = {'id':k,'name':hue}

            }
        }
    }
    */

    //console.log(JSON.stringify(dataMunsellIndex))
}

function orderByID(){

    //let json = JSON.stringify(DataMunsellIndex)
    //let dataMunsellIndex = JSON.parse(json); 

    //console.log(dataMunsellIndex)

   // dataMunsellIndex.sort(function (a, b) {
          //return a.id - b.id;
   // });

    //console.log(dataMunsellIndex)

    //console.log(JSON.stringify(dataMunsellIndex))


}function  makeCroma(){

    console.log('function  makeCroma(){')

    let json1 = JSON.stringify(DataMunsellIndex)    
    let dataMunsellIndex = JSON.parse(json1); 

    let json2 = JSON.stringify(DataMunsellCroma)    
    let dataMunsellCroma = JSON.parse(json2); 

     
    let croma = []

    for (var i = 0; i < dataMunsellIndex.length; i++){

        let indexRGB = dataMunsellIndex[i].rgb

        for (var k = 0; k < dataMunsellCroma.length; k++){

            let cromaRGB = dataMunsellCroma[k]

            if(cromaRGB[0] === indexRGB[0]){
                if(cromaRGB[1] === indexRGB[1]){
                    if(cromaRGB[2] === indexRGB[2]){
                        croma.push(dataMunsellIndex[i])
                    }
                }
            }
        } 
    }


    console.log(JSON.stringify(croma) )
}

// ----------------------------------------------------------------------
// CLASS MUNSELL TABLE
// ----------------------------------------------------------------------

class MunsellTable extends React.Component {

	constructor(props) {

		super(props)

        //addDataColors()

        //addDataGreys()

        //addDataList()

        //orderByID()

        makeCroma()

        //this.dataMunsellGray    = parseMunsellGray()
        //this.dataMunsellTable   = parseMunsellTable()
        //this.selected           = findSelected(this.munsellID, dataMunsellTable)
	}
   


  	render() {
        return (<div>munsel data maker</div>)  
	}
}

export default MunsellTable