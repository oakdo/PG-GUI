import React, { Component } from "react";
import * as d3 from "d3";
var width = 960;
var height = 500;
var force = d3.forceSimulation()
.force("charge", -300)
.force("linkDistance",50)
.force("size",[width, height]);


class ForceChart extends Component {
 constructor(props){
     super(props)
     this.state = {
         bars : []
     }
 }


 componentWillMount() {
    force.on('tick', () => {
      // after force calculation starts, call
      // forceUpdate on the React component on each tick
      this.forceUpdate()
    });
  }

static getDerivedStateFromProps(nextProps, prevState) {
force.nodes(nextProps.nodes).links(nextProps.links);
force.start();
}

  render() {
     // use React to draw all the nodes, d3 calculates the x and y
     var nodes = _.map(this.props.nodes, (node) => {
        var transform = 'translate(' + node.x + ',' + node.y + ')';
        return (
          <g className='node' key={node.key} transform={transform}>
            <circle r={node.size} />
            <text x={node.size + 5} dy='.35em'>{node.key}</text>
          </g>
        );
      });
      var links = _.map(this.props.links, (link) => {
        return (
          <line className='link' key={link.key} strokeWidth={link.size}
            x1={link.source.x} x2={link.target.x} y1={link.source.y} y2={link.target.y} />
        );
      });
  
      return (
        <svg width={width} height={height}>
          <g>
            {links}
            {nodes}
          </g>
        </svg>
      );
  }
}

export default ForceChart;