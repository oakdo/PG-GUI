import React, {Component} from 'react';

class InputCell extends Component {
  constructor(props) {
    super(props) 

    this.state = {

    }
  }

  render () {

    return (
      <input placeholder={this.props.data} type="text" name='name'></input>
    );
  }
}

export default InputCell;