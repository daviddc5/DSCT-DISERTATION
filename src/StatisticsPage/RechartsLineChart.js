import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Label } from 'recharts';

const RechartsLineChart = ({ chartData }) => {
  return (
    <LineChart width={800} height={400} data={chartData}>
      <XAxis dataKey="date">
        <Label value="Time" offset={-3} position="insideBottom" />
      </XAxis>
      <YAxis>
        <Label value="Hours Worked" angle={-90} position='insideLeft' offset={10} />
      </YAxis>
      <Tooltip />
      <Legend />
      <CartesianGrid stroke="#f5f5f5" />
      <Line
        key="taskHours"
        type="monotone"
        dataKey="time"
        stroke="#4444d8"  
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
};

export default RechartsLineChart;
