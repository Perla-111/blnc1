import React, { useEffect, useState } from 'react';
import './App.css';
import * as XLSX from 'xlsx';
//import {datafile} from './data';
import {julyData,kalyan} from './july';
import Add from './add page/add'

function App() {

  const [showData, setShowData] = React.useState([]);

  const salary = 118027,ksalary=29087;
  const prevBalance = 15012,kprevBalance=11659;
  const [currentBalance,setCurrentBalance] = React.useState(0);
  //const [kcurrentBalance,setkCurrentBalance] = React.useState(0);

  let assign = 0;
  const [demo,setDemo]= React.useState(julyData);
  const [toggle,setToggle]= React.useState(false);
  const [kharchu,setKharchu] = React.useState(0);

  

      useEffect(()=>{
        let data=demo[0],sum=0;
        for(let i=0;i<data.length-1;i++){
  
          if(data[i].Date.slice(3)==='07/22'||data[i].Date.slice(3)==='07-22')
          {
            sum = sum + data[i].Amount;
            //console.log(data[i].Amount);
          }
  
  
        }
        if(!toggle)
        assign = salary+prevBalance+sum;
        else assign = ksalary+kprevBalance+sum;
        setCurrentBalance(assign);
        //setkCurrentBalance()
        setKharchu(sum);
        //console.log(dateArray);
        //setDemo(dateArray);
        //setDemo(julyData);
        //console.log(sum,'sum',assign,'assign',salary,'salary',prevBalance,'prevBalance');
      },[toggle])

/*
  const readExcel=(file)=>{
    const promise = new Promise((resolve,reject)=>{
      const fileReader = new FileReader();

      fileReader.readAsArrayBuffer(file);
      fileReader.onload=(e)=>{
        const bufferArray = e.target.result;

        const workbook = XLSX.read(bufferArray,{type:'buffer'});

        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);
        resolve(data);
      }

      fileReader.onerror=((error)=>{
        reject(error);
      })

    });

    promise.then((data)=>{
      //console.log(data);
      let reversedData = [];
      for(let k=data.length-1;k>=0;k--){
        reversedData.push(data[k]);
      }
      //console.log(reversedData);
      setShowData(reversedData);
      let dateArray=[[]],months=data[0].Date,sum=0;
      for(let i=0,j=0;i<data.length-1;i++){
        
        if(months.slice(3)===data[i].Date.slice(3)){
          dateArray[j].push(data[i]);
        }
        else{
          j++;
          dateArray.push([]);
          months=data[i].Date;
          i--;
        }
        if(data[i].Date.slice(3)==='07/22'){sum = sum + data[i].Amount;
          console.log(data[i].Amount);
        }


      }
      assign = salary+prevBalance+sum;
      setCurrentBalance(assign);
      //console.log(dateArray);
      //setDemo(dateArray);
      setDemo(julyData);
      console.log(sum,'sum',assign,'assign',salary,'salary',prevBalance,'prevBalance');
      
    })
  }
  */

  return (
    <div className="App">
      <header className="App-header">
        <Add />
        <p 
        onClick={()=>{
          if(!toggle){
          setDemo(kalyan);
          setToggle(!toggle);
          }
          else {
            setDemo(julyData);
            setToggle(!toggle);
          }
        }}
        >Hello!!!</p>
        {/*}
        <input type="file" 
        onChange={(e)=>{
          const file = e.target.files[0];
          readExcel(file);
        }}
        ></input><br/> */}
        
        {
              demo&&demo.map((month,index)=>{
                
                
                return <div key={index} style={{display:'flex',
                flexDirection: 'column-reverse'}}>
                  {!toggle?<>
                  <p><span style={{paddingRight:'10px'}}><b style={{color:'cyan'}}>June Salary</b>={salary}</span>
                  <span style={{paddingRight:'10px'}}><b style={{color:'cyan'}}>last month balance </b>= {prevBalance}</span>
                  <span><b style={{color:'cyan'}}>Start of month balance</b> = {salary+prevBalance}</span></p>
                  <p><span style={{paddingRight:'10px'}}><b style={{color:'cyan'}}>Kharchu</b> = {kharchu}</span>
                  <span><b style={{color:'cyan'}}>Today's balance</b> = {currentBalance}</span></p></>
                  :<>
                  <p><span style={{paddingRight:'10px'}}><b style={{color:'cyan'}}>June Salary</b>={ksalary}</span>
                  <span style={{paddingRight:'10px'}}><b style={{color:'cyan'}}>last month balance </b>= {kprevBalance}</span>
                  <span><b style={{color:'cyan'}}>Start of month balance</b> = {ksalary+kprevBalance}</span></p>
                  <p><span style={{paddingRight:'10px'}}><b style={{color:'cyan'}}>Kharchu</b> = {kharchu}</span>
                  <span><b style={{color:'cyan'}}>Today's balance</b> = {currentBalance}</span></p>
                  </>}
                  <table border='2px solid'>
          <thead>
            
          <tr style={{fontSize:'20px',color:'cyan'}}>
          <td >Date</td>
          <td style={{paddingLeft:'10px'}}>Amount</td>
          <td>Note</td>
          <td style={{paddingLeft:'10px'}}>Category</td>
          </tr>
          </thead>
          <tbody>
            {
              
                month.map((item,index)=>{
                  
                  return <tr key={item.Date+item.Note+index}>
                  <td > {item.Date} </td>
                  <td style={{paddingLeft:'10px'}}> {item.Amount} </td>
                  <td> {item.Note} </td>
                  <td style={{paddingLeft:'10px'}}>{item.Category} </td>
                </tr>
                
                })

              
            }
            
          </tbody>
        </table>
        </div>
        
              })
      }
        

        
      </header>
    </div>
  );
}

export default App;
