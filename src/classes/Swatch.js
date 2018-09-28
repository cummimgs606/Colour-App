import { RGB2HEX } 		from '../helpers/helper-color-convert-RGB.jsx'
import { RGB2DEC } 		from '../helpers/helper-color-convert-RGB.jsx'
import { RGB2MSL } 		from '../helpers/helper-color-convert-RGB.jsx'
import { RGB2HSL } 		from '../helpers/helper-color-convert-RGB.jsx'
import { RGB2CMYK } 	from '../helpers/helper-color-convert-RGB.jsx'

class Swatch  {

	constructor(id, point, rgb) {

		let RGBr 	= rgb[0];
		let RGBg 	= rgb[1];
		let RGBb 	= rgb[2]; 

    	this.rgb 	= rgb; 					
    	this.hex 	= RGB2HEX(RGBr,RGBg,RGBb); 
    	this.dec 	= RGB2DEC(RGBr,RGBg,RGBb);
    	this.msl 	= RGB2MSL(RGBr,RGBg,RGBb); 
    	this.hsl 	= RGB2HSL(RGBr,RGBg,RGBb); 
    	this.cmyk 	= RGB2CMYK(RGBr,RGBg,RGBb); 

    	this.id 	= id;
    	this.point 	= point;
    	this.label 	= {fontColor:'#FFFFFF', fontSize:24, orientation:1}	
	}
  
	get RGB(){
		return this.rgb;
	}

	get HEX(){
		return this.hex;
	}

	get DEC(){
		return this.dec;
	}

	get MSL(){
		return this.msl;
	}

	get HSL(){
		return this.hsl;
	}

	get Swatch(){
		return null;
		/*return this.swatch; ????? */
	}
}

export default Swatch;


