import React, { useState, useEffect } from "react";
import classes from "./Assessment.module.css";
import Olarms from '../../Assets/olarmsLogo.svg'
import QRIcon from '../../Assets/hhh.png'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from "../../API/Api";
import axios from 'axios';
import {QRCodeSVG} from 'qrcode.react';
// import logo from "../../Assets/ogunLogo.png";
// import Qr from '../src/products/qr.jpeg'
// import state from '../src/products/state.jpeg'
import numberToWords from "number-to-words";

const AssessmentLetter = () => {
    const [user, setUser] = useState("");
    const [bearer, setBearer] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const [firstName, setFirstName] = useState('');
         const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [currentDateTime, setCurrentDateTime] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [payment, setPayment] = useState([]);
    const { foundPayment } = location.state || {};
  
    console.log(foundPayment);

    const readData = async () => {
      try {
          const detail = await AsyncStorage.getItem('firstName');
          const detailsd = await AsyncStorage.getItem('secondName');
          const details = await AsyncStorage.getItem('userToken');
          const detailss = await AsyncStorage.getItem('userEmail');
          
  
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
      
      const { userData } = location.state || {};
     
      console.log(userData);
      const handlePrint = () => {
        window.print();
      };
  
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${bearer}`
      };
  
      const totalAmount = foundPayment?.break?.reduce((total, item) => total + (Number(item.amount) || 0), 0);

      // const totalInWords = numberToWords.toWords(totalAmount)
      const totalInWords = numberToWords.toWords(totalAmount)
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(" ") + " Naira Only";

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
      const fetchData1 = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(`${BASE_URL}/payment_details`,
            {
              headers,
              params: { id: foundPayment.id }
            });        
          // const roleList = response.data?.data[0];      
          // const customer = response.data?.data[0]?.customer;      
          // const applicationdocs = response.data?.data[0]?.application_document;      
          const payment = response.data?.data[0];      
          console.log(payment, ".LLSKKS");
          // setCustomer(customer);
          setPayment(payment);
        } catch (error) {
          if (error.response && error.response.status === 401) {
            // Redirect to login page if unauthorized
            navigate('/login');
          } else {
            const errorStatus = error.response?.data?.message;
            console.log(errorStatus);
            setPayment([]);
          }
        } finally {
          setIsLoading(false);
        }
      };
    
    
      useEffect(() => {
        if (bearer) {
          // fetchData();
          fetchData1();
          // fetchData3();
        }
      }, [bearer]);

  return (
    <div className={classes.body}>
    
      <div>
        <div className={classes["document-page"]}>
          <div className={classes.iml}>
            {/* <img src={state} className='state' /> */}
          </div>
          <div className={classes.img}>
            {/* <img src={Qr} className='Qr' /> */}
            {/* <img src={Qr} className='Qr' /> */}
          </div>
          <h1 className={classes["document-title"]}>
            <span className={classes.titleText}>
              BUREAU OF LANDS AND SURVEY
            </span>
            <br /> OKE MOSAN, ABEOKUTA, OGUNSTATE
          </h1>

          {/* Subtitle */}
          <h2 className={classes["document-subtitle"]}>
            PAYMENT CODE: {foundPayment?.payment_code}
          </h2>

          {/* Paragraph with address on both ends */}
          <div className={classes["address-section"]}>
            <p className={classes["left-address"]}>
            {foundPayment?.details?.toUpperCase()}
              <br /> {payment?.application?.customer?.address || ""}{" "}
            </p>
            <p className={classes["right-address"]}>
            {formatDateTime(foundPayment?.created_at)}
              <br /> Phone No:{payment?.application?.customer?.phone || ""}
            </p>
          </div>

          {/* Content Section with Table */}
          <section className={classes.content}>
            <h2>
              "WITHOUT PREJUDICE"
              <br />
              PROVISIONAL OFFER FOR RIGHT OF OCCUPANCY ON LAND SITUATE, LYING
              AND BEING AT {payment?.application?.land_location.toUpperCase() || ""}.
            </h2>
            <p className={classes.refeer}>
              {" "}
              Refer to above subject matter, please.
              
              <br /> I am directed to inform you that Prince Dapo Abiodun has
              graciously considered your request and approved the provisional
              offer for grant of Right of Occupancy at the above described
              location based on the following terms and conditions:
              <br />
              <br />{" "}
            </p>
            <table className={classes["content-table1"]}>
              <thead className={classes.thead1}>
                <tr className={classes.theadTh}>
                  <th>Terms</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Type of use: </td>

                  <td style={{ textAlign: "left" }}>
  {{
    "1": "Residential",
    "2": "Industrial",
    "3": "Civic/Religious/Charitable Purpose",
    "4": "Agricultural",
    "5": "Commercial"
  }[payment?.application?.landuse_id] || ""
  }
</td>

                </tr>

                <tr>
                  <td>Size</td>
                  <td style={{ textAlign: "left" }}>{payment?.application?.size_in_sqm} Square Metres</td>
                </tr>

                <tr>
                  <td>Terms of Grant:</td>
                  <td style={{ textAlign: "left" }}>Ninety-Nine(99) Years</td>
                </tr>

                <tr>
                  <td>Premium</td>
                  <td style={{ textAlign: "left" }}>
                  {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(payment?.application?.premium_value)}
                    </td>
                </tr>
                <tr>
                  <td>Rent Revision Period</td>
                  <td style={{ textAlign: "left" }}>Every 5 Years</td>
                </tr>

               
              </tbody>
            </table>
           
            {/* Table */}
            <table className={classes["content-table"]}>
              <thead className={classes.thead1}>
                <h3> FEES</h3>
                <tr className={classes.theadTh}>
                  <th>Payment Items(s)</th>

                  <th style={{ textAlign: "right" }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {foundPayment?.break?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td style={{ textAlign: "right" }}>
                      {new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(Number(item.amount) || 0)}
                    </td>
                  </tr>
                ))}
                
                {/* Display total amount after the last item */}
                {foundPayment?.break?.length > 0 && (
                  <tr>
                    <td><strong>Total Amount</strong></td>
                    <td style={{ textAlign: "right" }}>
                      <strong>
                        {new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(
                          foundPayment.break.reduce((total, item) => total + (Number(item.amount) || 0), 0)
                        )}
                      </strong>
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </section>

          {/* Details Section with Numbers */}
          <section className={classes.details}>
            <h3>OTHER SPECIAL CONDITIONS</h3>

            <ul className={classes.liDt}>
              <li>
                1. You are requested to pay the sum of{" "}
                <strong>
                {totalInWords} ({new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(totalAmount)})
                </strong>{" "}
                being the total sum payable as evidence of acceptance of this
                offer. the said amount is expected to be paid using Payment Code
                stated above in this document via any of the following payment
                channel
                <br />
                <br /> (a.) Ogun State Government Approved Banks(s) via
                eCashier, Remita, PayDirect Platfrom. <br />
                (b.) Online via pay.ogunstate.gov.ng.
                <br />
                (c.) POS
                <br />
                <br />{" "}
              </li>
              <li>
                2. You are expected to commence the develpment of the parcel of
                land within six(6) Months from the date of this letter falling
                upon which the allocation is subject to renovation without
                notice.
                <br /> <br />{" "}
              </li>
              <li>
                3. The provisional offer is also subject to other implied and
                express condition to be stated on the Certificate of Occupancy
                (that will be issued in evidence of this grant) and the land Use
                Act No 6 of 1978{" "}
                <br /> <br />{" "}
              </li>
              <li>
              4. That you (applicant) should the Bureau upon full payments of your
            land charges for further proccessing of your <br /> title documents
            within the possible time frame.
            <br /> <br />{" "}
              </li>
              <li>
              5. Please note that any payment after the deadline given, you are
              expected to get in touch with the Bureau, to issue a
              lettter of renewal of offer before any further payment.
              <br /> <br />{" "}
              </li>
              <li>
              6. Many thanks
              <br /> <br /> <br /> <br />{" "}
              </li>
              <li>
              Esv. Adewale M.A{" "}
              <span className={classes.lenght}>ANIVS, RSV</span>
              </li>
              <li>
              Director, Land Services
              </li>
              <li>
              For: Special Adviser/Director General (Lands)
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AssessmentLetter;
