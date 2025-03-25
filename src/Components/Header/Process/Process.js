import React from 'react'
import { useNavigate } from "react-router";
import classes from './Process.module.css'
import back from '../../Asset/back.png'
import mWR from '../../Asset/mWR 2.svg'
import bank from '../../Asset/bank.png'
const Process = () => {
  const navigate = useNavigate();
  const moveToDashboard = () => {
    navigate("/dashboard")
  }

  

  return (
    <div className={classes.main}>

    <div className={classes.block}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '700', fontFamily: 'Inter,sans-serif', paddingTop: '24px' }}>Welcome <span style={{ color: "#32C478F0" }}> back </span></h1>
            <p style={{ color: '#667185', fontSize: '15px', fontWeight: '400', fontFamily: 'Inter,sans-serif', paddingTop: '1px' }}>Log in to your account and connect with the best<br/> participants for your studies</p>
    
            <div className={classes.form}>
               
                <div className={classes.group}>
                  <label>Email Address</label>
                  <input placeholder="adekoyatoluwani@gmail.com" required />
                </div>
                <div className={classes.group}>
                  <label>Password</label>
                  <input placeholder=" Enter Password" required />
                </div>
                
    
                <a href="/forgotpassword" className={classes.password}>Forget Password?</a> 
              </div>
    
            <div className={classes.but}>
              <button onClick= {moveToDashboard}type="submit">Login</button>
            </div>
    
           
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
    right: '25%',  // Move the h1 to the right
    transform: 'translate(50%, -50%)',
    color: 'white',
    fontSize: '35px',
    fontWeight: '700',
    fontFamily: 'Inter, sans-serif'
  }}>
    Ogun State Budget System
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

export default Process