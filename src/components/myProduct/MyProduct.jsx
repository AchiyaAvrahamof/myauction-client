import React from 'react'
import { useSelector } from "react-redux";
import ProductCard from '../products/ProductCard';
import "./MyProduct.css"
export default function MyProduct() {
  const products = useSelector((state) => state.product.value);
  const user = useSelector((state) => state.user.value);
  console.log(products);

  return (
    <div>
    <h1>My Products</h1>
     <div className='all'>

     {
       products.map((e,index)=>{
         if (e.ownerUserEmail===user.email) {
           return <div className='allP' key={index}><ProductCard  image={e.image} index={index} productName={e.productName} id={e._id} email={e.ownerUserEmail}/></div>
          } 
          return console.log();
          
        })
      }
      </div>


    </div>
  )
}
