import React, { Component } from 'react';
import Graph from '../components/d3linechart.js'
import * as d3 from 'd3'
import VXChart from '../components/vxGraph.js'


/***
 * Chart Container Component
 * Contains all d3 charts
 * Queries server for data to populate charts from
 * 
 */



class ChartContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: null,
        }
    }
  
    render() {
        const data = d3.json('https://raw.githubusercontent.com/sxywu/react-d3-example/master/public/sf.json')
        .then(resp => {
          const newData = resp.map(d => Object.assign(d, {date: new Date(d.date)}));
          this.setState({data: newData})
        })

      return (
        <div className="ChartContainer">
            <Graph data={this.state.data} />
            <VXChart width={500} height={500}/>
         
        </div>
      );
    }
  }
  
  export default ChartContainer;
  