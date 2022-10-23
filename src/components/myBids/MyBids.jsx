import React from 'react'
import { useSelector } from "react-redux";
import ProductCard from '../products/ProductCard';
import "./MyBids.css"
export default function MyBids() {
  const products = useSelector((state) => state.product.value);
  const user = useSelector((state) => state.user.value);
  
  const TimeWin=(e)=>{


      var countDownDate = new Date(e?.howMachTime).getTime();
    
      // Update the count down every 1 second
          // Get today's date and time
          var now = new Date().getTime();
    
          // Find the distance between now and the count down date
          var distance = countDownDate - now;
    
          // Time calculations for days, hours, minutes and seconds
          var days = Math.floor(distance / (1000 * 60 * 60 * 24));
          var hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
          console.log(days+hours+minutes+seconds); 
          // If the count down is over, write some text
          if (distance < 0) {
           return 0
          }
  }
    
  return (
    <div>
    <h1>My Bids</h1>
     <div className='all'>
        <div>

      <h2>Currently competing</h2>
     {
       products.map((e,index)=>{
        let lengthOBited = 0;
        lengthOBited = e.Bited.length - 1;
        let LastBider 
        if (e.ownerUserEmail!==user.email) {

        if (lengthOBited >= 0) {
          LastBider = Object.keys(e?.Bited[lengthOBited])[0];
          if(LastBider===user.email){  
            let ifTimeEnd=TimeWin(e)
            if(ifTimeEnd!==0){
                 return <div className='allP' key={index}><ProductCard  image={e.image} index={index} productName={e.productName} id={e._id} email={e.ownerUserEmail}/></div>
        }}} 
          return console.log();
        
        }
      return console.log();
      })
      }
        </div>
      <div className='won'>
        <h2> Your winning</h2>
      {
       products.map((e,index)=>{
        let lengthOBited = 0;
        lengthOBited = e.Bited.length - 1;
        let LastBider 
        if (e.ownerUserEmail!==user.email) {

        if (lengthOBited >= 0) {
          LastBider = Object.keys(e?.Bited[lengthOBited])[0];
          if(LastBider===user.email){  
            let ifTimeEnd=TimeWin(e)
            if(ifTimeEnd===0){
                return <div className='allP' key={index}><ProductCard  image={e.image} index={index} productName={e.productName} id={e._id} email={e.ownerUserEmail}/></div>
            }    
          }} 
          return console.log();
          
        }
        return console.log();
        
      })
      }
      </div>
      </div>
      

    </div>
  )
}
