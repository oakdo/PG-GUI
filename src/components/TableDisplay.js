import React from 'react';
import Row from './Rows.js';
import TableHeader from './TableHeader.js';

class TableDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const lengthRow = this.props.data.length;
    const rowsArr = [];

    for (let i = 0; i < lengthRow; i += 1) {
      rowsArr.push(
        <Row
          key={i + '_row'}
          tableName={this.props.tableName}
          uri={this.props.uri}
          data={this.props.data[i]}
          reRender={this.props.reRender}
        />
      );
    }

    return (
      <div>
        <TableHeader keys={Object.keys(this.props.data[0])} />
        {rowsArr}
      </div>
    );
  }
}

export default TableDisplay;
