import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../Utils/constants';
import { removeUser } from '../../Utils/userSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/signout`, {}, { withCredentials: true });
      dispatch(removeUser());
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="bg-base-300 shadow-md w-full">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/feed" className="text-2xl font-bold text-primary hover:text-primary-focus transition">
          devAffinity
        </Link>

        {user && (
          <div className="flex items-center gap-4">
            <p className="text-sm font-medium text-gray-600">Welcome, {user.firstName}</p>

            <div className="relative dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 h-10 rounded-full border border-gray-300 overflow-hidden">
                  <img
                    alt="User Avatar"
                    src={user.photoUrl || "/default-avatar.png"}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content right-0 mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-[50]"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile <span className="badge badge-info">New</span>
                  </Link>
                </li>
                <li><Link to="/connections">Connections</Link></li>
                <li><Link to="/requests">Requests</Link></li>
                <li>
                  <button onClick={handleLogout} className="text-left w-full">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
