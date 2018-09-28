import React, { Component } from 'react';


// ----------------------------------------------------------------------
// IMPORT BOOTSTRAP
// ----------------------------------------------------------------------

import { ButtonToolbar } from 'react-bootstrap';
import { ToggleButtonGroup } from 'react-bootstrap';
import { ToggleButton } from 'react-bootstrap';

// ----------------------------------------------------------------------
// CANVAS COMPONENT
// ----------------------------------------------------------------------

class ImageSamplerSize extends React.Component {

    constructor(props) {

      super(props);

      this.state = {
            value:1,
      };

      this.handleSelect = this.handleSelect.bind(this);
      this.handleSelectSize = props.handleSelectSize
    }


    // ----------------------------------------------------
    // START HANDEL EVENTS
    // ----------------------------------------------------


    handleSelect(value) {

        this.setState({value:value})
        this.handleSelectSize(value)
    }

    // ----------------------------------------------------
    // END HANDEL EVENTS
    // ----------------------------------------------------


    render() {
        return( <div>
                    <ButtonToolbar>
                        <ToggleButtonGroup  type="radio"
                                            value={this.state.value}
                                            onChange={this.handleSelect}
                                            name="options">
                            <ToggleButton value={1}>1x1</ToggleButton>
                            <ToggleButton value={3}>3x3</ToggleButton>
                            <ToggleButton value={5}>5x5</ToggleButton>
                            <ToggleButton value={7}>7x7</ToggleButton>
                            <ToggleButton value={9}>9x9</ToggleButton>
                        </ToggleButtonGroup>
                    </ButtonToolbar>

                    
                </div>   
        );
    }
}

export default ImageSamplerSize;

