import React, { Component } from 'react';

// ----------------------------------------------------------------------
// CANVAS COMPONENT
// ----------------------------------------------------------------------

class ImageSamlperZoom extends React.Component {

    constructor(props) {

    	super(props);
    	
    	this.imageWidth = 370
    	this.imageHeight = 200
    	this.imageZoom = 8
    }

    componentDidMount() {

        this.canvasZoomInit();
    }

    componentWillReceiveProps(nextProps){

    	this.canvasZoomUpdate(	this.contextTarget,
    							nextProps.contextSource, 
    							nextProps.point,
    							this.imageWidth,
    							this.imageHeight,
    							this.imageZoom,
    							nextProps.sampleSize)
    }

    canvasZoomInit() {
    	
    	this.contextTarget = this.refs.canvasZoom.getContext('2d');
    	this.contextTarget.fillStyle = 'rgb(0,0,0)';
        this.contextTarget.fillRect(0,0, this.imageWidth, this.imageHeight);
        
	}
	
    canvasZoomUpdate(contextTarget, contextSource, point,imageWidth, imageHeight, imageZoom, sampleSize){
    	
    	let w = imageWidth
	    let h = imageHeight
        let zoom = imageZoom 

	    let sx = 0 
	    let sy = 0
	    let tx = point.x - Math.ceil((((w/zoom)/2)-Math.ceil(sampleSize/2)))
	    let ty = point.y - Math.ceil((((h/zoom)/2)-Math.ceil(sampleSize/2)))

	    contextTarget.fillStyle = "rgba(0,0,0)";
		contextTarget.fillRect(0,0,w,h);

	   	let sData = contextSource.getImageData(tx, ty, w, h).data;

 		for (let x2=0;x2<w;++x2){
		    for (let y2=0;y2<h;++y2){
				let i=(y2*w+x2)*4;
			   	let r=sData[i+0];
			   	let g=sData[i+1];
				let b=sData[i+2];
				let a=sData[i+3];
			      
			  	contextTarget.fillStyle = "rgba("+r+","+g+","+b+","+(a/255)+")";
			    contextTarget.fillRect((sx + x2 * zoom), (sy + y2 * zoom), zoom, zoom);
			}
		}

		let aW = zoom * sampleSize;
		let aH = zoom * sampleSize;
		let aX = (w/2) - (aW / 2)
		let aY = (h/2) - (aH / 2)

		let bW = (zoom * sampleSize) + 4;
		let bH = (zoom * sampleSize) + 4;
		let bX = (w/2) - (bW / 2)
		let bY = (h/2) - (bH / 2)

		contextTarget.beginPath();
		contextTarget.lineWidth="2";
		contextTarget.strokeStyle="black";
		contextTarget.rect(aX,aY,aW,aH); 
		contextTarget.stroke();
			
		contextTarget.beginPath();
		contextTarget.lineWidth="2";
		contextTarget.strokeStyle="white";
		contextTarget.rect(bX,bY,bW,bH); 
		contextTarget.stroke();	
		
    }
   
    render() {
        return( <div>
                     <canvas ref="canvasZoom" width={this.imageWidth} height={this.imageHeight}/>
                </div>
              );
    }
}


export default ImageSamlperZoom;

