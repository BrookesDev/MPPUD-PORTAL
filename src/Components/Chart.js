import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import styles from "../styles/Chart.module.css";

const budgetData = [
  { month: "Jan", amount: 12000000 },
  { month: "Feb", amount: 18000000 },
  { month: "Mar", amount: 22000000 },
  { month: "Apr", amount: 25000000 },
  { month: "May", amount: 32000000 },
  { month: "Jun", amount: 29000000 },
  { month: "Jul", amount: 31000000 },
  { month: "Aug", amount: 28000000 },
  { month: "Sep", amount: 30000000 },
  { month: "Oct", amount: 35000000 },
  { month: "Nov", amount: 34000000 },
  { month: "Dec", amount: 33000000 },
];

const summaryData = [
  { name: "Total Amount Requested", value: 50000000, color: "#FACC15" },
  { name: "Amount Approved", value: 30000000, color: "#22C55E" },
  { name: "Total Amount Utilized", value: 15000000, color: "#0F172A" },
];

const Chart = () => {
  return (
    <div className={styles.chartsContainer}>
      {/* Budget Performance Line Chart */}
      <div className={styles.chartBox}>
        <div className={styles.header}>
          <h3>Budget Performance</h3>
          <select>
            <option>This year</option>
          </select>
        </div>
        <h2 className={styles.amount}>₦50,000,000</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={budgetData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="amount" stroke="#FACC15" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Budget Summary Pie Chart */}
      <div className={styles.chartBox}>
        <div className={styles.header}>
          <h3>Budget Summary</h3>
          <select>
            <option>last 3 months</option>
          </select>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={summaryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
            >
              {summaryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
