import React, {Component} from 'react'; 
import TableDisplay from '../components/TableDisplay';


class MainContainer extends Component {
    constructor(props){
        super(props)
        this.state ={ data:[], uri:'',tableNames:[] }
        this.getTable= this.getTable.bind(this);
        this.getTableNames = this.getTableNames.bind(this);
    }

    getTable(){
        //we need
        const uri = this.state.uri
        const tableName = document.querySelector('#selectedTable').value;
        const data = {uri, tableName};
       fetch('/server/table',{
           method: 'POST',
           headers:{'Content-Type': 'application/json'},
           body:JSON.stringify(data)
       }).then(res => res.json())
        .then(result => {
            this.setState({data:result})
        })  
    }
    getTableNames(){
        const uri = document.querySelector('#uri').value;
        this.setState({uri})
        const data = {uri};
       fetch('/server/tablenames',{
           method: 'POST',
           headers:{'Content-Type': 'application/json'},
           body:JSON.stringify(data)
       }).then(res => res.json())
        .then(result => {
            const titlesArray = []; 
            result.forEach((el)=>{
                if(el.tablename.slice(0,4) !== 'sql_'){
                    titlesArray.push(el.tablename)
                }
            })
            this.setState({tableNames:titlesArray})
        })  
    }
        
    render(){
        const inputStyle={margin:'10px', width: "500px",}
        const inputTableStyle={margin:'10px', width: "100px",}
        const tableOptions =[]
        for(let i=0; i<this.state.tableNames.length; i++){
            tableOptions.push(<option value={this.state.tableNames[i]}>{this.state.tableNames[i]}</option>)
        }
        
        return(
            <div>
            <span>
                <label>Place URI Here:</label>
                <input id='uri' style={inputStyle} placeholder="progres:!!32e"></input>
                <button onClick={()=>this.getTableNames()}>Get Tables</button>
            </span>
            <br/>
            <span>
                <label>Table Name:</label>
                <select id='selectedTable' style={inputTableStyle}>
                {tableOptions}
                </select>
                {/* <input id='table_name' style={inputTableStyle} placeholder="people"></input> */}
                <button onClick={()=>this.getTable()}>Get Data</button>
            </span>
            <h2>Table Name</h2>
            <TableDisplay></TableDisplay>
            </div>
        );
    }
}

 export default MainContainer;