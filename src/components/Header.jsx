import React from 'react'
import { useNavigate } from "react-router";
import user from '../service/appwrite/auth';

const Header = () => {
  const nevigate=useNavigate();
  const handleLogout=()=>{
    const res=user.logout();
    if(res){
      console.log("logout succesful" + res);
      useNavigate("/home")
    }

  }
  return (
    <div className='w-full bg-gray-400 h-20 flex gap-3 '>
        <button  className='cursor-pointer' onClick={()=>nevigate('/login')}>login</button>
        <button className='cursor-pointer' onClick={()=>nevigate('/signup')}>signup</button>
        <button className='cursor-pointer' onClick={handleLogout} >logout</button>
    </div>
  )
}

export default Header