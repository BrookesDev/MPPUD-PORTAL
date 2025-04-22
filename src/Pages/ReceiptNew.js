import React, { useState, useEffect } from 'react';
import classes from './ReceiptNew.module.css';
import { Container, Card } from 'react-bootstrap';
import Olarms from '../Asset/ogsglogo.png'
// import QRIcon from '../../../Asset/hhh.png'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {QRCodeSVG} from 'qrcode.react';


const ReceiptNew = () => {
  const [user, setUser] = useState("");
  const [bearer, setBearer] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [firstName, setFirstName] = useState('');
       const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [currentDateTime, setCurrentDateTime] = useState('');

  const readData = async () => {
    try {
        const detail = await localStorage.getItem('firstName');
        const detailsd = await localStorage.getItem('secondName');
        const details = await localStorage.getItem('userToken');
        const detailss = await localStorage.getItem('userEmail');
        

        if (detail !== null) {
            // const firstName = detail.split(' ')[0];
            setFirstName(detail);

        }
        if (detailsd !== null) {
            // const firstName = detailsd.split(' ')[0];
            setLastName(detailsd);

        }

        if (detailss !== null) {
            // const firstName = detail.split(' ')[0];
            setEmail(detailss);

        }


        if (details !== null) {
            setBearer(details);
        }
       
    } catch (e) {
        alert('Failed to fetch the input from storage');
    }
};
  
    useEffect(() => {
      readData();
    }, []);

    useEffect(() => {
      const addLeadingZero = (number) => (number < 10 ? `0${number}` : number);
    
      const currentDate = new Date();
      const day = currentDate.getDate();
      const month = addLeadingZero(currentDate.getMonth() + 1);
      const year = currentDate.getFullYear();
      const minutes = addLeadingZero(currentDate.getMinutes());
      const hours = addLeadingZero(currentDate.getHours() % 12 || 12);
      const seconds = addLeadingZero(currentDate.getSeconds());
      const ampm = currentDate.getHours() >= 12 ? 'PM' : 'AM';
    
      const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds} ${ampm}`;
    
      setCurrentDateTime(formattedDateTime);
    }, []);
    
    const { userData,  } = location.state || {};
   
    console.log(userData);
    const handlePrint = () => {
      window.print();
    };

    const formatDateTime = (dateString) => {
      if (!dateString) return "";
    
      const date = new Date(dateString);
    
      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    };


  return (
    // className={classes.head}
    <div className={classes.container}>
      <div className={classes.card}>
        <div className={classes.cardbody}>
          <div id="invoice">
            <div className={classes.toolbarhiddenprint}>
              <div className={classes.textend}>
                <button onClick={handlePrint} type="button" className="btn btn-success"><i className="fa fa-print" ></i> Print</button>
                {/* <button type="button" className="btn btn-danger"><i className="fa fa-file-pdf-o"></i> Export as PDF</button> */}
              </div>
              <hr />
            </div>
            <div className="{classes.invoice overflow-auto}">
              <div style={{ minWidth: '600px' }}>
                <header>
                  <div className={classes.headerCont}>
                        <img src={Olarms}  alt="Logo" />
                 
                   
                    <div className={classes.colcompanydetails}>
                      <h2 className={classes.colorgreenh2}>
                        
                        Ministry of Physical Planning & Urban Development
                     
                      </h2>
                      <p> Oke-Mosan Abeokuta, Ogun State.</p>
                      <h4 >070-011-199-99</h4>
                                       
                      <div ><a className={classes.emCol} href="/cdn-cgi/l/email-protection" data-cfemail="cdaea2a0bdaca3b48da8b5aca0bda1a8e3aea2a0">mppud@ogunstate.gov.ng</a></div>
                    </div>
                  </div>
                </header>
                <hr />
                <main className={classes.fullmargin}>
                  <div className={classes.rowcontacts}>
                    <div className={classes.lnne}/>
                    <div className={classes.colinvoiceto}>
                      <div className={classes.invTxt}>BILLED TO:</div>
                      <h2 className={classes.invTxt1}>{userData?.customer?.name}</h2>
                      <div className={classes.invTxt2}>{userData?.customer?.address}</div>
                      <div >
                        <a href="/cdn-cgi/l/email-protection#016b6e696f416479606c716d642f626e6c" style={{paddingLeft:0}}><span className="__cf_email__" data-cfemail="dbb1b4b3b59bbea3bab6abb7bef5b8b4b6">{userData?.customer?.email}</span></a>
                      </div>
                    </div>
                    <div className={classes.colinvoicedetails}>
                      <div className={classes.headercolor}>RECEIPT</div>
                      <div>Date of Invoice: {formatDateTime(userData.created_at)}</div>
                      {/* <div >Due Date: 30/10/2018</div> */}
                    </div>
                  </div>
                  <div className={classes.rowcontactss}>
                    <div className={classes.colinvoicetos}>
                      <div className={classes.invTxt31}>Payment Code:</div>
                      <div className={classes.invTxt3}>{userData.payment_code}</div>
                    </div>
                    <div className={classes.colinvoicedetails}>
                    <QRCodeSVG value={userData.payment_url} size={100}/>
                    </div>
                  </div>
                  <table className={classes.tableeepd}>
                    <thead>
                      <tr>
                        <th className={classes.textcent1213}>#</th>
                        <th className={classes.textleft}>DESCRIPTION</th>
                        {/* <th className={classes.textright}>QTY</th> */}
                        <th className={classes.textright11}>TOTAL AMOUNT PAYABLE</th>
                        <th className={classes.textright1s}>TOTAL</th>
                      </tr>
                    </thead>
                    <tbody>
                    {userData?.break?.map((item, index) => (
                       <tr key={index}>
                      
                        <td className={classes.textbackc}>
                           {index + 1} 
                        </td>
                        <td className={classes.textleft}>{item.name}</td>
                        <td className={classes.textright1}>{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(item.amount)}</td>
                        <td className={classes.textrights}>{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(item.amount)}</td>
                      </tr>
                   ))}
                     
                     
                    </tbody>
                    
                  </table>
  <div className={classes.belowData}>
                   
                      <div className={classes.belowDatas}>
                        <p className={classes.textleft222}>SUBTOTAL</p>
                        <p className={classes.textleft222}>{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(userData.amount)}</p>
                        </div>
                        <div style={{ width: '70%', borderTop: '2px solid #ccc', marginTop: -20, marginBottom: 10 }} />
                        <div className={classes.belowDatas}>
                        <td className={classes.textleft22212}>GRAND TOTAL</td>
                        <td className={classes.textleft22212}>{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(userData.amount)}</td>
                        </div>
                    </div>
                 
                
                </main>
               
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReceiptNew;