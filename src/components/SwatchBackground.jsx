import React, { Component } from 'react';

class SwatchBackground extends Component{

	static AsRGB(rgb){

	    var divStyle = {
	        backgroundColor: `rgb(${rgb})`
	    };
	   
	    return divStyle
	}

	static AsHex(hex){

	    var divStyle = {
	        backgroundColor: `#${hex}`
		}

		return divStyle
	};
}

export default SwatchBackground;

