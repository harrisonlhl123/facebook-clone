import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import SignUpFormModal from '../SignUpFormModal';
import LoginPageForm from '../LoginFormPage';
import './Navigation.css';
import NewsFeed from '../NewsFeed';
import logo from "../images/logo.png"
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { getUser } from '../../store/users';
import NavSearch from './NavSearch';
import homeButton from "../../components/images/svg/homeButton.svg"
import tvButton from "../../components/images/svg/tvButton.svg"
import marketButton from "../../components/images/svg/marketButton.svg"
import groupButton from "../../components/images/svg/groupButton.svg"
import gamingButton from "../../components/images/svg/gamingButton.svg"


function Navigation() {
  let sessionUser = useSelector(state => state.session.user);
  // const currentUser = useSelector((state) => state.session.user);
  // const userId = sessionUser?.id
  // const user = useSelector(getUser(userId))

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <div id="top-nav">
          <div className="left-section">
            <img src={logo} id="logo" alt="instabook logo" />
            <NavSearch />
          </div>
          <div className='icon'>
            <Link to="/"><img src={homeButton} style={{width: "30px"}}></img></Link>
            {/* <img src={tvButton} style={{width: "30px"}}></img>
            <img src={marketButton} style={{width: "30px"}}></img>
            <img src={groupButton} style={{width: "30px"}}></img>
            <img src={gamingButton} style={{width: "30px"}}></img> */}
          </div>
          <ProfileButton user={sessionUser} />
        </div>
        {/* <NewsFeed /> */}
      </>
    );
  } else {
    sessionLinks = (
      <>
        {/* <LoginPageForm /> */}
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