import React from 'react'
import { useNavigate } from "react-router";
import classes from './Welly.module.css'
import back from '../../Asset/back.png'
import mWR from '../../Asset/mWR 2.svg'
import bank from '../../Asset/bank.png'
const Welcome = () => {
  const navigate = useNavigate();
  const moveToFill = () => {
    navigate('/Fill')
  }

  const handleProcessClick = () => {
    navigate('/Process');
  };

  return (
    <div className={classes.main}>

      <div className={classes.block}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '700', fontFamily: 'Inter,sans-serif', paddingTop: '24px' }}>Welcome to <span style={{ color: "#32C478F0" }}> OGBS </span></h1>
          <p style={{ color: '#667185', fontSize: '20px', fontWeight: '400', fontFamily: 'Inter,sans-serif', paddingTop: '5px' }}>Create Account and Effortlessly manage Budget<br /> Management.</p>

          <div className={classes.form}>

          </div>

          <div className={classes.but}>
            <button onClick={moveToFill} type="submit">Create Account</button>
          </div>
          <p style={{ color: 'black', fontWeight: '380', fontFamily: 'Inter, sans-serif', paddingTop: '10px', fontSize: '18px' }}>
            Already have an account?
            <span
              onClick={handleProcessClick}
              style={{ color: '#32C478F0', textDecoration: 'none', cursor: 'pointer' }}>
              Log in
            </span>
          </p>

          <p style={{ color: 'black', fontWeight: '380', fontFamily: 'Inter, sans-serif', paddingTop: '10px', fontSize: '18px', marginBottom: '2px' }}>
            By Signing up, you agree to our <span style={{ color: "#32C478F0" }}>terms of services </span> and that you </p>
          <p style={{ color: 'black', fontWeight: '380', fontFamily: 'Inter, sans-serif', fontSize: '18px', marginTop: '0' }}>
            have read our <span style={{ color: "#32C478F0" }}>privacy policy</span></p>
        </div>
      </div>
      <div className={classes.contain}>
        <div className={classes.logs}>
          <img src={mWR} className={classes.mWR} />
          <img src={bank} className={classes.bank} />
          <img src={back} className={classes.back} alt="Background" />
          <h1 style={{
    position: 'absolute',
    top: '18%',  
    right: '27%',  // Move the h1 to the right
    transform: 'translate(50%, -50%)',
    color: 'white',
    fontSize: '35px',
    fontWeight: '700',
    fontFamily: 'Inter, sans-serif'
  }}>
    MPPUD PORTAL
  </h1>
  
  {/* Move the p to the right */}
  <p style={{
    position: 'absolute',
    top: '23%', // Slightly below h1
    right: '25%',  // Move the p to the right as well
    transform: 'translateX(50%)',
    color: 'white',  // Ensure text is white
    fontSize: '14px',
    fontWeight: '400',
    fontFamily: 'Inter, sans-serif',
    textAlign: 'center'
  }}>
    Effortless Budget Management: Request, Track, and<br />Approve with Ease
  </p>

        </div>

      </div>
    </div>

  );
}

export default Welcome