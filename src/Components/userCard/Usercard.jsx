import React from 'react'

const Usercard = ({user}) => {
    const {firstName,lastName,photoUrl,gender,age,about}=user;
    console.log(user)
  return (
    <div className="card bg-base-300 w-96 shadow-xl">
    <figure>
      <img
        src={photoUrl}
        alt="userPhoto" width={350} />
    </figure>
    <div className="card-body">
      <h2 className="card-title">{firstName + " "+ lastName}</h2>
      {gender && age && <p>{age + " "+ gender}</p> }
      <p>{about}</p>
      <div className="card-actions justify-center">
        <button className="btn btn-primary">ignore</button>
        <button className="btn btn-success">interested</button>
      </div>
    </div>
  </div>
  )
}

export default Usercard