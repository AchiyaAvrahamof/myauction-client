import './Products.css';
import Product from '../product/Product';
import axios from 'axios'
import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import {useSelector} from 'react-redux'
import {useDispatch} from "react-redux"
import{setProducts} from '../../features/prodacts'
import {  Routes, Route } from "react-router-dom";
import AddProduct from '../addproduct/AddProduct';
import { Link } from 'react-router-dom';
import {  Button, FormLabel, Grid, Input, InputLabel, TextField } from '@mui/material'
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
function Products() {
  const dispatch=useDispatch()
  const user= useSelector((state)=> state.user.value)
  const [Type, setType] = useState('');
  const [allData,setAllData]=useState([])

  const handleChange = (event) => {
    setType(event.target.value);
  };
  const getProductD = () => {
    axios.get('/api/auction')
    .then((res) => {
      res.data && setAllData([...res.data])
      dispatch(setProducts(allData))
    })
  }
  
    useEffect(()=>{
        getProductD()
        
       })

  return (
    <div className="App all">
      <Routes>
      <Route path='Product' element={ <Product/>} />   
      <Route path='AddP' element={ <AddProduct/>} />
     </Routes>

     <FormControl required sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-required-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={Type}
          label="Age *"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"phone"}>phone</MenuItem>
          <MenuItem value={"cameras"}>cameras</MenuItem>
          <MenuItem value={"computers"}>computers</MenuItem>
        </Select>
        <FormHelperText>Required</FormHelperText>
        </FormControl>
      <div className="selectorWProduct">
        {
       allData.map((e,index)=>{
          if (e.Type==Type) {
            
            return <div className='allP' key={index}><ProductCard  image={e.image} index={index} productName={e.productName} id={e._id} email={e.ownerUserEmail}/></div>
          } 
          if (Type=="") {
            return <div className='allP' key={index}><ProductCard  image={e.image} index={index} productName={e.productName} id={e._id} email={e.ownerUserEmail}/></div>
            
          }   
         
       })
      }
      </div>
      
    </div>
  );
}

export default Products;