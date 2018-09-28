import React, { Component } from 'react';
import './App.css';


// ----------------------------------------------------------------------
// IMPORT DATA
// ----------------------------------------------------------------------

//import dataMunsellListed from './data/data-munsell-ordered-by-rgb.json';
//import dataMunsellSpacial from './data/data-munsell-spacial.json';
//import dataSwatches from './data/data-swatches.json';

//import dataSwatchesUser from './data/data-swatches.json';
//import dataSwatchesMunsell from './data/data-munsell-index-list';

// ----------------------------------------------------------------------
// IMPORT COMPONENTS
// ----------------------------------------------------------------------

//import MunsellTable from './components/MunsellTable.jsx';
//import PalletSwatches from './components/PalletSwatches.jsx';
//import PalletMunsell from './components/PalletMunsell.jsx';
//import ImageSampler from './components/ImageSampler.jsx';//  <ImageSampler/>
import PointSampler from './components/PointSampler.jsx';//
//import MyCircle from './components/MyCircle.jsx';

// ----------------------------------------------------------------------
// DECLARE GLOBALS
// ----------------------------------------------------------------------



// ----------------------------------------------------------------------
// APP
// ----------------------------------------------------------------------

class App extends Component {


    render() {

        return (
            
            <div className = 'Main'>

                {/*}
                <h1>{dataSwatchesUser.project.id }</h1>
                <h3>{dataSwatchesUser.project.directory}</h3>
                */}
                <PointSampler/>
               

                {/*

                <div className = 'Pallet'>
                    <PalletSwatches dataSwatches = {dataSwatchesUser.project.swatches}/>
                </div> 
                <div className = 'Pallet'>
                    <PalletMunsell dataSwatches = {dataSwatchesMunsell}/>
                </div> 
                
                <div className = 'Pallet'>
                    <PalletSwatches dataSwatches = {dataSwatchesUser.project.swatches}/>
                </div> 
                
                <MunsellTable />

                <div className = 'Pallet'>
                    <PalletMunsell dataSwatches = {dataSwatchesMunsell}/>
                </div> 
                */}
                {/*<MunsellTable /></div>   <CanvasComponent/>< ImageSampler /><ImageSampler/><MyCircle/>*/}  
            </div>
        );
    }
}

// ----------------------------------------------------------------------
// EXPORT
// ----------------------------------------------------------------------

export default App;

