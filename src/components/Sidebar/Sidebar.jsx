import React from 'react'
import './sidebar.css'
import {Link} from 'react-router-dom'
import add from '../../assets/addproduct.png'
import list from '../../assets/listproduct.png'

const Sidebar = () => {
  return (
    <div className='Sidebar'>
      <Link to={'/addproduct'} style={{textDecoration:"none"}}>
      <div className="s-item">
       <img src={add} alt="" />
       <p>Add product</p>
      </div>
      </Link>
      <Link to={'/listproduct'} style={{textDecoration:"none"}}>
      <div className="s-item">
       <img src={list} alt="" />
       <p>Product list</p>
      </div>
      </Link>
    </div>
  )
}

export default Sidebar