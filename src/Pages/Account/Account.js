import React from 'react';
import { useNavigate,useState } from "react-router";
import classes from './Account.module.css'
import back from '../../Asset/back.png'
import mWR from '../../Asset/mWR 2.svg'

const Account = () => {

//   const navigate = useNavigate();
//   const moveToAccount = () => {
//     navigate('/Account')
//   }
  

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
          <h1 style={{ fontSize: '25px', fontWeight: '700', fontFamily: 'Inter,sans-serif', paddingTop: '28px' }}>Verify your account</h1>
          <p style={{ color: '#667185', fontSize: '16px', fontWeight: '400', fontFamily: 'Inter,sans-serif', paddingTop: '2px' }}>Enter verification sent to <span style={{ color: "#32C478F0" }}>adekoyatoluwani@gmail.com</span></p>

          <div className={classes.form}>
            <div className={classes.group}>
              
              <input placeholder required />
            </div>
            <div className={classes.group}>
             
              <input  required />
            </div>
            <div className={classes.group}>
              
              <input  required />
            </div>
            <div className={classes.group}>
            
              <input required />
            </div>
            <div className={classes.group}>
            
              <input required />
            </div>


          </div>
          <p style={{ color: 'black', textAlign: 'left', fontWeight: '380', fontFamily: 'Inter, sans-serif', paddingTop: '8px', fontSize: '13px' }}>
            Didn't get the code? <span style={{ color: "#32C478F0" }}>Resend </span> </p>
          <p style={{ color: 'black', textAlign: 'left', fontWeight: '380', fontFamily: 'Inter, sans-serif', paddingTop: '2px', fontSize: '14px' }}> <span style={{ color: "#32C478F0" }}>35secs</span></p>

          <div className={classes.but}>
            <button  type="submit">Verify Account</button>
          </div>
         
        </div>
      </div>

    </div>

  );
}

export default Account;