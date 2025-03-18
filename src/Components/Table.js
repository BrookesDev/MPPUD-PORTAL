import React from 'react';
import styles from '../styles/Table.module.css';

const Table = () => {
  const requests = [
    { id: 1, office: 'Finance Dept.', description: 'Office renovation budget', date: '16-02-2025 11:21AM', requested: '₦528,861.00', approved: '₦528,861.00', status: 'Approved' },
    // Add more rows as needed
  ];

  return (
    <div className={styles.table}>
      <h2>Request History</h2>
      <table>
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Office Name</th>
            <th>Description</th>
            <th>Request Date</th>
            <th>Amount Requested</th>
            <th>Amount Approved</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.office}</td>
              <td>{request.description}</td>
              <td>{request.date}</td>
              <td>{request.requested}</td>
              <td>{request.approved}</td>
              <td>{request.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;