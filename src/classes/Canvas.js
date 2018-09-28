import CanvasFramer from '../classes/CanvasFramer.js'

class Canvas extends CanvasFramer {

    addImage(staticMedia, canvasRef, imageName = null, callback = null){

        const   image               = new Image();
                image.src           = staticMedia;

        const   context                 = canvasRef
                context.callback        = callback 
                context.canvasFrame     = this.props
                

                image.onload = function() {

                    context.fillStyle = 'rgb(225, 225, 225)';
                    context.fillRect(   context.canvasFrame.inner,
                                        context.canvasFrame.inner, 
                                        context.canvasFrame.outerWidth, 
                                        context.canvasFrame.outerHeight);

                    context.drawImage(  image, 
                                        0, 
                                        0, 
                                        context.canvasFrame.width, 
                                        context.canvasFrame.height,
                                        context.canvasFrame.topLeft,
                                        context.canvasFrame.topLeft,
                                        context.canvasFrame.width, 
                                        context.canvasFrame.height)
                }

                image.addEventListener('load', function(e) {

                    if(context.callback){
                        context.callback(context)
                    }
                });
            
        this.context        = context
        this.imageSource    = image.src
        this.imageName      = imageName
    }

    get contextSource(){
        return this.context
    }

    get source(){
        return this.imageSource
    }
    
    get name(){
        return this.imageName
    }
}

export default Canvas;