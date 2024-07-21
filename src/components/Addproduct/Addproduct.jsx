import React from 'react'
import './addproduct.css'
import upload from '../../assets/upload.png'

const Addproduct = () => {
  return (
    <div className='product'>
      <div className="p-item">
        <p>Product name</p>
        <input type="text" name='name' placeholder='Enter Product name' />
      </div>
      <div className="p-price">
        <div className="p-item">
        <p>Old Price</p>
          <input type="text" name='old price' placeholder='Enter Old price'/>
        </div>
        <div className="p-item">
          <p>Offer price</p>
          <input type="text" name='new price' placeholder='Enter New price'/>
        </div>
      </div>
      <div className="p-item">
        <p>Product Category</p>
        <select name="category" className='addSelector'>
        <option value="women">Women</option>
        <option value="men">Men</option>
        <option value="kids">Kids</option>
        </select>
      </div>
      <div className="p-item">
        <label htmlFor="file-input">
          <img src={upload} className='addImage' alt="" />
        </label>
        <input type="file" name='image' id='file-input' hidden/>
      </div>
      <button className='addbutton'> ADD</button>
    </div>
  )
}

export default Addproduct