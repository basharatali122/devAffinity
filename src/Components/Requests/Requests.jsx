import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../../Utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest, removeRequest } from '../../Utils/resquestsSlice';

const Requests = () => {

    const requests = useSelector((store)=>store.requests)
    const dispatch = useDispatch();




    const reviewRequest= async (status,_id)=>{
      try{

        const res = await axios.post(BASE_URL+"/request/review/"+status+"/"+_id,{},{withCredentials:true})
        dispatch(removeRequest(_id))
      }
      catch (err){
console.log(err.message)
      }
    }

    const fetchRequests = async ()=>{
      try{
        const res = await axios.get(BASE_URL+"/user/requests/recived",{withCredentials:true})

        dispatch(addRequest(res.data.data))
        

      }
      catch (err){
        console.log(err.message)
      }
    }

    useEffect(()=>{
        fetchRequests();
    },[])

    if (!requests) return;
    if (requests.length === 0) return <h1 className='text-center my-10'>No Request found</h1>;
  
  
    return (
      <div className="text-center my-10">
        <h1 className="text-bold text-4xl ">Requests</h1>
  
        {requests.map((request) => {
  
  const {firstName,lastName,age,gender,about,photoUrl,_id}=request.fromUserId;
  
  return(
  <div key={_id} id={_id} className="flex justify-between  items-center m-4 rounded-lg bg-base-300 w-2/3 mx-auto">
    <div>
  <img src={photoUrl} alt="photo" className="w-20 h-20 rounded-full"/>
    </div>
  
    <div className="text-left mx-4">
      <h1 className="font-bold text-xl">{firstName+ "   "+ lastName }</h1>
      {age && gender && <p>{age +"  "+ gender}</p>}
      <p>{about}</p>
    </div>
    <div><button className="btn btn-primary mx-2" onClick={()=> reviewRequest("rejected",request._id)}>reject</button>
    <button className="btn btn-secondary mx-2" onClick={()=>reviewRequest("accepted",request._id)}>accept</button></div>
    </div>
  
  )
  
        })}
        
      </div>
    )
  };

export default Requests