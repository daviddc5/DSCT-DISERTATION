import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Jan', Task1: 3, Task2: 2 },
  { name: 'Feb', Task1: 5, Task2: 6 },
  // Add more data points here
];

function RechartsLineChart() {
  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="Task1" stroke="#007bff" />
      <Line type="monotone" dataKey="Task2" stroke="#dc3545" />
    </LineChart>
  );
}

export default RechartsLineChart;
