import React, {Component} from 'react';
import InputCell from './InputCells.js';


class Row extends Component {
  constructor(props) {
    super(props) 

    this.state = {

    }

    this.onEnter = this.onEnter.bind(this)
  }

  onEnter(event){
    if(event.key === 'Enter'){
      const newValue = event.target.value;
      const dataObject = this.props.data;
      const inputCellColumn = event.target.name;
      

      const queryString = `UPDATE people SET `
    }

  }

  render () {
    const columns = Object.entries(this.props.data);
    const rowsArr = [];
    columns.forEach((val, index) => {
        rowsArr.push(<InputCell key={index + '_inputCell'} data={val[1]} column={val[0]} onEnter={this.onEnter} />)
      });

    return (
      <div>
        {rowsArr}
      </div>
    );
  }
}

export default Row;