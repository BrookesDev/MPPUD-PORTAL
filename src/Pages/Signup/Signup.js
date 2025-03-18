import React from 'react'
import {useNavigate} from "react-router";
import classes from './Signup.module.css'
import back from '../../Asset/back.png'
import mWR from '../../Asset/mWR 2.svg'
const Signup = () => {
  const navigate = useNavigate();
  const moveToCreate = () =>{
      navigate('/Create')
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
            top: '48%', // Slightly below h1
            left: '22%',
            transform: 'translateX(-50%)',
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
    <div className={classes.block}>
      <div>
        <h1 style={{ fontSize: '28px', fontWeight: '700', fontFamily: 'Inter,sans-serif', paddingTop: '24px' }}>Welcome to <span style={{ color: "#32C478F0" }}> OGBS </span></h1>
        <p style={{ color: '#667185', fontSize: '20px', fontWeight: '400', fontFamily: 'Inter,sans-serif', paddingTop: '5px' }}>Create Account and Effortlessly manage Budget<br/> Management.</p>

        <div className={classes.form}>
               
        </div>

        <div className={classes.but}>
          <button onClick= {moveToCreate}type="submit">Create Account</button>
        </div>
        <p style={{ color: 'black', textAlign: 'center', fontWeight: '380', fontFamily: 'Inter, sans-serif', paddingTop: '5px', fontSize: '18px'}}>
  Already have an account? 
  <span 
  onClick={handleLoginClick}
    style={{ color: '#32C478F0', textDecoration: 'none', cursor: 'pointer' }}>
    Log in
  </span>
</p>

          <p style={{ color: 'black', textAlign: 'center', fontWeight: '380', fontFamily: 'Inter, sans-serif', paddingTop: '15px',fontSize: '18px' , marginBottom: '5px'}}>
          By Signing up, you agree to our <span style={{ color: "#32C478F0"}}>terms of services</span></p> 
          <p style={{ color: 'black', textAlign: 'center', fontWeight: '380', fontFamily: 'Inter, sans-serif',fontSize: '18px', marginTop: '0' }}>
          and that you have read our <span style={{ color: "#32C478F0"}}>privacy policy</span></p> 
      </div>
    </div>
     
  </div>

);
}

export default Signup