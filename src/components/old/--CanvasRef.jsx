import React, { Component }     from 'react';

class CanvasRef extends React.Component {

    constructor(props) {

      super(props);

        this.state = {
            points:[],
            geom:{name:0,style:0,x:0,y:0,l:0,t:0,r:0,b:0,w:0,h:0},
            mode:'modeAdd',
            sampleSize:1,
            toggleEvent:0,
        };


 		this.canvasContext  = props.canvasContext
        this.width       	= props.width 
        this.height 		= props.height
        this.onMouseMove 	= props.handelCanvasMove
        this.onMouseDown 	= props.handelCanvasDown

    }

    render(){

    	return (<canvas ref         = {this.canvasContext}
                       	width       = {this.width} 
                       	height      = {this.height}  
                       	onMouseMove = {this.handelCanvasMove} 
                        onMouseDown = {this.handelCanvasDown} />)
    }

}


export default CanvasRef;