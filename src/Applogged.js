import React, { useEffect, useState } from 'react';
import fireDb from './firebase';
import App from './App';

function AppLogged() {

  
  const [username, setName] = useState('');
  const [password, setPassword] = useState('');
  const [logged, setLogged] = useState(false);
  const [toggle,setToggle] = useState(false);
  useEffect(()=>{
    if(window.confirm('click cancle to proceed')){
      setLogged(true);
      setToggle(true);
    }
    else {
      setLogged(false);
      setToggle(false);
    }
  },[])

  function checkCredentials(){
    fireDb.child('user').orderByChild("password").equalTo(password)
    .once("value",snapshot=>{
      if (snapshot.exists()){
        setLogged(true);
        setToggle(false);
      }
      else{
        alert('invalid credentials')
      }
    }
      )
  }
  

  return (
    <div className="Login">
      {toggle?
        < >
        <input type='text'
        value={username}
        placeholder='enter user name' onChange={(e)=>{setName(e.target.value)}} />
        <input type='password' 
        placeholder='enter password'
        value={password}
        onChange={(e)=>{setPassword(e.target.value)}} />
        <button onClick={checkCredentials}>login</button>
        </>
      :<App islogged={logged}/>}
    </div>
  );
}

export default AppLogged;
