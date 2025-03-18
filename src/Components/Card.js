import React from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import styles from "../styles/Card.module.css";

const Card = ({ title, amount, data }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.amount}>₦{amount.toLocaleString()}.00</p>
        <span className={styles.percentage}>▲ 00%</span>
      </div>

      {/* Mini Line Chart */}
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height={50}>
          <LineChart data={data}>
            <Line type="linear" dataKey="value" stroke="#22C55E" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Card;
