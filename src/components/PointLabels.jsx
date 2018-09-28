import React, { Component } from 'react';

function  PointItem(props){

    // IF REACT BOOTSRAP IS USED
    let offsetX = 0
    let offsetY = 0
    // IF REACT BOOTSRAP IS USED   

    let x               = props.point.x + offsetX
    let y               = props.point.y - offsetY 
    let name            = props.point.name
    let index           = props.index
    let handleDragStart = props.handleDragStart
    let handleDragEnd   = props.handleDragEnd
    let handleMouseDown = props.handleMouseDown
    let handleMouseOver = props.handleMouseOver

    // ----------------------------------------------------
    // START CSS
    // ----------------------------------------------------

    let labelBody       = ''
    let labelStyle      = 'label-style-'+props.point.style + ' label-text'
    let labelPosition   = {left:`${x}px`,top:`${y}px`,zIndex:`${index}`};
    let labelColor      = 'label-text-color-1'

    if(props.point.style <=3){

        labelBody  = 'label-body-1 label-body-left'
    }

    if(props.point.style >= 4 && props.point.style <= 6){

        labelBody = 'label-body-1 label-body-right'
    }

    if(props.point.style === 7 ){

        labelBody = 'label-body-2'
    }

    if(props.point.selected){
        labelColor = 'label-text-color-2'
    }



    // ----------------------------------------------------
    // END CSS
    // ----------------------------------------------------


    return  <div    className   = {labelBody} 
                    style       = {labelPosition}>
                <div    draggable   = "true"
                        className   = {labelStyle+' '+labelColor}
                        onDragStart = {(e) => handleDragStart(e,index)}
                        onDragEnd   = {(e) => handleDragEnd(e,index)}
                        onMouseDown = {(e) => handleMouseDown(e, index)}
                        onMouseOver = {(e) => handleMouseOver(e,index)}>{name}
                </div>   
            </div>

}


function  PointList(props){

    let points          = props.points
    
    let handleDragStart = props.handleDragStart
    let handleDragEnd   = props.handleDragEnd
    let handleMouseOver = props.handleMouseOver
    let handleMouseDown = props.handleMouseDown

    if(points.length !== 0){
        const listItems = points.map((item, index) =>
            <PointItem  key                 = {index} 
                        index               = {index}
                        point               = {item} 
                        handleDragStart     = {handleDragStart}
                        handleDragEnd       = {handleDragEnd}
                        handleMouseOver     = {handleMouseOver}
                        handleMouseDown     = {handleMouseDown}/>)

        return listItems

    }else{

        return null
    }
}

class PointLabels extends Component{

    constructor(props) {
        super(props);

        this.points             = props.points
        this.toggleEvent        = props.toggleEvent
        this.handleDragStart    = props.handleDragStart
        this.handleDragEnd      = props.handleDragEnd
        this.handleMouseOver    = props.handleMouseOver
        this.handleMouseDown    = props.handleMouseDown
    }

    shouldComponentUpdate(nextProps){
        return nextProps.toggleEvent
    }

    render(){

        return  <div>
                    <PointList  points          = {this.points} 
                                handleDragStart = {this.handleDragStart}
                                handleDragEnd   = {this.handleDragEnd}
                                handleMouseOver = {this.handleMouseOver}
                                handleMouseDown = {this.handleMouseDown}/>
                </div>
    }
}

export default PointLabels;