import React, {Component} from 'react';

class HeaderCell extends Component {
  constructor(props) {
    super(props) 

    this.state = {

    }
  }

  render () {
    return (
      <input placeholder={this.props.data} type="text" name={this.props.column} onClick={this.props.handleEvent}></input>
    );
  }
}

export default HeaderCell;