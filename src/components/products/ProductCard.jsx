import './Products.css';
import axios from 'axios'
import { useEffect, useState } from 'react';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';
import {useDispatch} from "react-redux"
import{setProductIndex} from '../../features/productIndex'
import {useSelector} from 'react-redux'

function ProductCard(props) {
  const user= useSelector((state)=> state.user.value)
  const dispatch=useDispatch()
const deleteProduct=(id)=>{
  axios.delete(`/api/auction/${id}`).then()

}
  return (
    <div className="App">
      <Card sx={{ maxWidth: 350 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.productName}
          </Typography>
         
        </CardContent>
      <CardActionArea>
        <CardMedia
          component="img"
          height="250"
          width="20"
          image={props.image}
          alt="green iguana"
        />
      </CardActionArea>
      <CardActions>
        <Link to={`/Product`} onClick={()=>dispatch(setProductIndex(props.index))}>
        <Button size="small" color="primary">
          show
        </Button>
        </Link>
        {user.email==props.email?
        <Button size="small" color="primary" onClick={()=>deleteProduct(props.id)}>
          delete
        </Button>
        :console.log()
        }
      </CardActions>
    </Card>
    </div>
  );
}

export default ProductCard;