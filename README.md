## Admin with react and vite
The admin panel allows the owner to remove a product change the price and choose category. The product api is accessed, with a user friendly interface for easy execution.

Allows user to add a new product to the website and database
```
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

    await fetch('http://localhost:4000/upload',{
      method: 'POST',
      Headers:{
        Accept: 'application/json',
      },
      body:formData,
    }).then((resp)=> resp.json()).then((data)=>{responseData=data})
    if(responseData.success){
      product.image = responseData.image_url;
      console.log(product);

      await fetch('http://localhost:4000/addproduct',{
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
```
Allows user to remove a new product and get all products to the website and database

```const Listproduct = () => {
  
  const[allproducts,setAllProducts] = useState([]);

  const handleProducts = async () =>{
    await fetch('http://localhost:4000/allproducts')
    .then((resp)=>resp.json())
    .then((data)=>setAllProducts(data))
  }

  useEffect(()=>{
    handleProducts();
  },[]);
    
  const removeProduct = async (id) =>{
    await fetch('http://localhost:4000/removeproduct',{
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
```
