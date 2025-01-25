import axios from "axios";
import React from "react";
import { BASE_URL } from "../../Utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../../Utils/feedSlice";

const Usercard = ({ user }) => {
  const {  _id ,firstName, lastName, photoUrl, gender, age, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        {
          withCredentials: true,
        }
      );

      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img src={photoUrl} alt="userPhoto" width={350} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {gender && age && <p>{age + " " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            ignore
          </button>
          <button
            className="btn btn-success"
            onClick={() => handleSendRequest("interested", _id)}
          >
            interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default Usercard;
