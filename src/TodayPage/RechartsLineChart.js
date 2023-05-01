// RechartsLineChart.js

import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const RechartsLineChart = ({ chartData }) => {
  console.log('Received chart data:', chartData);

  

  return (
    <LineChart width={600} height={300} data={chartData}>
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <CartesianGrid stroke="#f5f5f5" />
      <Line
  key="taskHours"
  type="monotone"
  dataKey="time"
  stroke="#8884d8"
  activeDot={{ r: 8 }}
/>

    </LineChart>
  );
};

export default RechartsLineChart;
