export default class CanvasFramer{

	constructor(width,height, inner, outer){

		this.update(width,height, inner, outer)
	}

	get props(){

		return {width:this.width,
				height:this.height,
				inner:this.inner,
				outer:this.outer,
				topLeft:this.topLeft,
				outerWidth:this.outerWidth,
				outerHeight:this.outerHeight,
				totalWidth:this.totalWidth,
				totalHeight:this.totalHeight}
	}

	update(width, height, inner, outer){

		this.inner 	= inner
        this.outer 	= outer

        this.width 	= width
        this.height = height

       	this.topLeft     = (this.outer     ) + this.inner
        this.outerWidth  = (this.outer  * 2) + this.width 
        this.outerHeight = (this.outer  * 2) + this.height 
        this.totalWidth  = (this.outer  * 2) + (this.inner  * 2) + this.width
        this.totalHeight = (this.outer  * 2) + (this.inner  * 2) + this.height 
	}
}

