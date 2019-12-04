import React from 'react';
import Row from './Rows.js';
import TableHeader from './TableHeader.js';

class TableDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render(){
      const lengthRow = this.props.data.length;
      const rowsArr = [];

      
      for(let i = 0; i < lengthRow; i += 1) {
          rowsArr.push(<Row key={i + '_row'} reRender={this.props.reRender} tableName={this.props.tableName} uri={this.props.uri} data={this.props.data[i]} />)
      }
    
    return(
      <div>
        <TableHeader keys={Object.keys(this.props.data[0])} reRender={this.props.reRender} tableName={this.props.tableName} uri={this.props.uri}/>
        {rowsArr}
      </div>
    );
  }
}

export default TableDisplay;
