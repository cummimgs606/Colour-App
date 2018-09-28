let spacer = ' - '

class SwatchLabel  {

	static label(swatch, mode){

	    return this['label'+mode](swatch)
	}

	static labelIND(swatch){
		return swatch.id
	}	

	static labelPOS(swatch){
		return swatch.point.x + spacer + swatch.point.y
	}	
  
	static labelRGB(swatch){
		return swatch.rgb[0] + spacer + swatch.rgb[1] + spacer + swatch.rgb[3]
	}

	static labelHEX(swatch){
		return swatch.hex
	}

	static lablelDEC(swatch){
		return swatch.dec
	}

	static labelMSL(swatch){
		return swatch.msl.hue + spacer + swatch.msl.croma + spacer + swatch.msl.value
	}

	static labelHSL(swatch){
		return Math.round(swatch.hsl[0] * 360) + spacer + Math.round(swatch.hsl[1] * 100) + spacer + Math.round(swatch.hsl[2] * 100)
	}

	static labelCMY(swatch){
		return swatch.cmyk.c + spacer + swatch.cmyk.m + spacer + swatch.cmyk.y + spacer + swatch.cmyk.k
	}
}

export default SwatchLabel;


