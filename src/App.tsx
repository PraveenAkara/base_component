import React,{useEffect, useState} from 'react'
import './App.css';
import Login from './component/login/Login';
import Home from './component/content/Home';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

export interface Information {
  setToken:string ;

}
function App() {
const [token,setToken]=useState<any>("")




useEffect(()=>{
  const token :any= localStorage.getItem("auth")
  setToken(token)

 

},[token])





  return (
  
   <React.Fragment>
   
{
  token ===null ? <Login setToken={setToken}/>:<Home setToken={setToken}/>
}
   
   

   

  
   </React.Fragment>
  );
}

export default App;
