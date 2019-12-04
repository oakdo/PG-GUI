import React from 'react';
import Row from './Rows.js';
import TableHeader from './TableHeader.js';
import CreatePopup from './createPopup.js'

class TableDisplay extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      showPopup: false
    }
    this.togglePopup = this.togglePopup.bind(this);
  }

  togglePopup() {  
    this.setState({  
         showPopup: !this.state.showPopup  
    }); 
  }
  

  render(){
      const lengthRow = this.props.data.length;
      const rowsArr = [];
      // console.log('PROPS INSIDE PARENT', this.props)
      
      for(let i = 0; i < lengthRow; i += 1) {
          rowsArr.push(<Row key={i + '_row'} reRender={this.props.reRender} tableName={this.props.tableName} uri={this.props.uri} data={this.props.data[i]} />)
      }
    
    return(
      <div>
        <button onClick={this.togglePopup}>Create Row</button>
        {this.state.showPopup ?
         <CreatePopup closePopup={this.togglePopup} keys={Object.keys(this.props.data[0])} reRender={this.props.reRender} tableName={this.props.tableName} uri={this.props.uri}/>
         : null
        }
        <TableHeader keys={Object.keys(this.props.data[0])} reRender={this.props.reRender} tableName={this.props.tableName} uri={this.props.uri}/>
        {rowsArr}
      </div>
    );
  }
}

export default TableDisplay;
