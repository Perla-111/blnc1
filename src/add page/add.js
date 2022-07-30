import React,{useId, useState} from "react";
import fireDb from '../firebase';
import {v4 as uuidv4} from 'uuid';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const Add = ({currentpath}) => {

    const inputRef = React.useRef(null);

    const dateref = React.useRef(null);
    const [startDate,setStartDate]  = useState(new Date());
    const [date,setDate] = useState('');
    const [amount,setAmount] = useState('');
    const [note,setNote] = useState('');
    const [category,setCategory] = useState('');


function formatDate(d)
{
    var month = d.getMonth();
    var day = d.getDate().toString().padStart(2, '0');
    var year = d.getFullYear();
    year = year.toString().substr(-2);
    month = (month + 1).toString().padStart(2, '0');
    return `${day}-${month}${year}`;
}
function getDate(d)
{

    return `${d}`;
}

let d = new Date();

const submitDetails= ()=>{
        let obj = {
            id :uuidv4(),
            date:date||formatDate(dateref.current.props.selected),
            amount:parseInt(amount),
            note,
            category
        }
        const path=`${currentpath}/_${d.getFullYear()}/_${obj.date.slice(3)}`;
        
//for adding a user
        // let obj = {
        //     username:'',
        //     password:''
        // }
        // const path=``;
       // console.log(obj);
      fireDb.child(path).push(obj);
      setAmount('');
      setNote('');
      setCategory('');
      setDate('');
      fireDb.child('lastupdate/date/').update({date:getDate(d)});
    }

    return (
        <div>
            <DatePicker ref={dateref} selected={startDate} onChange={(date) => {setStartDate(date);
            }}/>
            {/* <input type='text' 
        placeholder='dd-mmyy date'
        value={date}
        onChange={(e)=>{setDate(e.target.value)}}
        /><br/> */}
        <input type='number' 
        ref={inputRef}
        placeholder='enter amount'
        value={amount}
        onChange={(e)=>{setAmount(e.target.value);
        inputRef.current.focus();}}
        /><br/>
        <input type='text' 
        ref={inputRef}
        placeholder='enter the reason'
        value={note}
        onChange={(e)=>{setNote(e.target.value);
            inputRef.current.focus();}}
        /><br/>
        <input type='text' 
        ref={inputRef}
        placeholder='enter person name or bill type'
        value={category}
        onChange={(e)=>{setCategory(e.target.value);
            inputRef.current.focus();}} 
        /><br/>
        <button 
        onClick={submitDetails}>add</button>
        </div>
    )
}

export default Add;