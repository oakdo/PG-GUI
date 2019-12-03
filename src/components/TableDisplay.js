import React from 'react';
import Row from './Rows.js';
import TableHeader from './TableHeader.js';

class TableDisplay extends React.Component {
  constructor(props){
    super(props)
    this.state = {data: [
      { _id: 81,
      name: 'Raymus Antilles',
      mass: '79',
      hair_color: 'brown',
      skin_color: 'light',
      eye_color: 'brown',
      birth_year: null,
      gender: 'male',
      species_id: '1',
      homeworld_id: '2',
      height: 188 },
    { _id: 84,
      name: 'Finn',
      mass: null,
      hair_color: 'black',
      skin_color: 'dark',
      eye_color: 'dark',
      birth_year: null,
      gender: 'male',
      species_id: '1',
      homeworld_id: '28',
      height: null },
    { _id: 85,
      name: 'Rey',
      mass: null,
      hair_color: 'brown',
      skin_color: 'light',
      eye_color: 'hazel',
      birth_year: null,
      gender: 'female',
      species_id: '1',
      homeworld_id: '28',
      height: null },
    { _id: 86,
      name: 'Poe Dameron',
      mass: null,
      hair_color: 'brown',
      skin_color: 'light',
      eye_color: 'brown',
      birth_year: null,
      gender: 'male',
      species_id: '1',
      homeworld_id: '28',
      height: null }
    ]
  }
  }

  render(){
      const lengthRow = this.state.data.length;
      const rowsArr = [];
      
      for(let i = 0; i < lengthRow; i += 1) {
          rowsArr.push(<Row key={i + '_row'} data={this.state.data[i]} />)
      }
    
    return(
      <div>
        <TableHeader keys={Object.keys(this.state.data[0])}/>
        {rowsArr}
      </div>
    )
  }

}

export default TableDisplay;