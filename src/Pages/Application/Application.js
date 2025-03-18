import React, { useState } from 'react';
import Sidebar from "../../Components/Sidebar";
import Navbar from "../../Components/Navbar";
import Card from "../../Components/Card";
import Chart from "../../Components/Chart";
import Table from "../../Components/Table";
import styles from "../../styles/Application.module.css";
import icon from "../../Asset/iconic.svg";
import Button from 'react-bootstrap/Button';
import { Spinner, Badge, Modal, Form, Tabs, Tab, Pagination } from 'react-bootstrap';
import { useInView } from "react-intersection-observer";

const sampleData = [
  { value: 50 },
  { value: 55 },
  { value: 53 },
  { value: 60 },
  { value: 58 },
  { value: 50 },
];

const generateZigzagData = () => {
  let value = 100; // Start at a high point
  return Array.from({ length: 30 }, (_, i) => {
    let change = Math.random() > 0.5 ? Math.random() * 8 : -Math.random() * 15;
    value += change; // Creates the erratic up-down effect
    value = Math.max(5, value); // Prevents it from going too low
    return { value: value };
  });
};



const Application = () => {

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [refServices, inViewServices] = useInView({ threshold: 0.1 });
  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);
  const handleShow = () => setShow(true);
  const handleShow1 = () => setShow1(true);


  return (
    <div className={styles.dashboard}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Navbar />
        <div className={styles.mainContent1}>
          <div className={styles.welcomeSection}>
            <h1>Welcome</h1>
            <p>
              Here, you can seamlessly submit budget requests, track approvals,
              monitor financial performance, and manage transactions.
            </p>
            <button className={styles.newRequestButton}>
              Make New Request
            </button>
          </div>
          <div style={{ display: "flex", gap: "20px" }}>
            <Card
              title="Overall Amount Requested"
              amount={50000000}
              data={generateZigzagData()}
            />
            <Card
              title="Total Amount Approved"
              amount={40000000}
              data={generateZigzagData()}
            />
            <Card
              title="Total Amount Utilized"
              amount={25000000}
              data={generateZigzagData()}
            />
          </div>


          {/* Services Section */}
          <section
            className={`${styles.services} ${inViewServices ? styles.fadeIn : styles.fadeOut
              }`}
            id="services"
            ref={refServices}
          >
            <div className={styles.explore}>
              <span></span>
              <p>Services</p>
              <span></span>
            </div>
            <h2 className={styles.sectionTitle}>
              Services Offered by <span>OLARMS</span>
            </h2>
            <p className={styles.sectionSubtitle}>
              Effortless land administration at your fingertips—explore services
              like land allocation, property registration, C of O processing,
              transaction tracking, and more with OLARMS.
            </p>
            <Modal
              show={show}
              onHide={handleClose}
              size="lg"
              centered
              animation={false}
            >
             
              <Modal.Header closeButton>
                <Modal.Title>Land Allocation</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h6>Contents</h6>
                {/* </div> */}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
            <Modal
              show={show1}
              onHide={handleClose1}
              size="lg"
              centered
              animation={false}
            >
             
              <Modal.Header closeButton>
                <Modal.Title>Property Registration Programme</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h6>Contents</h6>
                {/* </div> */}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={handleClose1}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
            <Modal
              show={show2}
              onHide={handleClose2}
              size="lg"
              centered
              animation={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>H.O.C</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h6>Contents</h6>
                {/* </div> */}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={handleClose2}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

            <div className={styles.serviceCards}>
              <div onClick={handleShow} className={styles.card}>
                <img src={icon} alt="icon" className={styles.icon} />
                <h3 className={styles.cardTitle}>Land Allocation</h3>
                <p className={styles.textPrg}>
                  Start your application for a Government Allocation.
                </p>
                <button className={styles.cardButton}>Read More</button>
              </div>
              <div onClick={handleShow1} className={styles.card}>
                <img src={icon} alt="icon" className={styles.icon} />
                <h3 className={styles.cardTitle}>
                  Property Registration Programme
                </h3>
                <p className={styles.textPrg}>
                  Start your application to regularize your property.
                </p>
                <button className={styles.cardButton}>Read More</button>
              </div>
              <div onClick={handleShow2} className={styles.card}>
                <img src={icon} alt="icon" className={styles.icon} />
                <h3 className={styles.cardTitle}>H.O.C</h3>
                <p className={styles.textPrg}>
                  Complete your existing H.O.C application.
                </p>
                <button className={styles.cardButton}>Read More</button>
              </div>
              <div onClick={handleShow} className={styles.card}>
                <img src={icon} alt="icon" className={styles.icon} />
                <h3 className={styles.cardTitle}>Land Allocation</h3>
                <p className={styles.textPrg}>
                  Start your application for a Government Allocation.
                </p>
                <button className={styles.cardButton}>Read More</button>
              </div>
              <div onClick={handleShow1} className={styles.card}>
                <img src={icon} alt="icon" className={styles.icon} />
                <h3 className={styles.cardTitle}>
                  Property Registration Programme
                </h3>
                <p className={styles.textPrg}>
                  Start your application to regularize your property.
                </p>
                <button className={styles.cardButton}>Read More</button>
              </div>
              <div onClick={handleShow2} className={styles.card}>
                <img src={icon} alt="icon" className={styles.icon} />
                <h3 className={styles.cardTitle}>H.O.C</h3>
                <p className={styles.textPrg}>
                  Complete your existing H.O.C application.
                </p>
                <button className={styles.cardButton}>Read More</button>
              </div>
              <div onClick={handleShow} className={styles.card}>
                <img src={icon} alt="icon" className={styles.icon} />
                <h3 className={styles.cardTitle}>Land Allocation</h3>
                <p className={styles.textPrg}>
                  Start your application for a Government Allocation.
                </p>
                <button className={styles.cardButton}>Read More</button>
              </div>
              <div onClick={handleShow1} className={styles.card}>
                <img src={icon} alt="icon" className={styles.icon} />
                <h3 className={styles.cardTitle}>
                  Property Registration Programme
                </h3>
                <p className={styles.textPrg}>
                  Start your application to regularize your property.
                </p>
                <button className={styles.cardButton}>Read More</button>
              </div>
            </div>

            <div>
              <button className={styles.viewll}>View all services </button>
            </div>
          </section>

          {/* Service Section ends here */}

        </div>
      </div>
    </div>
  );
};

export default Application;
