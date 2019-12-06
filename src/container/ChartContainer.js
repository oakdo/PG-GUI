import React, { Component } from 'react';
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
        // const data = d3.json('https://raw.githubusercontent.com/sxywu/react-d3-example/master/public/sf.json')
        // .then(resp => {
        //   const newData = resp.map(d => Object.assign(d, {date: new Date(d.date)}));
        //   this.setState({data: newData})
        // })
      return (
<svg width="1000" height="1000">
  <rect x="5" y="19.0625" width="400" height="400" fill="#e3e969"></rect>
</svg>
      );
    }
  }
  
  export default ChartContainer;
  