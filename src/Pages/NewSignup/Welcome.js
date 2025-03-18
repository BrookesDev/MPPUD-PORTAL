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
import logo from "../../Asset/olarmsLogo.svg";
import slide from "../../Asset/slide.svg";
import Carousel from "react-bootstrap/Carousel";
import ExampleCarouselImage from "./ExampleCarouselImage";
import ogunlogo from "../../Asset/ogunlogonew.svg"


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
          <Row>
            <Col md={2}>
              <img src={ogunlogo} className={classes.logoimage} alt="logo" />
            </Col>
            <Col md={10}>
              <h1
              style={{
                color: 'white',  
                fontSize: '30px',  
                fontWeight: '600',
                fontFamily: 'Inter, sans-serif',
                margin: 0,
              }}>
                Ogun State Budget System
              </h1>
            </Col>
          </Row>
          <Row>
            <Col md={2}>
            </Col>
            <Col md={10}>
            <p
          style={{
            color: 'white', 
            fontSize: '14px',
            fontWeight: '400',
            fontFamily: 'Inter, sans-serif',
            textAlign: 'center',
            margin: 0,
          }}>
            Effortless Budget Management: Request, Track, and<br />Approve with Ease
          </p>
            </Col>
          </Row>
        </div>
        <div className={classes.rgtcontainer}>
          <div className={classes.maintext}>
            <h1> Welcome to <span style={{ color: "#21B55A" }}>OLARMS</span>  </h1>
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
