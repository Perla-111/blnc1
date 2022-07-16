import React,{useEffect, useId, useState} from "react";
import fireDb from '../firebase';
//import {v4 as uuidv4} from 'uuid';

const Edit = ({id,date,setEdittoggle}) => {

    //const [changedate,setChangeDate] = useState('');
    const [amount,setAmount] = useState(111);
    const [note,setNote] = useState('111');
    const [category,setCategory] = useState('111');

    useEffect(()=>{
        const path=`details/_2022/_0722/${id}`;
        fireDb.child(path).on("value",(snapshot)=>{
            if(snapshot.val()!==null) {console.log(snapshot.val());}
    
            else console.log('not working yet')
        })
    },[])

function formatDate(d)
{
    var month = d.getMonth();
    var day = d.getDate().toString().padStart(2, '0');
    var year = d.getFullYear();
    year = year.toString().substr(-2);
    month = (month + 1).toString().padStart(2, '0');
    return `${day}-${month}${year}`;
}

let d = new Date();

const submitDetails= ()=>{
        let obj = {
            id ,
            date:formatDate(d),
            amount,
            note,
            category
        }
        const path=`details/_${d.getFullYear()}/_${obj.date.slice(3)}/${id}`;
        console.log(obj);
        setEdittoggle(false);
      //fireDb.child(path).push(obj);
    }

    return (
        <div>
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
        onClick={submitDetails}>submit</button>
        </div>
    )
}

export default Edit;