export default class DataStorage{

	static save(canvas, points){

        localStorage.setItem('source',  JSON.stringify(canvas.source))
        localStorage.setItem('width',   JSON.stringify(canvas.width))
        localStorage.setItem('height',  JSON.stringify(canvas.height))
        localStorage.setItem('name',    JSON.stringify(canvas.name))
        localStorage.setItem('points',  JSON.stringify(points));
	}

    static load(){

      if(JSON.parse(localStorage.getItem("name"))){

        let data             = {}
            data.source      = JSON.parse(localStorage.getItem("source"))
            data.width       = JSON.parse(localStorage.getItem("width"))
            data.height      = JSON.parse(localStorage.getItem("height"))
            data.name        = JSON.parse(localStorage.getItem("name"))
            data.points      = JSON.parse(localStorage.getItem("points"))

        return data
        }
    }
}