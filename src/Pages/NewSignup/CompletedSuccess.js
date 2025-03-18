import React, { useState, useEffect } from "react";
import classes from "./CompletedSuccess.module.css";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
// import { BASE_URL } from "../api/api";
// import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import logo from "../../Assets/olarmsLogo.svg";
import slide from "../../Assets/slide.svg";
import success from "../../Assets/success.svg";
import Carousel from "react-bootstrap/Carousel";
import SubHeader from "../../Components/SubHeader/SubHeader";


function CompletedSuccess() {
  const navigate = useNavigate()
  const location = useLocation();
  const selectedPlan = location.state?.selectedPlan;
  const [activeIndex, setActiveIndex] = useState(0);

  // Function to handle indicator click
  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };


  return (
    <div >
      <div style={{position:"sticky",top:0,zIndex:'1'}}>
      <SubHeader />
     </div>
      <div className={classes.maincontainer}>
      
        <div className={classes.rgtcontainer}>
          <div className={classes.maintext}>
            <img src={success} alt="Olarms Logo" className={classes.successimage} />
            <h1> Your Registration is Complete </h1>
            <br />
            <h6> Thank you for completing your registration! You're now ready to manage your land administration and property needs effortlessly with OLARMS. </h6>
            <Button onClick={() => navigate('/login')} variant="success" className={classes.btngreen}>
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompletedSuccess;
