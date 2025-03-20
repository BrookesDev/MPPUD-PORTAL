import React, { useState, useEffect, useRef, useContext } from "react";
import DashboardNav from "../../Components/Navigation.js/Navigation";
import Horheader from "../../Components/horheader/horheader";
import classes from "./FrequentQuestion.module.css";
import PdfIcon from "../../Asset/pdf.svg";
import UploadIcon from "../../Asset/upload.png";
import HOC from "../../Asset/hoc.png";
import CurrencyInput from "react-currency-input-field";
import {
  Spinner,
  Badge,
  Modal,
  Form,
  Tabs,
  Tab,
  Pagination,
  Placeholder,
  Accordion,
  Card,
} from "react-bootstrap";

import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { BASE_URL } from "../../API/Api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import crop from "../../Asset/repoort.png";
import verified from "../../Asset/tick-circle.png";
import ImageIcon from "../../Asset/piclogo.png";
import { Navbar, Container, Button } from "react-bootstrap";
import localforage from 'localforage';
import { useTheme } from '../../ThemeContext';



const FrequentQuestion = () => {
  const location = useLocation();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
   const { isDarkMode } = useTheme();
 
  const QUESTIONS = [
   {
    title:"What is OLARMS?",
    body:" OLARMS is a platform built to help people and businesses navigate land processes in Ogun State. From doing due diligence before purchasing a property to obtaining a building permit, this is a single location that pools resources and knowledge in one space."
   },
   {
    title:"Why is OLARMS necessary?",
    body:" By creating a single location where information can be requested and accessed, applications can be filed,land-related payments can be made, more people can be served quicker, saving time and money for both the people of Ogun State as well as businesses and investors."
   },
   {
    title:" Does OLAMS supersede other Ministries Department's or Agencies?",
    body:" OLARMS works alongside other MDAs to offer high-quality services to the citizens and business owners of Ogun State."
   },
   {
    title:"Why is OLARMS running a Property Regristration Program ?",
    body:" Yes, because over the years, several properties have been bought and structures built without proper documentation, some of which can be dangerous to the communities they are in. By creating an avenue for regularizing these assets, the government can get a clearer picture of where development resources are best allocated—water pipelines, roads, school zones, or designated business hubs."
   },
   {
    title:"Where do I go to make my application ?",
    body:" OLARMS provides an online service that can be accessed from any convenient location. Log on to &nbsp; www.olarms.ogunstate.gov.ng"
   },
   {
    title:"I have a Home Owners Charter application oustanding? What should I do ?",
    body:" All applicants with outstanding H.O.C applications will be contacted in due course."
   },
   {
    title:"I cannot move on to application form ?",
    body:" All applicants with outstanding H.O.C applications will be contacted in due course."
   },
   {
    title:"Why can'tI pay at the bank for Land allocation?",
    body:" Land transactions are online. Payments online secures your plot."
   },
   {
    title:"How secure is the online payment ?",
    body:" OLARMS provides facility for online payments, using the Ogun State secure Billing Payments Management System (BPMS). which is highly secured."
   },
   {
    title:"I don't have access to the application form. What do I do ?",
    body:" Application form fee has to be paid before getting access to fill the application form."
   },
   {
    title:"I am having difficulty in using my card for online payment. What should I do?",
    body:" Sorry for the inconvenience, the kindly go back to the payment transaction and use a bank for transfer option."
   },
   {
    title:"I made payements but it says pending and my bank account has been debited but the bank is yet to receive the payment?",
    body:" Sorry for the inconvenience, kindly give few minutes for processing, after which you can log out and log in again, then go to the “Purchase History” it would reflect, signifying “PAID”."
   },
   {
    title:"How long do I have to make payement, after my Land application has been submitted?",
    body:" The time frame for payment would be available on the transaction invoice."
   },
   {
    title:"I would like to apply for ratfication of title on my property?",
    body:" Log on to the OLARMS system to check that your property falls within the eligible ratification areas, if so, go ahead and register then follow the process to the end, and pay the required fees."
   },
   {
    title:"How can I buy Land in Ogun State ?",
    body:" Log on to the OLARMS portal, register and select the Land scheme of your choice, then follow the process to the end, and make payments."
   },
   {
    title:"How can I make payments ? Can I pay cash?",
    body:" OLARMS provides facility for online payments, using the Ogun State secure Billing Payments Management System (BPMS). Payments can be made online by: Online - Pay with Bank Transfer or Card after registration on www.olarms.ogunstate.gov.ng Bank Branches - Print your bill and take to a bank branch to make payment using the XpressPay or REMITA Platform; POS Terminals - Print your bill and make payments on POS terminals at OGIRS or MUPP offices."
   },
   {
    title:"I made payment can I have a receipt?",
    body:" Print from your email"
   },
   {
    title:"How many payments do I have to make to complete my PRP application?",
    body:" You required to pay: Ten thousand naira for application fee. Fifty thousand naira for processing fee Assessment fee according to the bill issued."
   },
   {
    title:"Have made a payment, and it has not reflected in my OLARMS account. What should I do?",
    body:" Please contact your bank to verify if the transaction was successful."
   },
   {
    title:"I have paid application from fee for PRP. What Next?", 
    body:" Once your application is revised you be prompted to pay the processing fee, in preparation for your property inspection."
   },
   {
    title:"I have paid a processing fee of Fifty thousand naira. What next?",
    body:" You will be contacted shortly and be informed of the date of inspection"
   },
   {
    title:"My property has been inspected. What Next?",
    body:" The team will process and provide survey of property, then you will be contacted to pay the assessment fee."
   },
   {
    title:"How long does it take to get my C of O after payment?",
    body:"Once full payments and required information has been received, your document would be processed within 30 days."
   },
   {
       title:" If I want to apply as a corporate user, what requirements do I need?",
       body:" Kindly log on to the OLARMS portal on &nbsp; www.olarms.ogunstate.gov.ng, sign up, choose the corporate option, make payments, then you would be prompted with the list of documents you need to upload for the application."
   },
   {
    title:"How do I collect my C of O?",
    body:"You would be contacted to collect your C of O in person."
   },{
    title:"I'm having difficulties logging into my profile, Have you forgotten your password?",
    body:"No problem… Click on FORGOT PASSWORD, then enter the email address you used when registering. A password reset email will be sent to your email box. Go to your email to check – make sure you check your SPAM folder too if you do not see it immediately. Click on the reset password link in the email- you will be taken to a site to enter another password- make sure to enter a password you can remember, you will be prompted to enter it a second time…do this, and you can now return to the OLARMS website www.olarms.ogunstate.gov.ng to continue."
   },
   {
    title:"How can I contact OLARMS Team?",
    body:"OLARMS Portal: www.olarms-customer.ogunstate.gov.ng Email Address:  If I want to apply as a corporate user, what requirements do need?"
   }
  ]



  return (
    <>
      <div className={classes.appcontainer}>
        <div className={classes.sidenav}>
          <Navbar expand="lg" className={`d-none d-md-block ${classes.navbar}`}>
            <Container fluid></Container>
          </Navbar>
          <Navbar
            bg="light"
            expand={false}
            className={`d-md-none ${classes.bglight}`}
          >
            <Container fluid>
              <Button
                style={{ backgroundColor: "#21B55A", border: "none" }}
                variant="success"
                onClick={handleShow}
              >
                ☰
              </Button>
            </Container>
          </Navbar>
          <DashboardNav show={show} handleClose={handleClose} />
        </div>

        <div className={classes.maincontent}>
          <div className={classes.mobileHeader}>
            <Horheader />
          </div>
          <div className={classes.dashBoardCont}>
          <h2 className={classes.freqTitle}>Frequently Asked Questions</h2>
          {/* <p>
            For any additional questions or support, don’t hesitate to contact
            our team.{" "}
          </p> */}
          <section
         className={classes.faqBackground}
          id="faqs"
        >
            <div className={isDarkMode ? classes.frqeTop : classes.frqeTop1}>
         
          </div>
          <div className={classes.accord}>
            <Accordion>
              <Accordion.Item
                eventKey="0"
                style={{ marginBottom: 18, width: "100%" }}
              >
                <Accordion.Header className={classes.headAcc}>
                  What is OLARMS?
                </Accordion.Header>
                <Accordion.Body style={{ width: "100%" }}>
                  {/* <h4 className={classes.titleAccd}>
                    Why is OLARMS running a Property Registration Program?
                  </h4> */}
                  <p className={classes.titleAccdP}>
                    {" "}
                    OLARMS is a platform built to help people and businesses
                    navigate land processes in Ogun State. From doing due
                    diligence before purchasing a property to obtaining a
                    building permit, this is a single location that pools
                    resources and knowledge in one space.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item
                eventKey="1"
                style={{ marginBottom: 18, width: "100%" }}
              >
                <Accordion.Header className={classes.headAcc}>
                  Why is OLARMS necessary?
                </Accordion.Header>
                <Accordion.Body>
                  {/* <h4 className={classes.titleAccd}>
                    Why is OLARMS running a Property Registration Program?
                  </h4> */}
                  <p className={classes.titleAccdP}>
                    {" "}
                    By creating a single location where information can be
                    requested and accessed, applications can be filed,
                    land-related payments can be made, more people can be served
                    quicker, saving time and money for both the people of Ogun
                    State as well as businesses and investors.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item
                eventKey="2"
                style={{ marginBottom: 18, width: "100%" }}
              >
                <Accordion.Header className={classes.headAcc}>
                  Does OLAMS supersede other Ministries Department's or
                  Agencies?
                </Accordion.Header>
                <Accordion.Body>
                  {/* <h4 className={classes.titleAccd}>
                    Why is OLARMS running a Property Registration Program?
                  </h4> */}
                  <p className={classes.titleAccdP}>
                    {" "}
                    OLARMS works alongside other MDAs to offer high-quality
                    services to the citizens and business owners of Ogun State.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item
                eventKey="3"
                style={{ marginBottom: 18, width: "100%" }}
              >
                <Accordion.Header className={classes.headAcc}>
                  Why is OLARMS running a Property Regristration Program ?
                </Accordion.Header>
                <Accordion.Body>
                  {/* <h4 className={classes.titleAccd}>
                    Why is OLARMS running a Property Registration Program?
                  </h4> */}
                  <p className={classes.titleAccdP}>
                    {" "}
                    Yes, because over the years, several properties have been
                    bought and structures built without proper documentation,
                    some of which can be dangerous to the communities they are
                    in. By creating an avenue for regularizing these assets, the
                    government can get a clearer picture of where development
                    resources are best allocated—water pipelines, roads, school
                    zones, or designated business hubs.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item
                eventKey="4"
                style={{ marginBottom: 18, width: "100%" }}
              >
                <Accordion.Header className={classes.headAcc}>
                  Where do I go to make my application ?
                </Accordion.Header>
                <Accordion.Body>
                  {/* <h4 className={classes.titleAccd}>
                    Why is OLARMS running a Property Registration Program?
                  </h4> */}
                  <p className={classes.titleAccdP}>
                    {" "}
                    OLARMS provides an online service that can be accessed from
                    any convenient location. Log on to &nbsp;
                    <a
                      href="https://www.olarms.ogunstate.gov.ng"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={classes.titleAccdPB}
                    >
                      www.olarms.ogunstate.gov.ng
                    </a>
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item
                eventKey="5"
                style={{ marginBottom: 18, width: "100%" }}
              >
                <Accordion.Header className={classes.headAcc}>
                  I have a Home Owners Charter application oustanding? What
                  should I do ?
                </Accordion.Header>
                <Accordion.Body>
                  {/* <h4 className={classes.titleAccd}>
                    Why is OLARMS running a Property Registration Program?
                  </h4> */}
                  <p className={classes.titleAccdP}>
                    {" "}
                    All applicants with outstanding H.O.C applications will be
                    contacted in due course.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item
                eventKey="6"
                style={{ marginBottom: 18, width: "100%" }}
              >
                <Accordion.Header className={classes.headAcc}>
                  I cannot move on to application form ?
                </Accordion.Header>
                <Accordion.Body>
                  {/* <h4 className={classes.titleAccd}>
                    Why is OLARMS running a Property Registration Program?
                  </h4> */}
                  <p className={classes.titleAccdP}>
                    {" "}
                    All applicants with outstanding H.O.C applications will be
                    contacted in due course.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item
                eventKey="7"
                style={{ marginBottom: 18, width: "100%" }}
              >
                <Accordion.Header className={classes.headAcc}>
                  Why can'tI pay at the bank for Land allocation?
                </Accordion.Header>
                <Accordion.Body>
                  {/* <h4 className={classes.titleAccd}>
                    Why is OLARMS running a Property Registration Program?
                  </h4> */}
                  <p className={classes.titleAccdP}>
                    {" "}
                    Land transactions are online. Payments online secures your
                    plot.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item
                eventKey="8"
                style={{ marginBottom: 18, width: "100%" }}
              >
                <Accordion.Header className={classes.headAcc}>
                  How secure is the online payment ?
                </Accordion.Header>
                <Accordion.Body>
                  {/* <h4 className={classes.titleAccd}>
                    Why is OLARMS running a Property Registration Program?
                  </h4> */}
                  <p className={classes.titleAccdP}>
                    {" "}
                    OLARMS provides facility for online payments, using the Ogun
                    State secure Billing Payments Management System (BPMS).
                    which is highly secured.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item
                eventKey="9"
                style={{ marginBottom: 18, width: "100%" }}
              >
                <Accordion.Header className={classes.headAcc}>
                  I don't have access to the application form. What do I do ?
                </Accordion.Header>
                <Accordion.Body>
                  <p className={classes.titleAccdP}>
                    {" "}
                    Application form fee has to be paid before getting access to
                    fill the application form.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item
                eventKey="10"
                style={{ marginBottom: 18, width: "100%" }}
              >
                <Accordion.Header className={classes.headAcc}>
                  I am having difficulty in using my card for online payment.
                  What should I do?
                </Accordion.Header>
                <Accordion.Body>
                  <p className={classes.titleAccdP}>
                    {" "}
                    Sorry for the inconvenience, the kindly go back to the
                    payment transaction and use a bank for transfer option.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item
                eventKey="11"
                style={{ marginBottom: 18, width: "100%" }}
              >
                <Accordion.Header className={classes.headAcc}>
                  I made payements but it says pending and my bank account has
                  been debited but the bank is yet to receive the payment?
                </Accordion.Header>
                <Accordion.Body>
                  <p className={classes.titleAccdP}>
                    {" "}
                    Sorry for the inconvenience, kindly give few minutes for
                    processing, after which you can log out and log in again,
                    then go to the “Purchase History” it would reflect,
                    signifying “PAID”.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item
                eventKey="12"
                style={{ marginBottom: 18, width: "100%" }}
              >
                <Accordion.Header className={classes.headAcc}>
                  How long do I have to make payement, after my Land application
                  has been submitted?
                </Accordion.Header>
                <Accordion.Body>
                  <p className={classes.titleAccdP}>
                    {" "}
                    The time frame for payment would be available on the
                    transaction invoice.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item
                eventKey="13"
                style={{ marginBottom: 18, width: "100%" }}
              >
                <Accordion.Header className={classes.headAcc}>
                  I would like to apply for ratfication of title on my property?
                </Accordion.Header>
                <Accordion.Body>
                  <p className={classes.titleAccdP}>
                    {" "}
                    Log on to the OLARMS system to check that your property
                    falls within the eligible ratification areas, if so, go
                    ahead and register then follow the process to the end, and
                    pay the required fees.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item
                eventKey="14"
                style={{ marginBottom: 18, width: "100%" }}
              >
                <Accordion.Header className={classes.headAcc}>
                  How can I buy Land in Ogun State ?
                </Accordion.Header>
                <Accordion.Body>
                  <p className={classes.titleAccdP}>
                    {" "}
                    Log on to the OLARMS portal, register and select the Land
                    scheme of your choice, then follow the process to the end,
                    and make payments.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item
                eventKey="15"
                style={{ marginBottom: 18, width: "100%" }}
              >
                <Accordion.Header className={classes.headAcc}>
                  How can I make payments ? Can I pay cash?
                </Accordion.Header>
                <Accordion.Body>
                  <p className={classes.titleAccdP}>
                    {" "}
                    OLARMS provides facility for online payments, using the Ogun
                    State secure Billing Payments Management System (BPMS).
                    Payments can be made online by:
                    <ul className={classes.titleAccdP}>
                      <li>
                        {" "}
                        Online - Pay with Bank Transfer or Card after
                        registration on www.olarms.ogunstate.gov.ng
                      </li>
                      <li>
                        {" "}
                        Bank Branches - Print your bill and take to a bank
                        branch to make payment using the XpressPay or REMITA
                        Platform;{" "}
                      </li>
                      <li>
                        {" "}
                        POS Terminals - Print your bill and make payments on POS
                        terminals at OGIRS or MUPP offices.
                      </li>
                    </ul>
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item
                eventKey="16"
                style={{ marginBottom: 18, width: "100%" }}
              >
                <Accordion.Header className={classes.headAcc}>
                  I made payment can I have a receipt?
                </Accordion.Header>
                <Accordion.Body>
                  <p className={classes.titleAccdP}> Print from your email</p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item
                eventKey="17"
                style={{ marginBottom: 18, width: "100%" }}
              >
                <Accordion.Header className={classes.headAcc}>
                  How many payments do I have to make to complete my PRP
                  application?
                </Accordion.Header>
                <Accordion.Body>
                  <p className={classes.titleAccdP}>
                    {" "}
                    You required to pay:
                    <ul>
                      <li> Ten thousand naira for application fee.</li>
                      <li> Fifty thousand naira for processing fee</li>
                      <li> Assessment fee according to the bill issued. </li>
                    </ul>
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item
                eventKey="18"
                style={{ marginBottom: 18, width: "100%" }}
              >
                <Accordion.Header className={classes.headAcc}>
                  Have made a payment, and it has not reflected in my OLARMS
                  account. What should I do?
                </Accordion.Header>
                <Accordion.Body>
                  <p className={classes.titleAccdP}>
                    {" "}
                    Please contact your bank to verify if the transaction was
                    successful.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item
                eventKey="19"
                style={{ marginBottom: 18, width: "100%" }}
              >
                <Accordion.Header className={classes.headAcc}>
                  I have paid application from fee for PRP. What Next?
                </Accordion.Header>
                <Accordion.Body>
                  <p className={classes.titleAccdP}>
                    {" "}
                    Once your application is revised you be prompted to pay the
                    processing fee, in preparation for your property inspection.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item
                eventKey="20"
                style={{ marginBottom: 18, width: "100%" }}
              >
                <Accordion.Header className={classes.headAcc}>
                  I have paid a processing fee of Fifty thousand naira. What
                  next?
                </Accordion.Header>
                <Accordion.Body>
                  <p className={classes.titleAccdP}>
                    {" "}
                    You will be contacted shortly and be informed of the date of
                    inspection
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item
                eventKey="21"
                style={{ marginBottom: 18, width: "100%" }}
              >
                <Accordion.Header className={classes.headAcc}>
                  My property has been inspected. What Next?
                </Accordion.Header>
                <Accordion.Body>
                  <p className={classes.titleAccdP}>
                    {" "}
                    The team will process and provide survey of property, then
                    you will be contacted to pay the assessment fee.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item
                eventKey="22"
                style={{ marginBottom: 18, width: "100%" }}
              >
                <Accordion.Header className={classes.headAcc}>
                  How long does it take to get my C of O after payment?
                </Accordion.Header>
                <Accordion.Body>
                  <p className={classes.titleAccdP}>
                    {" "}
                    Once full payments and required information has been
                    received, your document would be processed within 30 days.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item
                eventKey="23"
                style={{ marginBottom: 18, width: "100%" }}
              >
                <Accordion.Header className={classes.headAcc}>
                  If I want to apply as a corporate user, what requirements do I
                  need?
                </Accordion.Header>
                <Accordion.Body>
                  <p className={classes.titleAccdP}>
                    {" "}
                    Kindly log on to the OLARMS portal on &nbsp;
                    <a
                      href="https://www.olarms.ogunstate.gov.ng"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={classes.titleAccdPB}
                    >
                      www.olarms.ogunstate.gov.ng,
                    </a>{" "}
                    sign up, choose the corporate option, make payments, then
                    you would be prompted with the list of documents you need to
                    upload for the application.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item
                eventKey="24"
                style={{ marginBottom: 18, width: "100%" }}
              >
                <Accordion.Header className={classes.headAcc}>
                  How do I collect my C of O?
                </Accordion.Header>
                <Accordion.Body>
                  <p className={classes.titleAccdP}>
                    {" "}
                    You would be contacted to collect your C of O in person.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item
                eventKey="25"
                style={{ marginBottom: 18, width: "100%" }}
              >
                <Accordion.Header className={classes.headAcc}>
                  I'm having difficulties logging into my profile, Have you
                  forgotten your password?
                </Accordion.Header>
                <Accordion.Body>
                  <p className={classes.titleAccdP}>
                    {" "}
                    No problem… Click on FORGOT PASSWORD, then enter the email
                    address you used when registering. A password reset email
                    will be sent to your email box. Go to your email to check –
                    make sure you check your SPAM folder too if you do not see
                    it immediately. Click on the reset password link in the
                    email- you will be taken to a site to enter another
                    password- make sure to enter a password you can remember,
                    you will be prompted to enter it a second time…do this, and
                    you can now return to the OLARMS website
                    www.olarms.ogunstate.gov.ng to continue.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item
                eventKey="26"
                style={{ marginBottom: 18, width: "100%" }}
              >
                <Accordion.Header className={classes.headAcc}>
                  How can I contact OLARMS Team?
                </Accordion.Header>
                <Accordion.Body>
                  <p className={classes.titleAccdP}></p>{" "}
                  <ul className="space-y-2">
                    <li>
                      <strong className={classes.titleAccdP}>
                        OLARMS Portal:
                      </strong>{" "}
                      <a
                        href="https://olarms-customer.ogunstate.gov.ng/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={classes.titleAccdPB}
                      >
                        www.olarms-customer.ogunstate.gov.ng
                      </a>
                    </li>
                    <li>
                      <strong className={classes.titleAccdP}>
                        Email Address:
                      </strong>{" "}
                      <a
                        href="mailto:olarms@ogunstate.gov.ng"
                        className={classes.titleAccdPB}
                      >
                        olarms@ogunstate.gov.ng
                      </a>
                    </li>
                    <li>
                      <strong className={classes.titleAccdP}>Telephone:</strong>{" "}
                      <a href="tel:07001119999" className={classes.titleAccdPB}>
                        0700 111 9999
                      </a>
                    </li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default FrequentQuestion;
