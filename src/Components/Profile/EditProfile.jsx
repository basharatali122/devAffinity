import React, { useState } from 'react'
import Usercard from '../userCard/Usercard';
import axios from 'axios';
import { BASE_URL } from '../../Utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../../Utils/userSlice';

const EditProfile = ({user}) => {
    const [firstName, setFirstName]=useState(user.firstName);
    const [lastName,setLastName]=useState(user.lastName);
    const [photoUrl,setPhotoUrl]=useState(user.photoUrl);
    const [age,setAge]=useState(user.age);
    const [about,setAbout]=useState(user.about);
    const [gender,setGender]=useState(user.gender);
    const [error,setError]=useState("")

    const [showToast,setShowToast]=useState(false)

    const dispatch = useDispatch();


    const saveProfile= async()=>{

      setError("")
        try{

            const res = await axios.patch(BASE_URL+"/profile/edit",{firstName,lastName,age,gender,about,photoUrl},{withCredentials:true})

            dispatch(addUser(res?.data?.data))

            setShowToast(true)

            setTimeout(()=>{
              setShowToast(false)
            },3000)
            

        }
        catch (err){
            setError(err.response.data)
        }
    }



  return (
    <>
    <div className='flex justify-center my-2 mb-16'>
    <div className="flex justify-center mx-5">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Edit Profile</h2>
          <label className="form-control w-full max-w-xs ">
            <div className="label">
              <span className="label-text">First Name</span>
            </div>
            <input
              type="text"
              value={firstName}
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setFirstName(e.target.value)}
             
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Last Name</span>
            </div>
            <input
              type="text"
              value={lastName}
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setLastName(e.target.value)}
             
            />
          </label>

          <label className="form-control w-full max-w-xs ">
            <div className="label">
              <span className="label-text">Photo Url</span>
            </div>
            <input
              type="text"
              value={photoUrl}
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setPhotoUrl(e.target.value)}
             
            />
          </label>
         
          <label className="form-control w-full max-w-xs ">
            <div className="label">
              <span className="label-text">Age</span>
            </div>
            <input
              type="text"
              value={age}
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setAge(e.target.value)}
             
            />
          </label>

          <label className="form-control w-full max-w-xs ">
            <div className="label">
              <span className="label-text">About</span>
            </div>
            <input
              type="text"
              value={about}
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setAbout(e.target.value)}
             
            />
          </label>

          <label className="form-control w-full max-w-xs ">
            <div className="label">
              <span className="label-text">Gender</span>
            </div>
            <input
              type="text"
              value={gender}
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setGender(e.target.value)}
             
            />
          </label>
          <p className='text-red-500'>{error}</p>
          <div className="card-actions justify-center ">
            <button className="btn btn-primary"onClick={saveProfile} >
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </div>

    <Usercard user={{firstName,lastName,age,gender,about,photoUrl}}/>
    </div>

{showToast&&<div className="toast toast-top toast-center">
 
  <div className="alert alert-success">
    <span>Profile saved successfully.</span>
  </div>
</div>}
    </>
  )
}

export default EditProfile