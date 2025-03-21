import React from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import classes from "../styles/Card.module.css";

const Card = ({ title, amount, data }) => {
  return (
    <div className={classes.card}>
      <div className={classes.cardContent}>
        <h4 className={classes.title}>{title}</h4>
        <p className={classes.amount}>₦{amount.toLocaleString()}<span className={classes.litnmbr}>.00</span></p>
        <span className={classes.percentage}>▲ 00%</span>
      </div>

      {/* Mini Line Chart */}
      <div className={classes.chartContainer}>
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
