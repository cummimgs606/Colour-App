import React, { Component } from 'react';

class SwatchLabelSmall extends Component{

    constructor(props) {

        super(props);

        this.swatchG                 = props.swatch
        this.handleSwatchClickedG    = props.handleSwatchClicked
    }

    render(){

        return <div className = 'SwatchSmallLabel'
                    onClick = {() => this.handleSwatchClicked(this.swatchG)}>{this.swatchG.id}</div>
    }
}

export default SwatchLabelSmall;

