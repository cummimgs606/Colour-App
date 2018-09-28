const points = []

export default class Points  {

    constructor() {

        this.points = []
    }

	static rename(){

        function compare(a, b) {
            return  a.x<b.x ? -1 : a.x>b.x ? 1 : 0;
        }

        points.sort(compare)

        for(let i = 0; i < points.length; i++){

            points[i].name = i
        }

        //console.log('static rename(points)')
	}

    // ----------------------------------------------------  

	static style(){

        for(let i = 0; i < points.length; i++){

            let point = points[i]
            let boundaryR = (points[i].w - 24)
            let boundaryT = 12
            let boundaryB = (points[i].h - 12)

            point.style = 2
                
            if(point.y < boundaryT){

                point.style = 1
            }

            if(point.y > boundaryB){

                point.style = 3 
            }

            if(point.x > boundaryR){

                point.style = 4

                if(point.y < boundaryT){

                    point.style = 5 
                }

                if(point.y > boundaryB){

                    point.style = 6
                }
            }
        }
	}

    static styleDrag(index){

        points[index].style = 7
        points[index].name = ''
    }

    // ----------------------------------------------------

	static geom(e){

        if(e !== undefined){

            let rect        = e.target.getBoundingClientRect()
            let geom       = {}
                geom.x     = Math.ceil(e.clientX - rect.left)
                geom.y     = Math.ceil(e.clientY - rect.top)
                geom.l     = rect.left
                geom.t     = rect.top
                geom.r     = rect.right
                geom.b     = rect.bottom
                geom.w     = rect.width
                geom.h     = rect.height

            return geom
        }
    }

    static geomBoundary(e, index, geom){

        geom.x = e.clientX - geom.l
        geom.y = e.clientY - geom.t

        if(geom.x < 0 ){
            geom.x = 0
        }

        if(geom.x > geom.w){
             geom.x = geom.w
        }


        if(geom.y < 0){
            geom.y = 0
        }
            
        if(geom.y > geom.h){
            geom.y = geom.h
        }

        points[index] = geom
    }
    
    static geomCompare(geom){
        
        let newPoints = points.slice(0);
        
        let arrayX = newPoints.map(a => a.x);
        let arrayY = newPoints.map(a => a.y);
        let arrayL = arrayX.length
        let flag = false

        if(arrayL === 0){
            return flag
        }

        for(let i = arrayL; i > 0; i--){

            if(arrayX[i] === geom.x && arrayY[i] === geom.y){
               flag = true
            }
        }

        return flag    
    }

    // ----------------------------------------------------

    static select( id){

        points[id].selected   = true
    }

    static unselect(){

        for(let i = 0; i < points.length; i++){

             points[i].selected  = false
        }
    }

    // ----------------------------------------------------

    static pointAdd(geom){

        points.push(geom)
    }

    static pointDelete(index){
        
        points.splice(index, 1)
    }

    // ----------------------------------------------------

    static pointsAdd(array){

        for(let i = 0; i < array.length; i++){

            points.push(array[i])
        }
    }

    static pointsDelete(){
        
         points.length = 0
    }


    // ----------------------------------------------------

    static get points(){

        return points
    }

    // MAYBE DELETE
    /*
    static set points(points){

       points = points
    }
    */

    // ----------------------------------------------------

    static point(index){

        let geom   = {}
            geom.x = points[index].x
            geom.y = points[index].y


       return geom
    }

 
}