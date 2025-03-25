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
  AreaChart,
  Area,
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
  { name: "Total Amount Requested", value: 50000000, color: "#22C55E" },
  { name: "Amount Approved", value: 30000000, color: "#FACC15" },
  { name: "Total Amount Utilized", value: 15000000, color: "#0F172A" },
];

// Custom tick for smaller, bold months
const CustomXAxisTick = (props: any) => {
  const { x, y, payload } = props;
  return (
    <text
      x={x}
      y={y + 10} // Adjust position
      textAnchor="middle"
      fontSize={10} // Tiny font size
      fontWeight="bold" // Bold font
      fill="#4B5563" // Dark grey color
    >
      {payload.value}
    </text>
  );
};

const Chart = () => {
  return (
    <div className={styles.chartsContainer}>
      {/* Budget Performance Line & Area Chart */}
      <div className={styles.chartBox}>
        <div className={styles.header}>
          <h3>Budget Performance</h3>
          <select>
            <option>This year</option>
            <option>Last year</option>
            <option>2 years Ago</option>
          </select>
        </div>
        <h2 className={styles.amount}>
          ₦50,000,000 <span className={styles.percentChange}>5% 📈</span>
        </h2>

        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={budgetData}>
            {/* Y-Axis grid only */}
            <CartesianGrid
              strokeDasharray="0"
              strokeOpacity={0.3}
              horizontal={true}
              vertical={false}
            />

            {/* X & Y Axes */}
            <XAxis dataKey="month" tick={<CustomXAxisTick />} />
            <YAxis />
            <Tooltip />

            {/* Subtle red area fill */}
            <Area
              type="monotone"
              dataKey="amount"
              stroke="orange"
              fill="red"
              fillOpacity={0.05}
            />

            {/* Orange and Yellow Line Overlays */}
            <Line
              type="monotone"
              dataKey="amount"
              stroke="orange"
              strokeWidth={3}
            />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#FACC15"
              strokeWidth={3}
              dot={{ r: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Budget Summary Pie Chart */}
      <div className={styles.chartBox}>
        <div className={styles.header}>
          <h3>Budget Summary</h3>
          <select>
            <option>Last 3 months</option>
            <option>Last 2 months</option>
            <option>Last 1 month</option>
            <option>Last 122 months</option>
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
              paddingAngle={0}
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
