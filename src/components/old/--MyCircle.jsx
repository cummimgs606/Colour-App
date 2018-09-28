import React, { Component } from 'react';

const Circle = '';

class MyCircle extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
         isMouseInside: false
      };
      this.handleMouseEnter = this.handleMouseEnter.bind(this);
      this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }
    handleMouseEnter() {
      this.setState({
        isMouseInside: true
      });
    }
    handleMouseLeave() {
      this.setState({
        isMouseInside: false
      });
    }
    render() {
        return (
            <Circle
                x={100} y={60} radius={50}
                fill="yellow"
                stroke="black"
                strokeWidth={this.state.isMouseInside ? 5 : 1}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave} />
        );
    }
}

export default MyCircle ;
