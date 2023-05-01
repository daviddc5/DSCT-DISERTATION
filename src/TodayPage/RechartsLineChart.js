import React from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';



function RechartsLineChart({ chartData }) {
  // Generate unique tasks from the chartData
  const uniqueTasks = Array.from(
    new Set(chartData.map((data) => data.taskName))
  );

  // Aggregate data by date
  const dataByDate = chartData.reduce((acc, data) => {
    const existingData = acc.find((d) => d.date === data.date);
    if (existingData) {
      existingData[data.taskName] = (existingData[data.taskName] || 0) + data.hours;
    } else {
      acc.push({ date: data.date, [data.taskName]: data.hours });
    }
    return acc;
  }, []);



  return (
    <LineChart width={600} height={300} data={dataByDate}>
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />

      {uniqueTasks.map((task, index) => (
        <Line
          key={task}
          type="monotone"
          dataKey={task}
          stroke={index % 2 === 0 ? '#007bff' : '#dc3545'}
        />
      ))}
    </LineChart>
  );
}

export default RechartsLineChart;
