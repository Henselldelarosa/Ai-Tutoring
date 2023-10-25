import React from 'react'
import './Navbar.css'
import DropDown from '../buttons/dropDown/DropDown'

const Navbar = ({isLoaded, sessionUser}) => {
  let content = (
    <div className='navbar'>
      <div className="navar__wrapper">

        <div className="navar__left">
          <img
          src="images/LoginLogo.png"
          alt=""
          className="navar__left--logo"
          />
          <h1 className='navbar__left--title'>Course Correct</h1>
        </div>

        <div className="navbar__right">
          <h1 className="navbar__right--username">{sessionUser?.username}</h1>
          <DropDown/>
        </div>
      </div>
    </div>
  )
  return (content, isLoaded)
}

export default Navbar
