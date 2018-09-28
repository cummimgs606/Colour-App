import dataMunsellSpacialGray from '../data/data-munsell-table-grays.json';

export function distanceThreePoints(  r1, r2,  g1, g2,  b1, b2){
    
    var dr = r1-r2;
    var dg = g1-g2;
    var db = b1-b2;
                                                        
    return Math.pow(dr * dr + dg * dg + db * db , 1/3);
}

export function seekSpacialGray( searchR,  searchG, searchB){

  
	var munsellSpacialGray = dataMunsellSpacialGray
    
            
    var newDistance = 1000000000;
    var oldDistance = 1000000000; 
    
    var i = 0;
    var result = 0;

    var vectorR;
    var vectorG;
    var vectorB;


    for (i = munsellSpacialGray.length-1; i >= 0; i--) {

        vectorR = munsellSpacialGray[i].rgb[0]
        vectorG = munsellSpacialGray[i].rgb[1]
        vectorB = munsellSpacialGray[i].rgb[2]

        newDistance = distanceThreePoints(vectorR, searchR, vectorG, searchG, vectorB, searchB)
            
        if(newDistance <= oldDistance){
            
            oldDistance = newDistance;
            result = i;
        }
    }
    

    return munsellSpacialGray[result]
}