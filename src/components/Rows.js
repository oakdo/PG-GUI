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
      const primaryKey = this.props.data._id;
      const columnName = event.target.name;
      let queryString; 
      if(isNaN(newValue)) {
        queryString = `UPDATE ${this.props.tableName} SET ${columnName} = '${newValue}' WHERE _id = ${primaryKey}`
      }
      else{
        queryString = `UPDATE ${this.props.tableName} SET ${columnName} = ${newValue} WHERE _id = ${primaryKey}`
      }
      const uri = this.props.uri

      console.log('THIS IS QUERYSTRNG', uri, queryString)

      fetch('/server/update', {
        method: 'POST',
        body: JSON.stringify({uri,queryString}),
        headers: {
          'Content-Type' : 'application/json'
        }
      })

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