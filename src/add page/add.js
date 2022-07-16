import React,{ useState} from "react";
import fireDb from '../firebase';
import {v4 as uuidv4} from 'uuid';

const Add = ({currentpath}) => {

    //const [date,setDate] = useState('');
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

let d = new Date();

const submitDetails= ()=>{
        let obj = {
            id :uuidv4(),
            date:formatDate(d),
            amount:parseInt(amount),
            note,
            category
        }
        const path=`${currentpath}/_${d.getFullYear()}/_${obj.date.slice(3)}`;
        //console.log(path);

      fireDb.child(path).push(obj);
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
        onClick={submitDetails}>add</button>
        </div>
    )
}

export default Add;