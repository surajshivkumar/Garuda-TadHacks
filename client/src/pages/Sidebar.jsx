import React from 'react';
import { Link } from 'react-router-dom';
import home from '../images/home.svg'
import analyze from '../images/analyze.svg';
import settings from '../images/settings.svg';
import team from '../images/team.svg';

const Sidebar = ({ isLoggedIn, userRole, onLogout }) => (
    <div className="flex justify-center items-center flex-col h-screen w-100 bg-black">
            <div className="sidebar-icon">
                <Link to="/home">
                    <img
                        src={home}
                        alt="Icon 1"
                        className="sidebar-img w-12 h-12"
                    />
                </Link>
            </div>
            <div className="sidebar-icon m-4">
                <Link to="/analyze">
                    <img
                        src={analyze}
                        alt="Icon 2"
                        className="sidebar-img w-12 h-12"
                    />
                </Link>
            </div>
            <div className="sidebar-icon m-4">
                <Link to="/settings">
                    <img
                        src={settings}
                        alt="Icon 3"
                        className="sidebar-img w-12 h-12"
                    />
                </Link>
            </div>
            <div className="sidebar-icon m-4">
                <Link to="/team">
                    <img
                        src={team}
                        alt="Icon 4"
                        className="sidebar-img w-12 h-12"
                    />
                </Link>
            </div>
        {isLoggedIn && (
            <div className="text-center my-4">
                <p className="text-gray-200">Logged in as: {userRole}</p>
                <button onClick={onLogout} className="mt-4 bg-gray-700 text-white px-2 py-2 rounded">
                    Logout
                </button>
            </div>
        )}
    </div>
);

export default Sidebar;
