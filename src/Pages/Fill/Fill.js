import React from 'react'
import { useNavigate } from "react-router";
import classes from './Fill.module.css'
import back from '../../Asset/back.png'
import mWR from '../../Asset/mWR 2.svg'
import bank from '../../Asset/bank.png'
const Fill = () => {
  const navigate = useNavigate();
  const moveToProcess = () => {
    navigate('/Process')
  }

  const handleProcessClick = () => {
    navigate('/Process');
  };

  return (
    <div className={classes.main}>

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
                 <button onClick={moveToProcess} type="submit">Create Account</button>
               </div>
               <p style={{ color: 'black', fontWeight: '380', fontFamily: 'Inter, sans-serif', paddingTop: '5px', fontSize: '18px'}}>
       Already have an account? 
       <span 
       onClick={handleProcessClick}
         style={{ color: '#32C478F0', textDecoration: 'none', cursor: 'pointer' }}>
         Log in
       </span>
     </p>
               <p style={{ color: 'black',fontWeight: '380', fontFamily: 'Inter, sans-serif', paddingTop: '1px', fontSize: '16px' }}>
                 By Signing up, you agree to our <span style={{ color: "#32C478F0" }}>terms of services</span></p>
     
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

export default Fill