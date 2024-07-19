import React from 'react'
import './navbar.css'
import logo from '../../assets/adminlogo.png'

const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={logo} alt="" className="nav-logo" />
        <img src='https://randomuser.me/api/portraits/men/73.jpg 'alt="" className="prof" />
    </div>
  )
}

export default Navbar