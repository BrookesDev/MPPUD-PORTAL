import React, { useState, useEffect } from 'react';
import classes from './InvoiceNew.module.css';
import { Container, Card } from 'react-bootstrap';
import Olarms from '../../Asset/olarmsLogo.svg'
// import QRIcon from '../../../Asset/hhh.png'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {QRCodeSVG} from 'qrcode.react';


const InvoiceNew = () => {
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
                        
                        Ogun State Land Admin. & Revenue Mgt. System
                     
                      </h2>
                      <p> GIS Building, Oke-Mosan Abeokuta, Ogun State.</p>
                      <h4 >070-011-199-99</h4>
                                       
                      <div ><a className={classes.emCol} href="/cdn-cgi/l/email-protection" data-cfemail="cdaea2a0bdaca3b48da8b5aca0bda1a8e3aea2a0">olarms@ogunstate.gov.ng</a></div>
                    </div>
                  </div>
                </header>
                <hr />
                <main className={classes.fullmargin}>
                  <div className={classes.rowcontacts}>
                    <div className={classes.lnne}/>
                    <div className={classes.colinvoiceto}>
                      <div className={classes.invTxt}>INVOICE TO:</div>
                      <h2 className={classes.invTxt1}>{userData?.customer?.name}</h2>
                      <div className={classes.invTxt2}>{userData.application?.customer?.address}</div>
                      <div >
                        <a href="/cdn-cgi/l/email-protection#016b6e696f416479606c716d642f626e6c"><span className="__cf_email__" data-cfemail="dbb1b4b3b59bbea3bab6abb7bef5b8b4b6">{userData.application?.customer?.email}</span></a>
                      </div>
                    </div>
                    <div className={classes.colinvoicedetails}>
                      <div className={classes.headercolor}>INVOICE</div>
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
                    {[].map((item, index) => (
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
                  {/* <div className="thanks">Thank you!</div> */}
                  <div className={classes.noticetexta} style={{ pageBreakBefore: 'always', breakBefore: 'page' }}>
                   <h4>STEPS TO MAKE YOUR PAYMENT</h4>
                  </div>
                  <div className={classes.btmCards}>
                  <div className={classes.noticetext}>
                   <h4>ONLINE</h4>
                  </div>
                  <div className={classes.noticetexts}>
                   <h4>BANK BRANCH (for Bank Tellers)</h4>
                  </div>
                  </div>
                  <div className={classes.btmCards}>
                  <div className={classes.noticetext}>
                  <ul>
        <li>Visit <a style={{color: "#0087C3"}} href="https://pay.ogunstate.gov.ng" target="_blank" rel="noopener noreferrer">pay.ogunstate.gov.ng</a></li>
        <li>Enter the payment code</li>
        <li>Input the Captcha and click "Get Details"</li>
        <li>Select "Card" and click on the gateway to use</li>
        <li>Click on "Make Payment" and continue the process</li>
      </ul>
                  </div>
                  <div className={classes.noticetexts}>
                  <ul>
                  <li>A Teller logs in to <a style={{color: "#0087C3"}} href="https://www.remita.net" target="_blank" rel="noopener noreferrer">www.remita.net</a> or a Bank application using their login credentials</li>
        <li>Go to the "Payments" menu and select "Pay Taxes"</li>
        <li>Select "Ogun State Inland Revenue Service" from the dropdown list of Tax Authorities</li>
        <li>Select "Pay with Payment Code" method from the "Service Name" dropdown</li>
        <li>Input the Payment Code and click the "SEARCH" button</li>
        <li>Continue to complete the transaction processing</li>
      </ul>
                  </div>
                  </div>
                  <div className={classes.btmCards}>
                  <div className={classes.noticetext}>
                  <ul>
                  <li>Visit <a style={{color: "#0087C3"}} href="https://pay.ogunstate.gov.ng" target="_blank" rel="noopener noreferrer">pay.ogunstate.gov.ng</a></li>
        <li>Enter the payment code</li>
        <li>Input the Captcha and click "Get Details"</li>
        <li>Select "Bank Transfer"</li>
        <li>Click on "Make Payment" and continue the process</li>
      </ul>
                  </div>
                  <div className={classes.noticetexts}>
                  <ul>
                  <li>Login into the system</li>
        <li>On the Dashboard, select the state for which the transaction is to be performed (e.g., Ogun State)</li>
        <li>On the transaction page, select the “Pay with Assessment/Bill (Payment Code)” payment method</li>
        <li>Enter the Payment Code into the textbox provided</li>
        <li>Click on the "Search" button to validate the payment code and fetch the payer and assessment information</li>
        <li>Continue to complete the transaction processing</li>
      </ul>
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

export default InvoiceNew;