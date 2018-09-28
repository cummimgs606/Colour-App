import { seekSpacialColor }      from '../helpers/helper-color-munsell-seek-spacial-color.jsx';
import { seekSpacialGray }  from '../helpers/helper-color-munsell-seek-spacial-gray.jsx';

export function RGB2HEX(r,g,b){

  let string = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  let result = string.toUpperCase();

	return "#" + result;
}

export function RGB2DEC(r,g,b){

	return   b * 65536 + g * 256 + r
}

export function RGB2MSL(r,g,b){

  if(r === b && g === b){

    return seekSpacialGray(r,g,b)

  }else{

    return  seekSpacialColor(r,g,b)
  }
}

export function RGB2HSL(r, g, b) {

  r /= 255
  g /= 255
  b /= 255

  var max = Math.max(r, g, b); 
  var min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
      default:h = 0
    }

    h /= 6;
  }

  return [ h, s, l ];
}

export function RGB2CMYK(r,g,b){

    var result = {};
 
    r /= 255
    g /= 255
    b /= 255
 
    result.k = Math.min( 1 - r, 1 - g, 1 - b );
    result.c = ( 1 - r - result.k ) / ( 1 - result.k );
    result.m = ( 1 - g - result.k ) / ( 1 - result.k );
    result.y = ( 1 - b - result.k ) / ( 1 - result.k );
 
    result.c = Math.round( result.c * 100 );
    result.m = Math.round( result.m * 100 );
    result.y = Math.round( result.y * 100 );
    result.k = Math.round( result.k * 100 );
 
    return result;
}
