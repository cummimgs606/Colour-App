import { AverageRGB }   from '../helpers/helper-color-avaerage-RGB.js';
import Swatch           from '../classes/Swatch.js';

let swatches = []

export default class Swatches  {

    // ----------------------------------------------------------------------
    // SWATCH SORT FUNCTIONS
    // ----------------------------------------------------------------------

    static sortByIND(dataSwatches){

        //console.log('sortByMunsell(dataSwatches)');

        function compare(a, b) {

            const valueA = a.id;
            const valueB = b.id;

            let comparison = 0;

            if (valueA > valueB) {

                comparison = 1;

            }else if (valueA < valueB) {

                comparison = -1;
            }

            return comparison;
        }
        
        dataSwatches.sort(compare); 

        return dataSwatches;
    }

	static sortByPOS(dataSwatches){

        //console.log('sortByPosition(dataSwatches)');

        function compare(a, b) {

            const aX = a.point.x;
            const bX = b.point.x;

            const aY = a.point.y;
            const bY = b.point.y;

            if( aX === bX) return aY-bY;
    		return aX-bX;
        } 
        
        dataSwatches.sort(compare);  

        return dataSwatches;
    }

    static sortByHSL(dataSwatches){

        //console.log('sortByHue(dataSwatches)');

        function compare(a, b) {

            const valueA = a.hsl[0];
            const valueB = b.hsl[0];

            let comparison = 0;

            if (valueA > valueB) {

                comparison = 1;

            }else if (valueA < valueB) {

                comparison = -1;

            }else if (valueA === valueB){

                comparison = -1;
            }

            return comparison;
        }
        
        dataSwatches.sort(compare);   

        return dataSwatches;
    }

    static sortByHEX(dataSwatches){

        //console.log('sortByHue(dataSwatches)');

        function compare(a, b) {

            const valueA = a.hex;
            const valueB = b.hex;

            let comparison = 0;

            if (valueA > valueB) {

                comparison = 1;

            }else if (valueA < valueB) {

                comparison = -1;
                
            }else if (valueA === valueB){

                comparison = -1;

            }

            return comparison;
        }
        
        dataSwatches.sort(compare);   

        return dataSwatches;
    }

    static sortByCMY(dataSwatches){

        function compare(a, b) {

            const aC = a.cmyk.c
            const bC = b.cmyk.c

            const aM = a.cmyk.m
            const bM = b.cmyk.m

            const aY = a.cmyk.y
            const bY = b.cmyk.y

            const aK = a.cmyk.k
            const bK = b.cmyk.k

            if(aC === bC){
                
                if(aM === bM){

                    if(aY === bY){

                        if(aK === bK){

                            return 0

                        }else{

                            if(aK < bK){

                                return -1
                                
                            }else{

                                return 1
                            }
                        }
                    }else{

                        if(aY < bY){

                            return -1
                            
                        }else{

                            return 1
                        }
                    }
                }else{

                    if(aM < bM){

                        return -1
                        
                    }else{

                        return 1
                    }
                }
            }else{

                if(aC < bC){

                    return -1

                }else{

                    return 1
                }
            } 
        } 
        
        dataSwatches.sort(compare);  

        return dataSwatches;
    }

    static sortByMSL(dataSwatches){

        //console.log('sortByMunsell(dataSwatches)');

        function compare(a, b) {

            const valueA = a.msl.id;
            const valueB = b.msl.id;

            let comparison = 0;

            if (valueA > valueB) {

                comparison = 1;

            }else if (valueA < valueB) {

                comparison = -1;

            }else if(valueA === valueB){

                comparison = 0;
            }

            return comparison;
        }
        
        dataSwatches.sort(compare); 

        return dataSwatches;
    }

    static sortBy(mode){

        if(mode === 'IND'){

            swatches = this.sortByIND(swatches)

        }else if(mode === 'POS'){

            swatches = this.sortByPOS(swatches)

        }else if(mode === 'HSL'){

            swatches = this.sortByHSL(swatches)

        }else if(mode === 'HEX'){

            swatches = this.sortByHEX(swatches)
     
        }else if(mode === 'CMY'){

            swatches = this.sortByCMY(swatches)

        }else if(mode === 'MSL'){

            swatches = this.sortByMSL(swatches)
        }
    }

    // ----------------------------------------------------------------------
    // SWATCH EDIT FUNCTIONS 
    // ----------------------------------------------------------------------

    static delete(){    

        swatches.length = 0
    }

    static copy(dataSwatches){

        let json = JSON.stringify(dataSwatches)
        
        return JSON.parse(json); 
    }

    static update(contextSource, points, sampleSize){

        swatches.length = 0

        for(let i = 0; i < points.length; i++){

            let point       = points[i]
            let imageData   = contextSource.getImageData(point.x, point.y, sampleSize, sampleSize);
            let rgb         = AverageRGB(imageData)
            let swatch      = new Swatch(points[i].name, point, rgb);

            swatches[i] = swatch
        }

        return swatches;
    }

    // ----------------------------------------------------------------------
    // GET SWATCHES 
    // ----------------------------------------------------------------------

    static get swatches(){

        return swatches
    }

}