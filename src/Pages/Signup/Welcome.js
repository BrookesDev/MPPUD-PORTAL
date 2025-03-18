import React, { useState, useEffect } from 'react';
import classes from "./Welcome.module.css";
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
import Carousel from "react-bootstrap/Carousel";
import ExampleCarouselImage from "./ExampleCarouselImage";

function Welcome() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedPlan = location.state?.selectedPlan;
  const [activeIndex, setActiveIndex] = useState(0);

  // Function to handle indicator click
  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  const Signupwithemail = () => {
    navigate('/signup');
  }
  const handleLogin = () => {
    navigate('/login');
  }

  return (
    <div>
      <div className={classes.maincontainer}>
        <div className={classes.lftcontainer}>
          <div className={classes.logohead}>
            <img src={logo} alt="Olarms Logo" className={classes.logoimage} />
          </div>

          <Carousel
        activeIndex={activeIndex}
        onSelect={handleSelect}
        controls={false}
        indicators={false} // Disable default indicators
        className={classes.customCarousel}
      >
            <Carousel.Item className={classes.textdown}>
            <h6 className={classes.textdownH}>
                  {" "}
                  Seamless Land <br />
                  Administration Starts Here
                </h6>
                <p className={classes.textdownP}>
                  Welcome to the Ogun State Land Administration <br />
                  and Revenue Management System (OLARMS).
                </p>{" "}
            </Carousel.Item>
            <Carousel.Item className={classes.textdown}>
            <h6 className={classes.textdownH}>
                  {" "}
                  Your Gateway to Owning Land <br />
                  Starts Here!
                </h6>
                <p className={classes.textdownP}>
                Discover the simplicity of land ownership with Ogun State's <br />
                premier Land Administration and Revenue Management System.
                </p>{" "}
            </Carousel.Item>
            <Carousel.Item className={classes.textdown}>
                <h6 className={classes.textdownH}>
                  {" "}
                  Invest in Your Future <br />
                  with Land in Ogun State!
                </h6>
                <p className={classes.textdownP}>
                Unlock seamless access to affordable and secure land <br />
                ownership through Ogun State’s trusted OLARMS.
                </p>{" "}
            </Carousel.Item>
          </Carousel>
      <div className={classes.slidehead4}>
        {[0, 1, 2].map((index) => (
          <span
            key={index}
            onClick={() => handleSelect(index)}
            className={`${classes.indicator} ${
              activeIndex === index ? classes.activeIndicator : ""
            }`}
          ></span>
        ))}
      </div>
        </div>
        <div className={classes.rgtcontainer}>
          <div className={classes.maintext}>
            <h1> Welcome to OLARMS </h1>
            <h6>
              {" "}
              Sign up now to experience seamless land administration.{" "}
            </h6>

            <Button variant="success" className={classes.btngreen} onClick={Signupwithemail}>
              Sign up with email
            </Button>
            <p>
              {" "}
              Already have an account?{" "}
              <span onClick={handleLogin} style={{ color: "#21B55A", cursor: 'pointer' }}> Log in</span>{" "}
            </p>
            <p>
              {" "}
              By Signing up, you agree to our{" "}
              <span style={{ color: "#21B55A" }}> terms of services</span>{" "}
              <br />
              and that you have read our{" "}
              <span style={{ color: "#21B55A" }}>privacy policy</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
