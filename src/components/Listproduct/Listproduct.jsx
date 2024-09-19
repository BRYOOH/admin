import React, { useEffect, useState } from 'react'
import './listproduct.css'
import remove from '../../assets/icons/remove.png'

const Listproduct = () => {
  
  const[allproducts,setAllProducts] = useState([]);

  const handleProducts = async () =>{
    await fetch('https://onlineshop-backend-63tt.onrender.com/allproducts')
    .then((resp)=>resp.json())
    .then((data)=>setAllProducts(data))
  }

  useEffect(()=>{
    handleProducts();
  },[]);
    
  const removeProduct = async (id) =>{
    await fetch('https://onlineshop-backend-63tt.onrender.com/removeproduct',{
      method: 'POST',
      headers: {
        Accept:'application/json',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({id:id})
    })
    await handleProducts();
  }
  
  return (
    <div className='listP'>
      <h1>List of Products</h1>
      <div className="main-format">
        <p>Products</p>
        <p>Title</p>
        <p>Old price</p>
        <p>New price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="allProducts">
        <hr />
     
        {allproducts.map((product,index)=>{
           return <>
           <div key={index} className="main-format productFormat">
            <img src={product.image} alt="" className="listImage" />
            <p>{product.name}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <img onClick={()=>{removeProduct(product.id)}} src={remove} alt="" className="iconRemove" />
           </div> 
           <hr />
           </>
        })}

      </div>
    </div>
  )
}

export default Listproduct