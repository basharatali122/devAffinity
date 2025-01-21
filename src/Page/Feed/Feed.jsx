import axios from 'axios'
import React, { useEffect } from 'react'
import {BASE_URL} from '../../Utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import {addFeed} from '../../Utils/feedSlice'
import Usercard from '../../Components/userCard/Usercard'

const Feed = () => {

  const feed = useSelector((store)=>store.feed)

  const dispatch = useDispatch(); 
 

const getFeed = async ()=>{ 
  if(feed) return;
  try{
    const res = await axios.get(BASE_URL+"/feed",{
      withCredentials:true,
    }) 

    dispatch(addFeed(res?.data))

  }
  catch (err){
  console.log(err)
  }
}

useEffect(()=>{
  getFeed();
},[])


  return feed &&(
    <div className='flex justify-center py-2'>
      <Usercard  user={feed[0]}/>
    </div>
  )
}

export default Feed