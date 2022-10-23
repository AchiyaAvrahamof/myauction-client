import {  Button, FormLabel, InputLabel, TextField } from '@mui/material'
import React, { useState } from 'react'
import "./AddProduct.css"
import Axios from 'axios'
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useSelector} from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [imageSelected, setImageSelected] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [Type, setType] = useState('');

  const [ProductN, setProductN] = useState("")
  const [Description, setDescription] = useState("")
  const [dayStart, setDayStart] = useState("")
  const [howmachdays, sethowmachdays] = useState("")
  const [StartBit, setStartBit] = useState("")
  const [submited, setSubmited] = useState(false)
  const user= useSelector((state)=> state.user.value)
  const navigate = useNavigate();


  const state = [{
    image: imageUrl,
    description: Description,
    startBit: StartBit,
    courentBit:StartBit, 
    datestart: dayStart,
    howMachTime: howmachdays,
    Bited:[{[`${user.email}`]:StartBit}],
    ownerUserEmail:user.email,
    Type: Type,
    productName: ProductN,
   
  }]

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const uploadImage = () => {
    const formData = new FormData()
    formData.append('file', imageSelected)
    formData.append('upload_preset', "gizlgebs")

    Axios.post("https://api.cloudinary.com/v1_1/dptzubs72/image/upload", formData)
      .then((response) => setImageUrl(response.data.secure_url))
    console.log("secccsed upload image");
  }
  const postProduct = (report) => {
    axios.post('/api/auction', report)
      .then(console.log(report))
  }
  const submit = () => {
    uploadImage()
    setSubmited(true)

  }
  useEffect(()=>{
    if(submited!==false){
      postProduct(state)
      alert("הדיווח נשלח")
      return navigate("/Products")
    }
  },[imageUrl])
  return (
    <div>
        <div className='allForm'>
          <h2>
            Add product
          </h2> 
        <TextField label={'Product name'} id="margin-normal" margin="normal" onChange={(e) => setProductN(e.target.value)}/>
         
        <TextField id="outlined-multiline-static" label="Description" multiline rows={2} onChange={(e) => setDescription(e.target.value)}/>
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
        <FormLabel >
        Day start
        <TextField id="margin-normal" margin="normal" type="datetime-local" onChange={(e) => setDayStart(e.target.value)}/>
        </FormLabel>
        <FormLabel >
        for how much days?
        <TextField  id="margin-normal" margin="normal" type={"datetime-local"} onChange={(e) => sethowmachdays(e.target.value)}/>
        </FormLabel>

        <TextField label={'Start price'} id="margin-normal" margin="normal" type={"number"} onChange={(e) => setStartBit(e.target.value)}/>
        <FormLabel>
        photo
        <TextField  id="margin-normal" margin="normal" type={"file"} onChange={(event) => setImageSelected(event.target.files[0])} />
        </FormLabel>
          <Button onClick={()=>submit()}>Add product</Button>
          <Link to="/Products">Back</Link>

        </div>

    </div>
  )
}
