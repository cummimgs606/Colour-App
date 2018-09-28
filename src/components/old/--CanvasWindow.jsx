import React, { Component } from 'react';

// ----------------------------------------------------------------------
// CANVAS COMPONENT
// ----------------------------------------------------------------------

class CanvasWindow extends React.Component {

    constructor(props) {

    	super(props);

        this.width       = props.width
        this.height      = props.height
    }

    render() {
        return( <div id="canvasWindow">


                    <canvas ref         = 'NewCanvas' 
                            width       = {1800} 
                            height      = {1600}/>  
                                        
                </div>  );
    }
}


export default  CanvasWindow;

