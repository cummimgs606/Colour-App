import FileSaver                from '../../node_modules/file-saver/FileSaver.js'
import Canvas                   from '../classes/Canvas.js'

export default class DataFile{

	static new( ref, source, width, height, name){

        let canvas = new Canvas(width, height, 1, 1)  
        	canvas.addImage(source, ref, name)

        return canvas
	}

	static save(canvas, points){

        if(canvas.name !== null){

            let object  = { source:canvas.source, 
                           	name:canvas.name,
                            width:canvas.width,
                            height:canvas.height,
                            points:points}

            let file    = canvas.name.split('.');
            let json    = JSON.stringify(object);
            let blob    = new Blob([json], {type: "application/json"});

            FileSaver.saveAs(blob, file[0]+".json");
        }
	}

    static loadCanvas(callback, ref, json){

        let canvas = new Canvas(parseInt(json.width, 10), parseInt(json.height, 10), 1, 1) 
            canvas.addImage(json.source, ref, json.name, callback)

        return canvas
    }
}