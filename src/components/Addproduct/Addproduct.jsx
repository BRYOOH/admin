import React, { useState } from 'react'
import './addproduct.css'
import upload from '../../assets/upload.png'

const Addproduct = () => {
  
  const[image,setImage] = useState(false);

  const [productDetails,setproductDetails] = useState({
    name:"",
    image:"",
    category:"women",
    new_price: "",
    old_price:""
  });

  const productHandler = (e) =>{
    setproductDetails({...productDetails,[e.target.name]:e.target.value})
  }

  const imageHandler=(e) =>{
      setImage(e.target.files[0]);
  }

  const addProduct = async() =>{
    console.log(productDetails);
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append('product', image);

    await fetch('https://onlineshop-backend-63tt.onrender.com/upload',{
      method: 'POST',
      Headers:{
        Accept: 'application/json',
      },
      body:formData,
    }).then((resp)=> resp.json()).then((data)=>{responseData=data})
    if(responseData.success){
      product.image = responseData.image_url;
      console.log(product);

      await fetch('https://onlineshop-backend-63tt.onrender.com/addproduct',{
         method: 'POST',
         headers:{
          Accept: 'application/json',
          'Content-Type':'application/json',
         },
         body:JSON.stringify(product),
      }).then((resp)=>resp.json()).then((data)=>{
        data.success?alert('Product Added'):alert("Failed");
      })
    }
  }
  return (
    <div className='product'>
      <div className="p-item">
        <p>Product name</p>
        <input value={productDetails.name} onChange={productHandler} type="text" name='name' placeholder='Enter Product name' />
      </div>
      <div className="p-price">
        <div className="p-item">
        <p>Old Price</p>
          <input value={productDetails.old_price} onChange={productHandler} type="text" name='old_price' placeholder='Enter Old price'/>
        </div>
        <div className="p-item">
          <p>Offer price</p>
          <input value={productDetails.new_price} onChange={productHandler} type="text" name='new_price' placeholder='Enter New price'/>
        </div>
      </div>
      <div className="p-item">
        <p>Product Category</p>
        <select value={productDetails.category} onChange={productHandler} name="category" className='addSelector'>
        <option value="women">Women</option>
        <option value="men">Men</option>
        <option value="kids">Kids</option>
        </select> 
      </div>
      <div className="p-item">
        <label htmlFor="file-input">
          <img src={image?URL.createObjectURL(image):upload} className='addImage' alt="" />
        </label>
        <input  onChange={imageHandler} type="file" name='image' id='file-input' hidden/>
      </div>
      <button onClick={()=>{addProduct()}} className='addbutton'> ADD</button>
    </div>
  )
}

export default Addproduct