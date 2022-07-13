import React from 'react';
import './App.css';
import * as XLSX from 'xlsx';

function App() {

  const [showData, setShowData] = React.useState([]);

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
      console.log(data);
      setShowData(data);
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        Hello!!!
        <input type="file" 
        onChange={(e)=>{
          const file = e.target.files[0];
          readExcel(file);
        }}
        ></input><br/>
        
        <table>
          <thead>
          <tr>
          <td>Date</td>
          <td>Amount</td>
          <td>Note</td>
          <td>Category</td>
          </tr>
          </thead>
          <tbody>
            
            {showData&&showData.map((item,index)=>{
          return <tr key={index}>
          <td>{item.Date}</td>
          <td>{item.Amount}</td>
          <td>{item.Note}</td>
          <td>{item.Category}</td>
        </tr>
        })}
              
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
