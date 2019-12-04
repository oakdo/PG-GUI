import React, {Component} from 'react';
import InputCell from './InputCells.js';


class TableHeader extends Component {
  constructor(props) {
    super(props) 

    this.state = {

    }
  }

  render () {

    const rowsArr = [];
    this.props.keys.forEach((val, index) => {
        rowsArr.push(<InputCell key={index + '_inputCell'} data={val} />)
      });

    return (
      <div>
        {rowsArr}
      </div>
    );
  }
}

export default TableHeader;