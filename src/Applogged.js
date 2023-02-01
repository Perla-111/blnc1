/*import React, { useEffect, useState } from 'react';
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
    fireDb.child('user').orderByChild("password").equalTo(password).once("value",snapshot=>{
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
        <div className="login-page" 
//Add style file later
style={{backgroundColor:"black",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}
>
        <input type='text'
        placeholder='enter user name' onChange={(e)=>{setName(e.target.value)}} />
        <input type='password' 
        placeholder='enter password'
        onChange={(e)=>{setPassword(e.target.value)}} />
        <button onClick={checkCredentials}>login</button>
        <div/>
      :<App islogged={logged}/>}
    </div>
  );
}

export default AppLogged;
*/

import React, { useEffect, useState } from 'react';
import fireDb from './firebase'
import App from './App';
import { useLayoutEffect } from 'react';

function AppLogged() {


  const [username, setName] = useState('');
  const [password, setPassword] = useState('');
  const [logged, setLogged] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [error, setError] = useState('');
  // useLayoutEffect(()=>{
  //   if(window.confirm('click cancel to proceed')){
  //     setLogged(false);
  //     setToggle(true);
  //   }
  //   else {
  //     setLogged(false);
  //     setToggle(true);
  //   }
  // },[])

  const checkCredentials = () => {
    let path = 'user/';
    fireDb.child(path).orderByChild('password').equalTo(password).on("value", snapshot => {

      if (snapshot.exists()) {
        if (username.toLowerCase() !== 'kalyan'){
           setLogged(false);
        }
        else setLogged(true);
        setToggle(false);
        setError('');

      }
      else {
        console.log('invalid credentials')
        setError('you have typed wrong username and password');
      }
    }
    );
    // let obj ={
    //   username:username,
    //   password:password
    // }
    // fireDb.child(path).push(obj);
  }


  return (
    <div >
      {toggle ?
        <div className="Login" onDoubleClick={checkCredentials} >
          <input type='text'
            placeholder='user name' onChange={(e) => { setName(e.target.value) }} />
          <br />
          <input type='password'
            placeholder='password'
            onChange={(e) => { setPassword(e.target.value) }} />
          <br />
          <button style={{ margin: '1rem', backgroundColor: 'grey' }} onClick={checkCredentials}>login</button>
          <br />
          <div style={{ color: 'grey' }}>{error}</div>
        </div>
        : <App islogged={logged} username={username.toLowerCase()} />}
    </div>
  );
}

export default AppLogged;
