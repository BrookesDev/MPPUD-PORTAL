import React, { useState, useEffect } from "react";
import classes from "./PersonalReg.module.css";
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
import crossedEyeIcon from "../../Assets/crossedEyeIcon.svg";
import errorIcon from "../../Assets/error.svg";
import Carousel from "react-bootstrap/Carousel";

function PersonalReg() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedPlan = location.state?.selectedPlan;
  const [showPassword, setShowPassword] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Function to handle indicator click
  const handleSelect = selectedIndex => {
    setActiveIndex(selectedIndex);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleForgot = () => {
    navigate("/forgot_password");
  };

  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <div>
      <div className={classes.maincontainer}>
        <div className={classes.lftcontainer}>
          <div className={classes.logohead}>
            <img src={logo} alt="Olarms Logo" className={classes.logoimage} />
          </div>

          {/* <Carousel
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
                Discover the simplicity of land ownership with Ogun State's{" "}
                <br />
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
            {[0, 1, 2].map(index => (
              <span
                key={index}
                onClick={() => handleSelect(index)}
                className={`${classes.indicator} ${
                  activeIndex === index ? classes.activeIndicator : ""
                }`}
              ></span>
            ))}
          </div> */}
        </div>
        <div className={classes.rgtcontainer}>
          <div className={classes.maintext}>
            <h1> Personal Information </h1>
            <h6>
              {" "}
              Provide the necessary information to register and manage your land
              administration and property needs seamlessly with OLARMS.{" "}
            </h6>
            <Form.Group>
                        <Form.Label className={classes.inputLabel}>Date of Birth</Form.Label>
                        <Form.Control type="date" placeholder="Enter your email address" className={classes.inputField}/>
                    </Form.Group>
            <Form.Group>
              <Form.Label className={classes.inputLabel}>
                Gender
              </Form.Label>
              <select
                id="user-type"
                name="userType"
                className={`form-select ${classes.optioncss}`} required
              >
                <option value="" selected disabled>
                  Select gender
                </option>
                <option value="Male" >Male</option>
                <option value="Female" >Female</option>
              </select>
            </Form.Group>
            <Form.Group>
              <Form.Label className={classes.inputLabel}>
                Marital Status
              </Form.Label>
              <select
                id="user-type"
                name="userType"
                className={`form-select ${classes.optioncss}`} required
              >
                <option value="" selected disabled>
                  Select marital status
                </option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
            </Form.Group>
            <Form.Group>
                        <Form.Label className={classes.inputLabel}>Residential Address</Form.Label>
                        <Form.Control type="text" placeholder="Enter address" className={classes.inputField} required/>
                    </Form.Group>
            <Form.Group></Form.Group>            
            <Button
              onClick={handleLogin}
              variant="success"
              className={classes.btngreen}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalReg;
