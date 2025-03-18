import React from 'react';
import { useNavigate,useState } from "react-router";
import classes from './Create.module.css'
import back from '../../Asset/back.png'
import mWR from '../../Asset/mWR 2.svg'

const Create = () => {

  const navigate = useNavigate();
  const moveToAccount = () => {
    navigate('/Account')
  }
  
  const handleLoginClick = () => {
    navigate('/login'); // Navigate to login page
  };
  

  return (
    <div className={classes.main}>
      <div className={classes.contain}>

        <div className='logs'>
          <img src={mWR} className={classes.mWR} />
          <img src={back} className={classes.back} alt="Background" />
          <h1 style={{
            position: 'absolute',
            top: '40%',
            left: '23%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontSize: '35px',
            fontWeight: '700',
            fontFamily: 'Inter, sans-serif'
          }}>
            Ogun State Budget System
          </h1>
          <p style={{
            position: 'absolute',
            top: '48%', 
            left: '22%',
            transform: 'translateX(-50%)',
            color: 'white',  
            fontSize: '14px',
            fontWeight: '400',
            fontFamily: 'Inter, sans-serif',
            textAlign: 'center'
          }}>
            Effortless Budget Management: Request, Track, and<br />Approve with Ease
          </p>

        </div>
      </div>
      <div className={classes.block}>
        <div>
          <h1 style={{ fontSize: '25px', fontWeight: '700', fontFamily: 'Inter,sans-serif', paddingTop: '28px' }}>Create Account</h1>
          <p style={{ color: '#667185', fontSize: '16px', fontWeight: '400', fontFamily: 'Inter,sans-serif', paddingTop: '2px' }}>Sign up and Effortlessly manage Budget Management.</p>

          <div className={classes.form}>
            <div className={classes.group}>
              <label>Full Name</label>
              <input placeholder="Enter your name" required />
            </div>
            <div className={classes.group}>
              <label>Email Address</label>
              <input placeholder=" Enter Email" required />
            </div>
            <div className={classes.group}>
              <label>Password</label>
              <input placeholder=" Enter Password" required />
            </div>
            <div className={classes.group}>
              <label>Confirm Password</label>
              <input placeholder="Enter Password" required />
            </div>


          </div>

          <div className={classes.but}>
            <button onClick={moveToAccount} type="submit">Create Account</button>
          </div>
          <p style={{ color: 'black', textAlign: 'center', fontWeight: '380', fontFamily: 'Inter, sans-serif', paddingTop: '5px', fontSize: '18px'}}>
  Already have an account? 
  <span 
  onClick={handleLoginClick}
    style={{ color: '#32C478F0', textDecoration: 'none', cursor: 'pointer' }}>
    Log in
  </span>
</p>
          <p style={{ color: 'black', textAlign: 'center', fontWeight: '380', fontFamily: 'Inter, sans-serif', paddingTop: '2px', fontSize: '16px' }}>
            By Signing up, you agree to our <span style={{ color: "#32C478F0" }}>terms of services</span></p>

        </div>
      </div>

    </div>

  );
}

export default Create;
