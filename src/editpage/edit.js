import React,{useEffect, useId, useState} from "react";
import fireDb from '../firebase';
//import {v4 as uuidv4} from 'uuid';

const Edit = ({receivedid,date,setEdittoggle}) => {

    //const [changedate,setChangeDate] = useState('');
    const [amount,setAmount] = useState('');
    const [id,setId] = useState('');
    const [note,setNote] = useState('');
    const [category,setCategory] = useState('');

    useEffect(()=>{
        const path=`details/_2022/_0722/${receivedid}`;
        fireDb.child(path).on("value",(snapshot)=>{
            if(snapshot.val()!==null) {
                let data=snapshot.val();
                setAmount(data.amount);
                setNote(data.note);
                setCategory(data.category);
                setId(data.id);
                console.log(snapshot.val());}
    
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
        let obj=Object.assign({},[receivedid]={
            id,
            date:formatDate(d),
            amount,
            note,
            category
        })
        
        const path=`details/_${d.getFullYear()}/_${obj.date.slice(3)}/`;
        console.log(obj);
        //fireDb.child(path).push(obj);
        setEdittoggle(false);
      
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
        onClick={submitDetails}>edit</button>
        </div>
    )
}

export default Edit;