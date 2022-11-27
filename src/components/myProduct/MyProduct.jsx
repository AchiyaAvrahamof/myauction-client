import React from 'react'
import { useSelector } from "react-redux";
import ProductCard from '../products/ProductCard';
import "./MyProduct.css"
export default function MyProduct() {
  const products = useSelector((state) => state.product.value);
  const user = useSelector((state) => state.user.value);
  console.log(products);
  let j=0
  return (
    <div>
    <h1>My Products</h1>
     <div className='all'>

     {
       products.map((e,index)=>{
         if (e.ownerUserEmail===user.email) {
            j=1
           return <div className='allP' key={index}><ProductCard  image={e.image} index={index} productName={e.productName} id={e._id} email={e.ownerUserEmail}/></div>
          } 
          return console.log();
          
        })
      }
      {
        j===0? 
           <div>Nothing yet</div>
        :
         console.log()
      }
      </div>


    </div>
  )
}

