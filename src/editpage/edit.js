import React,{useEffect,  useState} from "react";
import fireDb from '../firebase';
//import {v4 as uuidv4} from 'uuid';

const Edit = ({receivedid,date,setEdittoggle,currentpath}) => {

    //const [changedate,setChangeDate] = useState('');
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
                setNote(data[receivedid].note);
                setCategory(data[receivedid].category);
                setId(data[receivedid].id);
            }
    
            else {console.log('not working yet');}
        })
    },[receivedid,currentpath])

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
        let obj={
            id,
            date:formatDate(d),
            amount,
            note,
            category
        }
        let newObj=Object.assign({},{[receivedid]:data});
        const path=`${currentpath}/_${d.getFullYear()}/_${newObj[receivedid].date.slice(3)}/${receivedid}`;
        fireDb.child(path).update(obj);
        setEdittoggle();
      
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