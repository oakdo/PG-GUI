import React, {Component} from 'react';
import InputCell from './InputCells.js';


class Row extends Component {
  constructor(props) {
    super(props) 

    this.state = {

    }
  }

  render () {
    const columns = Object.values(this.props.data);
    const rowsArr = [];
    columns.forEach((val, index) => {
        rowsArr.push(<InputCell key={index + '_inputCell'} data={val} />)
      });

    return (
      <div>
        {rowsArr}
      </div>
    );
  }
}

export default Row;