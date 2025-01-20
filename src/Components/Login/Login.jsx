
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../../Utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../Utils/constants';

const Login = () => {
  const [emailId, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError]=useState('')
  const despatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogin = async () => {
try{const res = await axios.post(BASE_URL+"/login",{
  emailId,
  password,
},{withCredentials:true})

despatch(addUser(res.data))

navigate("/feed")
}

catch (err){
  setError(err?.response?.data||"something went wrong")
}
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <label className="form-control w-full max-w-xs m-2">
            <div className="label">
              <span className="label-text">Email ID</span>
            </div>
            <input
              type="text"
              value={emailId}
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </label>
          <label className="form-control w-full max-w-xs m-2">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              type="password"
              value={password}
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </label>
          <p className='text-red-500'>{error}</p>
          <div className="card-actions justify-center m-2">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
