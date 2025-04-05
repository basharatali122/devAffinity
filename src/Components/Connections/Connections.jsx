import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../../Utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../../Utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);

  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(res.data.data));
    } catch (err) {}
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0) return <h1>No Connections found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-4xl">Connections</h1>

      {connections.map((connection) => {
        const { firstName, lastName, age, gender, about, photoUrl, _id } =
          connection;

        return (
          <div
            key={_id}
            className="flex m-4 rounded-lg bg-base-300 w-1/2 mx-auto"
          >
            <div>
              <img
                src={photoUrl}
                alt="photo"
                className="w-20 h-20 rounded-full"
              />
            </div>

            <div className="text-left mx-4">
              <h1 className="font-bold text-xl">
                {firstName + "   " + lastName}
              </h1>
              {age && gender && <p>{age + "  " + gender}</p>}
              <p>{about}</p>
            </div>

           <Link to={"/chat/"+_id}> <button className="btn btn-success mt-3">Chat</button></Link>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
