import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(){
    super();
    this.state={nama:'',usia:'',status:'',stud:[]};
  }
  click=(event)=>{
    this.setState({
      nama:this.refs.nama.value, 
      usia:this.refs.usia.value,
      status:this.refs.status.value,
    });
  }
   searching=()=>{
     axios.get('http://localhost:5000/api')
     .then((ambildata)=>{
       console.log(ambildata.data);
        this.setState({
          stud:ambildata.data,
        })
     })
   };
  
   muat=()=>{
    axios.post('http://localhost:5000/api',
    {
      nama: this.state.nama,
      usia: this.state.usia,
      status:this.state.status,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  render() {
     const data=this.state.stud.map((item, index)=>{
       var nm =[item.nama]
       var reg=[item.usia] 
      var area=[item.status]
       return <tr key={index}><td>{nm}</td><td>{reg}<td>{area}</td></td></tr>
     });
    return (
      <div>
        <div className="container">
           <center>
              <h1>Daftar</h1>
                  <div className="row">
                      <div className="col-md-6">
                          <input className="form-control" ref="nama" type="text" style={{width:'550px'}} onInput={()=>{this.click();}}/><br></br>
                          <input className="form-control" ref="usia" type="number" style={{width:'550px'}} onInput={()=>{this.click();}}/><br></br>
                          <input className="form-control" ref="status" type="text" style={{width:'550px'}} onInput={()=>{this.click();}}/><br></br>
                          {/* <textarea ref="nama" type="text" rows="10" cols="30" onInput={()=>{this.click();}}/> */}
                      </div>
                      <div className="col-md-4">
                          <button type="submit" className="btn btn-success btn-block" style={{width:'250px'}} onClick={()=>{this.searching();}}>get</button><br></br>
                          <button type="submit" className="btn btn-success btn-block" style={{width:'250px'}} onClick={()=>{this.muat();}}>post</button>
                      </div>
                  </div>
            </center>
              <br/>
              {data} 
        </div>
      </div>
    );
  }
}

export default App;