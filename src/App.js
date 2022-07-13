import React from 'react';
import './App.css';
import * as XLSX from 'xlsx';

function App() {

  const [showData, setShowData] = React.useState([]);

  const [demo,setDemo]= React.useState([]);

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
      let dateArray=[[]],months=data[0].Date;
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
      }
      //console.log(dateArray);
      setDemo(dateArray);
      /*dateArray.forEach((month)=>{
        console.log(month);
      })*/
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
        {
              demo&&demo.map((month,index)=>{
                return <div key={index}>
                  <p>Next Month.................</p>
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
            {
              
                month.map((item,index)=>{
                  return <tr key={item.Date+item.Note+index}>
                  <td>{item.Date}</td>
                  <td>{item.Amount}</td>
                  <td>{item.Note}</td>
                  <td>{item.Category}</td>
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
