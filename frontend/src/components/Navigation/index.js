import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import SignUpFormModal from '../SignUpFormModal';
import LoginPageForm from '../LoginFormPage';
import './Navigation.css';
import NewsFeed from '../NewsFeed';
import logo from "../images/logo.png"
import SearchBar from './SearchBar';


function Navigation() {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <div id="top-nav">
          <div className="left-section">
            <img src={logo} id="logo" alt="instabook logo" />
            <SearchBar />
          </div>
          <ProfileButton user={sessionUser} />
        </div>
        {/* <NewsFeed /> */}
      </>
    );
  } else {
    sessionLinks = (
      <>
        <LoginPageForm />
        {/* <SignUpFormModal /> */}
        {/* <NavLink to="/login">Log In</NavLink> */}
      </>
    );
  }

  return (
    <>
      {sessionLinks}
    </>
  );
}

export default Navigation;