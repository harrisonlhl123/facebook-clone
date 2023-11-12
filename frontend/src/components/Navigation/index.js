import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import SignUpFormModal from '../SignUpFormModal';
import LoginPageForm from '../LoginFormPage';
import './Navigation.css';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
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