import React from "react";
import logo from "../../Asset/olarmslogoftrlt.png";
import classes from "./SubHeader.module.css";
import back from '../../Asset/back.svg'
import { Navigate, useNavigate } from "react-router-dom";

const SubHeader = () => {
  const navigate = useNavigate()
  const navigateBack = () => {
    navigate(-1)
  }
  return (
    <div className={classes.sticBgBk} >
      <div className={classes.logohead}>
        <img src={logo} alt="Olarms Logo" className={classes.logoimage} />
        <button className={classes.backSvg} onClick={navigateBack}><p className={classes.backText}> ← Go back</p></button>
      </div>
    </div>
  );
};

export default SubHeader;
