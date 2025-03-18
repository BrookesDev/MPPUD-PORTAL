import React, { useState } from 'react';
import Sidebar from "../../Components/Sidebar";
import Navbar from "../../Components/Navbar";
import Card from "../../Components/Card";
import Chart from "../../Components/Chart";
import Table from "../../Components/Table";
import styles from "../../styles/Dashboard.module.css";
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



const Dashboard = () => {

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
          <div className={styles.chartSection}>
            <Chart />
          </div>
          <div className={styles.tableSection}>
            <Table />
          </div>    

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
