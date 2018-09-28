import dataMunsellListed    from '../data/data-munsell-ordered-by-rgb.json';
import dataMunsellSpacial   from '../data/data-munsell-ordered-by-rgb-spacial.json';

export function distanceThreePoints(  r1, r2,  g1, g2,  b1, b2){
    
    var dr = r1-r2;
    var dg = g1-g2;
    var db = b1-b2;
                                                        
    return Math.pow(dr * dr + dg * dg + db * db , 1/3);
}

export function seekSpacialColor( searchR,  searchG, searchB){

	var munsellSpacial = dataMunsellSpacial
	var munsellListed = dataMunsellListed
            
    var newDistance = 1000000000;
    var oldDistance = 1000000000; 
    
    var i = 0;
    var result = 0;

    var vectorR;
    var vectorG;
    var vectorB;

    for (i = munsellSpacial.length-1; i >= 0; i--) {

        vectorR = munsellSpacial[i][0];
        vectorG = munsellSpacial[i][1];
        vectorB = munsellSpacial[i][2];

        newDistance = distanceThreePoints(vectorR, searchR, vectorG, searchG, vectorB, searchB)
            
        if(newDistance <= oldDistance){
            
            oldDistance = newDistance;
            result = i;
        }
    }

    return munsellListed[result]
}