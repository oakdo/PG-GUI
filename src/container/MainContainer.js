import React, {Component} from 'react'; 

class MainContainer extends Component {
    constructor(props){
        super(props)
        this.state ={ data:[] }
        this.getTable= this.getTable.bind(this);
    }
    getTable(){
        const uri = document.querySelector('#uri').value;
        const tableName = document.querySelector('#table_name').value;
        const data = {uri, tableName};
       fetch('/server/all',{
           method: 'POST',
           headers:{'Content-Type': 'application/json'},
           body:JSON.stringify(data)
       }).then(res => res.json())
        .then(result => {
            console.log('result:', result)
            this.setState({data:result})
        })  
    }
        
    render(){
        const inputStyle={margin:'10px', width: "500px",}
        const inputTableStyle={margin:'10px', width: "100px",}
        return(
            <div>
            <span>
                <label>Place URI Here:</label>
                <input id='uri' style={inputStyle} placeholder="progres:!!32e"></input>
                <label>Table Name:</label>
                <input id='table_name' style={inputTableStyle} placeholder="people"></input>
                <button onClick={()=>this.getTable()}>Get Data</button>
            </span>
            </div>
        );
    }
}

 export default MainContainer;