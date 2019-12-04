import React from 'react';  
import TableHeader from './TableHeader.js'

class CreatePopup extends React.Component {  
  render() {  
    return (  
      <div>
        <div>   
          <h1>Create Row</h1> 
          <TableHeader/>
            {/* <form>
              Coloumn1: <input type="text" name=""/>
              Coloumn2: <input type="text" name=""/><br/>
              Coloumn3: <input type="number" name=""/><br/>
              Coloumn4: <input type="url" name=""/><br/><br/>
              <input type="submit" value="submit"/>
            </form>  */}
            <button onClick={this.props.closePopup}>close me</button> 
        </div> 
      </div>  
    )};  
}  

export default CreatePopup;