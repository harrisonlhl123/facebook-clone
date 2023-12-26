import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  
  const openMenu = (e) => {
    e.preventDefault();

    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      e.preventDefault();
      
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <div className="profile-button-container">
      <button onClick={openMenu}>
        <div>
          <img src={`${user?.pfp}`} id="small-profile-pic"/>
        </div>
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <div className="user-container">
            <Link to={`/users/${user?.id}`} className="user-link">
            <img src={`${user?.pfp}`} id="small-profile-pic" alt="Profile" />
              <li>{`${user?.firstName} ${user?.lastName}`}</li>
            </Link>
          </div>
          <li>
            <button onClick={logout} id="logout-button">Log Out</button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;
