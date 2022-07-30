import React, { useEffect, useState } from 'react';
import './App.css';
import * as XLSX from 'xlsx';
//import {datafile} from './data';
//import { julyData, kalyan } from './july';
//import AppLogged from './Applogged'
import Add from './add page/add'
import fireDb from './firebase';
import Edit from './editpage/edit';

import DatePicker from "react-datepicker";


function App({ islogged }) {

  // const noData = {

  //     details: {
  //       _2022: {
  //         _0722: {
  //           _dummyData: {
  //             amount: "0",
  //             category: "no data",
  //             date: "01-0199",
  //             id: "nodata",
  //             note: "no data"
  //           }
  //         }
  //     }
  //   }
  // };

  const dateref = React.useRef(null);
  const [startDate, setStartDate] = useState(new Date());

  function formatDate(d) {
    var month = d.getMonth();
    var day = d.getDate().toString().padStart(2, '0');
    var fullyear = d.getFullYear();
    let year = fullyear.toString().substr(-2);
    month = (month + 1).toString().padStart(2, '0');
    return {
      date: `${day}-${month}${year}`,
      fullyear
    };
  }

  //let d = new Date();
  // let showDate = formatDate(startDate);
  //  useEffect(()=>{
  //   setShowDate(formatDate(showDate));
  //  },[startDate]);
  const [showDate, setShowDate] = React.useState(formatDate(startDate));
  const [yearToShow, setYearToShow] = React.useState(showDate.fullyear);
  const [monthToShow, setMonthToShow] = React.useState(showDate.date.slice(3));


  const [showData, setShowData] = React.useState([]);
  const [lastMonthBalance, setLastMonthBalance] = useState(0);
  const [currentBalance, setCurrentBalance] = React.useState(0);
  //const [kcurrentBalance,setkCurrentBalance] = React.useState(0);
  const [editmode, setEditMode] = useState(false);
  const [editId, setEditId] = useState();
  const [editDate, setEditDate] = useState();

  //const salary = 118027, ksalary = 29087;
  const ksalary = 29087;
  const kprevBalance = 11659;
  //const prevBalance = 15012, kprevBalance = 11659;
  const [lSalary, setSalary] = useState(0);
  const salaryinputRef1 = React.useRef(null);
  const salaryinputRef2 = React.useRef(null);
  const [salaryEditToggle, setSalaryEditToggle] = React.useState(false);
  const [startOfMonthBalance, setStartOfMonthBalance] = React.useState(parseInt(lSalary) + parseInt(lastMonthBalance));


  let assign = 0;
  const [demo, setDemo] = React.useState([]);
  const [toggle, setToggle] = React.useState(false);
  const [kharchu, setKharchu] = React.useState(0);
  const [currentpath, setCurrentPath] = useState('details');
  const [lastupdate, setLastUpdate] = useState('loading...');

  // useEffect(()=>{
  //   if(showDate!==undefined){
  //   setMonthToShow(showDate.date.slice(3));
  //   setYearToShow(showDate.fullyear);
  //   console.log(showDate);
  //   }

  // },[showDate,startDate]);

  useEffect(() => {
    fireDb.child('lastupdate/date/date').on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        //console.log(snapshot.val());
        setLastUpdate(snapshot.val());
      }
      else setLastUpdate('not available')
    })
  })
  useEffect(() => {
    fireDb.child(currentpath).on("value", (snapshot) => {
      if (`_${monthToShow}salary` in snapshot.val()[`_${yearToShow}`]) {
        let dataObj2 = snapshot.val()[`_${yearToShow}`][`_${monthToShow}salary`]['salary'];
        setSalary(dataObj2.salary);
        setLastMonthBalance(dataObj2.lastMonthBalance);
        setStartOfMonthBalance(dataObj2.salary + dataObj2.lastMonthBalance);
      }
      else {
        console.log('salary details not available');
        setSalary(0);
        setLastMonthBalance(0);
        setStartOfMonthBalance(0);
        setCurrentBalance(0);
      }
    });
  }, [currentpath, toggle,startDate]);
  useEffect(() => {
    //let path;
    //console.log(toggle);
    //if(!toggle) path='details';
    //else path='kalyan';
    fireDb.child(currentpath).on("value", (snapshot) => {
      if (snapshot.val() !== null && snapshot.val() !== undefined) {
        //console.log(snapshot.val());
        //below "".accessor" thing needs to be dynamic
        //let accessor = `${snapshot.val()}._${yearToShow}._${monthToShow}`
        // let dataObj = snapshot.val()._2022._0722;
        //console.log(yearToShow,monthToShow)
        // let dataObj2 = {};
        //if(yearToShow!==undefined && monthToShow!==undefined){
        let dataObj2 = snapshot.val()[`_${yearToShow}`][`_${monthToShow}`];
        //}
        //console.log(dataObj2);
        setDemo(dataObj2);
      }
      else {
        console.log('table data did not came')
      }
    });
    //console.log(showDate);
  }, [editmode, toggle, startDate])

  useEffect(() => {
    if (demo) {
      let data = Object.keys(demo).map((key) => demo[key]);
      let sum = 0;
      //console.log(data)
      for (let i = 0; i < data.length; i++) {

        //date comparisiom needs to be dynamic
        if (data[i].date.slice(3) === monthToShow
          //below validation can be removed
          //|| data[i].date.slice(3) === '07/22' || data[i].date.slice(3) === '07-22' || data[i].date.slice(3) === '0722'
        ) {
          sum = sum + data[i].amount;
        }


      }
      if (!toggle)
        assign = lSalary + lastMonthBalance + sum;
      else assign = lSalary + lastMonthBalance + sum;
      setCurrentBalance(assign);
      setKharchu(sum);
    }
    else if(lSalary && lastMonthBalance){
      setCurrentBalance(lSalary + lastMonthBalance);
    }

  }, [toggle, demo,salaryEditToggle])

  function toggleEditId(id, date) {
    //console.log(id,Date);
    let formateddate = date.substr(3, 2) + '-' + date.substr(0, 2) + '-' + date.slice(5);
    let newdate = new Date(formateddate).toString();
    //console.log(formateddate,newdate);
    setEditDate(newdate);
    setEditId(id);
    setEditMode(true);
  }
  function setEdittoggle() {

    setEditMode(false);

  }
  function updateSalary() {
    const path = `${currentpath}/_${yearToShow}/_${monthToShow}salary/salary`;
    fireDb.child(path).update({
      salary: parseInt(salaryinputRef1.current.value),
      lastMonthBalance: parseInt(salaryinputRef2.current.value)
    });
    setStartOfMonthBalance(parseInt(salaryinputRef1.current.value) + parseInt(salaryinputRef2.current.value));
  }

  return (
    <div className="App">

      <header className="App-header">
        {!editmode ? (islogged && 
        <Add 
        currentpath={currentpath}
         receiveddate={startDate} 
         />) :
          (islogged && <Edit currentpath={currentpath} receivedid={editId} receiveddate={editDate} setEdittoggle={setEdittoggle} />)}
        <p
          onClick={() => {
            if (!toggle) {
              setCurrentPath('kalyan');
              setToggle(!toggle);
            }
            else {
              setCurrentPath('details');
              setToggle(!toggle);
            }
          }}
        >Hello!!! Laxmana Rao <br />  last updated time = {lastupdate}</p>




        <div style={{
          display: 'flex',
          flexDirection: 'column-reverse'
        }}>
          <>
            {islogged && salaryEditToggle &&
              <div>
                <input type='number' value={lSalary}
                  placeholder='enter salary'
                  ref={salaryinputRef1}
                  onClick={() => { salaryinputRef1.current.focus(); }}
                onChange={(e) => {
                   setSalary(e.target.value);
                  //salaryinputRef1.current.focus();
                }} 
                /><br />
                <input type='number'
                  ref={salaryinputRef2}
                  onClick={() => { salaryinputRef2.current.focus(); }}
                  placeholder='last month balance...'
                  value={lastMonthBalance}
                  onChange={(e) => { setLastMonthBalance(e.target.value); }}
                /><br />
                <button onClick={() => {
                  setSalaryEditToggle(false);
                  updateSalary();
                }} >add/update</button>
              </div>}</>
          {
            !toggle ? <>

              <p onClick={() => { setSalaryEditToggle(!salaryEditToggle) }}>
                <span><b style={{ color: 'cyan' }}>Start of month balance</b> = {startOfMonthBalance}
                </span><br />
                <span style={{ paddingRight: '10px' }}><b style={{ color: 'cyan' }}>
                  {monthToShow} Salary</b>={lSalary}</span><br />
                <span style={{ paddingRight: '10px' }}><b style={{ color: 'cyan' }}>
                  last month balance </b>= {lastMonthBalance}</span>

              </p>
              <p>
                <span><b style={{ color: 'cyan' }}>
                  Today's balance</b> = {currentBalance}
                </span>
                <br />
                <span style={{ paddingRight: '10px' }}>
                  <b style={{ color: 'cyan' }}>Kharchu</b> = &nbsp;{kharchu}
                  {/* {kharchu < 0
                  ? <><b>{kharchu.toString().substr(0,1)}</b>{kharchu.toString().slice(1)}</>
                  : {kharchu}
                } */}
                </span>
              </p></>
              : <>
                <p onClick={() => { setSalaryEditToggle(!salaryEditToggle) }}>
                  <span><b style={{ color: 'cyan' }}>Start of month balance</b> = {startOfMonthBalance}
                  </span><br />
                  <span style={{ paddingRight: '10px' }}><b style={{ color: 'cyan' }}>
                    {monthToShow} Salary</b>={lSalary}</span><br />
                  <span style={{ paddingRight: '10px' }}><b style={{ color: 'cyan' }}>
                    last month balance </b>= {lastMonthBalance}</span>

                </p>
                <p>
                  <span><b style={{ color: 'cyan' }}>
                    Today's balance</b> = {currentBalance}
                  </span>
                  <br />
                  <span style={{ paddingRight: '10px' }}>
                    <b style={{ color: 'cyan' }}>Kharchu</b> = &nbsp;{kharchu}
                    {/* {kharchu < 0
                  ? <><b>{kharchu.toString().substr(0,1)}</b>{kharchu.toString().slice(1)}</>
                  : {kharchu}
                } */}
                  </span>
                </p></>
            // : <>
            //   <p>
            //     <span><b style={{ color: 'cyan' }}>
            //       Start of month balance</b> = {ksalary + kprevBalance}</span><br />
            //     <span style={{ paddingRight: '10px' }}>
            //       <b style={{ color: 'cyan' }}>
            //         {/** this needs to be dynamic*/}
            //         June
            //         Salary</b>={ksalary}</span><br />
            //     <span style={{ paddingRight: '10px' }}>
            //       <b style={{ color: 'cyan' }}>last month balance </b>= {kprevBalance}</span>
            //   </p>
            //   <p>
            //     <span style={{ paddingRight: '10px' }}>
            //       <b style={{ color: 'cyan' }}>Kharchu</b> = {kharchu}</span><br />
            //     <span><b style={{ color: 'cyan' }}>
            //       Today's balance</b> = {currentBalance}</span>
            //   </p>
            // </>
          }
          {demo ? <table border='2px solid'>
            <thead>
              <tr style={{ fontSize: '20px', color: 'cyan' }}>
                <td >Date</td>
                <td style={{ paddingLeft: '10px' }}>Amount</td>
                <td>Note</td>
                <td style={{ paddingLeft: '10px' }}>Category</td>
              </tr>
            </thead>
            <tbody>
              {

                demo && Object.keys(demo).map((id) => {

                  return <tr key={id}
                    onClick={() => {//setEditMode(editmode);
                      toggleEditId(id, demo[id].date);
                    }}>
                    <td > {demo[id].date} </td>
                    <td style={{ paddingLeft: '10px' }}> {demo[id].amount} </td>
                    <td> {demo[id].note} </td>
                    <td style={{ paddingLeft: '10px' }}>{demo[id].category} </td>
                  </tr>

                })


              }

            </tbody>
          </table> : 'no data'}
          <div style={{ margin: '1rem 0 1rem 0' }}>

            <DatePicker ref={dateref} selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                setShowDate(formatDate(date));
                setMonthToShow(formatDate(date).date.slice(3));
                setYearToShow(formatDate(date).fullyear);
              }} />
          </div>
        </div>






      </header>
    </div>
  );
}

export default App;

{/*}
        <input type="file" 
        onChange={(e)=>{
          const file = e.target.files[0];
          readExcel(file);
        }}
        ></input><br/> */}
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

/**
 * 
      /* {
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
                
                return <tr key={item.Date+item.Note+index} 
                onClick={()=>{//setEditMode(editmode);
                  toggleEditId(item.id,item.Date);}}>
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
    } */

