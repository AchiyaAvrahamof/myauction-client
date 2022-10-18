import "./product.css";
import Grid from "@mui/material/Grid";
import { Button, Input, InputLabel, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
function Product(props) {
  const products = useSelector((state) => state.product.value);
  const productIndex = useSelector((state) => state.productIndex.value);
  const user = useSelector((state) => state.user.value);
  const [bitsegested, setBitsegested] = useState("0");
  const [TimeE, setTimeE] = useState("2022-10-16T15:45");
  const [timeLeft, setTimeLeft] = useState("");
  console.log(products);
  const navigate = useNavigate();

  let lengthOBited = 0;
  lengthOBited = products[productIndex]?.Bited.length - 1;
  let LastBid = products[productIndex]?.startBit;
  if (lengthOBited >= 0) {
    LastBid = Object.values(products[productIndex]?.Bited[lengthOBited])[0];
  }
  const submited = () => {
    console.log({ email: user.email, bit: bitsegested });
    if (bitsegested > LastBid) {
      if (LastBid < 100 && bitsegested - LastBid >= 5) {
        const res = axios.patch(
          `http://localhost:5000/api/auction/${products[productIndex]?._id}`,
          { email: user.email, bit: bitsegested }
        );
        alert("You bade");
        return navigate("/Products");
      }
      if (LastBid < 1000 && LastBid > 100 && bitsegested - LastBid >= 10) {
        const res = axios.patch(
          `http://localhost:5000/api/auction/${products[productIndex]?._id}`,
          { email: user.email, bit: bitsegested }
        );
        alert("You bade");
        return navigate("/Products");
      }
      if (LastBid > 1000 && bitsegested - LastBid >= 20) {
        const res = axios.patch(
          `http://localhost:5000/api/auction/${products[productIndex]?._id}`,
          { email: user.email, bit: bitsegested }
        );
        alert("Submited");
        return navigate("/Products");
      } else {
        alert(
          "for product under 100 you need at least to add 5 more from the last segested. up to 1000 you need at least 10. more then 1000 you need at least 20 more"
        );
      }
    } else {
      alert("The bit is to low");
    }
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // Set the date we're counting down to
  var countDownDate = new Date(products[productIndex]?.howMachTime).getTime();

  // Update the count down every 1 second
  useEffect(() => {
    var x = setInterval(function () {
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

      // Output the result
      setTimeLeft(days + "d " + hours + "h " + minutes + "m " + seconds + "s ");

      // If the count down is over, write some text
      if (distance < 0) {
        clearInterval(x);
        console.log("end");
        setTimeLeft("Time ended");
      }
    }, 1000);
  }, []);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  let BidWinnner = Object.values(products[productIndex]?.Bited[lengthOBited])[0]
  let emailWinnner = Object.keys(products[productIndex]?.Bited[lengthOBited])[0]

  return (
    <div>
      <h1>{products[productIndex]?.productName}</h1>
      <Grid container spacing={2}>
        <Grid className="imgAndDis">
          <Grid item xs={4}>
            <img
              src={products[productIndex]?.image}
              width={"50%"}
              alt="productimg"
            />
          </Grid>
          <Grid item h6 xs={5}>
            <h3>Description</h3>

            <p>{products[productIndex]?.description}</p>
          </Grid>
        </Grid>
        <Grid item xs={12} className="DateAndPrice">
          <Grid h6 xs={4}>
            <InputLabel>
              Date start
              <Input
                type="datetime-local"
                value={`${products[productIndex]?.datestart}`}
              ></Input>
            </InputLabel>
            <InputLabel>
              Date end
              <Input
                type="datetime-local"
                value={`${products[productIndex]?.howMachTime}`}
              ></Input>
            </InputLabel>
            Time left
            <p>{timeLeft}</p>
          </Grid>
          <Grid item h6 xs={8}>
            <InputLabel>
              Bit start
              <Input
                name="startpricing"
                value={`${products[productIndex]?.startBit}`}
              ></Input>
            </InputLabel>
            <InputLabel>
              Courect Bit
              <Input name="lastpricing" value={`${LastBid}`}></Input>
            </InputLabel>
            <InputLabel>
              Bits until now
              <Input name="lastpricing" value={`${lengthOBited}`}></Input>
            </InputLabel>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} className="offerBTMGrid">
        {user.email != products[productIndex]?.ownerUserEmail &&
        timeLeft != "Time ended" ? (
          <Button className="offerBTM" onClick={() => submited()}>
            make an offer
          </Button>
        ) : (
          console.log()
        )}
        {user.email != products[productIndex]?.ownerUserEmail &&
        timeLeft != "Time ended" ? (
          <Input
            placeholder="0"
            type="number"
            className="inputBid"
            onWheel={(e) => e.target.blur()}
            onChange={(e) => setBitsegested(e.target.value)}
          ></Input>
        ) : (
          console.log()
        )}
        {timeLeft == "Time ended" ? <p>The sell is end </p> : console.log()}
        {timeLeft == "Time ended" &&
        user.email == products[productIndex]?.ownerUserEmail ? (
          <div>
            <Button onClick={handleOpen}>Get winner</Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
            >
              <Box sx={{ ...style, width: 400 }}>
                <h2 id="parent-modal-title">The winner is:</h2>
                <p id="parent-modal-description">
                  email:
                  {
                    emailWinnner
                    
                  }
                  <br />
                 bid:
                  {
                    BidWinnner
                  }
                </p>
              </Box>
            </Modal>
          </div>
        ) : (
          console.log()
        )}
      </Grid>
    </div>
  );
}

export default Product;
