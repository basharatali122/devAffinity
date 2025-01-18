import React, { useEffect } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { Navigate, Outlet } from 'react-router-dom'
import Footer from '../../Components/Footer/Footer'
import axios from 'axios'
import {BASE_URL}  from '../../Utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import {addUser} from "../../Utils/userSlice"
import { useNavigate } from 'react-router-dom'
const Body = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store)=>store.user)
const fetchUser = async ()=>{
  if(userData) return;
try {  const res = await axios.get(BASE_URL+"/profile", {
    withCredentials:true,
  }
)
dispatch(addUser(res.data))
}
catch (err){
if(err.status === 401){
  navigate("/login")
}
  console.log(err)
}
}

useEffect(()=>{
  fetchUser();
},[])

  return (
    <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
        </div>
  )
}

export default Body