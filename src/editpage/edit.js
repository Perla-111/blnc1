import React,{useEffect, useId, useState} from "react";
import fireDb from '../firebase';
//import {v4 as uuidv4} from 'uuid';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const Edit = ({receivedid,receiveddate,setEdittoggle,currentpath}) => {


    const dateref = React.useRef(null);
    const [startDate,setStartDate] = useState(new Date(receiveddate));
    const [date,setDate] = useState('');
    const [amount,setAmount] = useState('');
    const [id,setId] = useState('');
    const [note,setNote] = useState('');
    const [category,setCategory] = useState('');
    const [data,setData]=useState({});

    useEffect(()=>{
        //const path=`details/_2022/_0722/${receivedid}`;
        const path=`${currentpath}/_2022/_0722/`;
        fireDb.child(path).on("value",(snapshot)=>{
            if(snapshot.val()!==null) {
                let data=snapshot.val();
                setData(data[receivedid]);
                setAmount(data[receivedid].amount);
                setDate(data[receivedid].date);
                setNote(data[receivedid].note);
                setCategory(data[receivedid].category);
                setId(data[receivedid].id);
            }
    
            else {console.log('not working yet');}
        })
    },[receivedid])

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
        let obj={
            id,
            date:formatDate(dateref.current.props.selected)||date,
            amount:parseInt(amount),
            note,
            category
        }
        let newObj=Object.assign({},{[receivedid]:data});
        const path=`${currentpath}/_${d.getFullYear()}/_${newObj[receivedid].date.slice(3)}/${receivedid}`;
        //console.log(obj,newObj,path)
        //console.log(dateref.current.props);
        fireDb.child(path).update(obj);
        fireDb.child('lastupdate/date/').update({date:getDate(d)});
        
        setEdittoggle();
      
    }

    return (
        <div>
            <DatePicker ref={dateref} selected={startDate} onChange={(date) => {
                //console.log(startDate);
                setStartDate(date)}} />
            {/* <input type='text' 
        placeholder='dd-mmyy date'
        value={date}
        onChange={(e)=>{setDate(e.target.value)}}
        /><br/> */}
        <input type='number' 
        placeholder='enter amount'
        value={amount}
        onChange={(e)=>{setAmount(e.target.value)}}
        /><br/>
        <input type='text' 
        placeholder='enter the reason'
        value={note}
        onChange={(e)=>{setNote(e.target.value)}}
        /><br/>
        <input type='text' 
        placeholder='enter person name or bill type'
        value={category}
        onChange={(e)=>{setCategory(e.target.value)}} 
        /><br/>
        <button 
        onClick={submitDetails}>edit</button>
        </div>
    )
}

export default Edit;