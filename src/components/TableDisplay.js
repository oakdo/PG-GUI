import React from 'react';

class TableDisplay extends React.Component {
  constructor(props){
    super(props)
    this.state = {data: [{ _id: 81,
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
    const columns = Object.keys(this.state.data[0]);
    
      const headersArr = [];
      columns.forEach((val, index) => {
        headersArr.push(<input placeholder={val} type="text" name={val}></input>)
      });

      const rowsArr = [];
      this.state.data.forEach((val, index) => {
        const row = Object.values(val);
        console.log(row)
        row.forEach((el, index) => {
          console.log('rowforEach', el)
          rowsArr.push(<input placeholder={el} type="text" name={el}></input>)
        })
      })
    
    

    return(
      <div>
        {headersArr}
        {rowsArr}
        
      </div>
    )
  }

}

export default TableDisplay;