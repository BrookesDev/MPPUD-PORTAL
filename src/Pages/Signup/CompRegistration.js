import React, { useState, useEffect } from "react";
import classes from "./CompleteRegistration.module.css";
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
import SubHeader from "../../Components/SubHeader/SubHeader";
import { FaUser, FaBuilding } from "react-icons/fa";

function CompRegistration() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");
  const selectedPlan = location.state?.selectedPlan;
  const [showPassword, setShowPassword] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selected, setSelected] = useState(null);

  // Function to handle indicator click
  const handleSelect = selectedIndex => {
    setActiveIndex(selectedIndex);
  };

  // const handleSelect2 = (type) => {
  //   setSelected(type);
  // };

  const handleSelect2 = option => {
    setSelected(option);
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

  const handleNext = () => {
    if (selected === "individual") {
      navigate("/personal_information", { state: { selected } });
    } else if (selected === "corporate") {
      navigate("/coporate_information", { state: { selected } });
    } else {
      alert("Please select an option before proceeding.");
    }
  };

  const isButtonDisabled = !selectedOption;

  return (
    <div>
      <SubHeader />
      <div className={classes.mainbody}>
        <div className={classes.maintext}>
          <h1> Complete Registration </h1>
          <h6> To continue, please complete your registration. </h6>
          <p>
            <b>Select Registration Type</b>
          </p>
          {/* <Form.Group>
              <Form.Label className={classes.inputLabel}>
                Registration Type
              </Form.Label>
              <select
                id="user-type"
                name="userType"
                className={`form-select ${classes.optioncss}`}                
                required 
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                <option value="" selected disabled>
                  Select registration type
                </option>
                <option value="individual" >Individual</option>
                <option value="corporate" >Corporate</option>
              </select>
            </Form.Group> */}

          <div className={classes.NewDiv}>
            <div
              className={`${classes.NewDivL} ${
                selected === "individual" ? classes.selected : ""
              }`}
              onClick={() => handleSelect2("individual")}
            >
              <h6>
                <FaUser style={{ marginRight: "5px", fontSize: "30px" }} />{" "}
                <b style={{ color: "black" }}>Individual Account</b>
              </h6>
            </div>
            <div
              className={`${classes.NewDivR} ${
                selected === "corporate" ? classes.selected : ""
              }`}
              onClick={() => handleSelect2("corporate")}
            >
              <h6>
                <FaBuilding style={{ marginRight: "5px", fontSize: "30px" }} />{" "}
                <b style={{ color: "black" }}>Corporate Account</b>
              </h6>
            </div>
          </div>
          <Button
            disabled={!selected}
            variant="success"
            className={classes.btngreen}
            onClick={handleNext}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CompRegistration;
