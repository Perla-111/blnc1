import React from "react";
import fireDb from '../firebase';

const Add = () => {

    const [date,setDate] = useState('');
    const [amount,setAmount] = useState(0);
    const [note,setNote] = useState('');
    const [category,setCategory] = useState('');
    
    const submitDetails= ()=>{
      
    }

    return (
        <div>
        <input type='text' 
        placeholder='enter date in dd/mm/yy format'
        value={date}
        onChange={(e)=>{setDate(e.target.value)}}
        /><br/>
        <input type='text' 
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

export default Add;