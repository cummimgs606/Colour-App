import React, { Component } from 'react';

class Hello extends Component{

	constructor(props) {
		super(props);
		this.prefix = props.dataMunsellTable[1][0][0].prefix;
	}

  	render() {
	    return (
	      <p>Hello world Loaded Component! {this.prefix}</p>
	    )
	}
}

export default Hello;

