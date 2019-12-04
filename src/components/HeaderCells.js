// This component creates each cell for the column names

import React, {Component} from 'react';

class HeaderCell extends Component {

  render () {
    return (
      <input placeholder={this.props.data} type="text" name={this.props.column} onClick={this.props.handleEvent}></input>
    );
  }
}

export default HeaderCell;