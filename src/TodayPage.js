import React, { useState } from "react";
import NavBar from "./NavBar/NavBar";
import Timer from "./Timer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import RechartsLineChart from './RechartsLineChart';

function TodayPage({ todos, setTodos }) {
const [selectedTask, setSelectedTask] = useState("");
const [hoursWorked, setHoursWorked] = useState(0);
const [chartData, setChartData] = useState({
labels: [],
datasets: [],
});

function handleTaskChange(event) {
setSelectedTask(event.target.value);
}

function handleHoursChange(event) {
setHoursWorked(Number(event.target.value));
}

function handleTimeLog(taskId, time) {
const newTodos = todos.map((task) => {
if (task.id === taskId) {
const timeLogged = task.timeLogged || [];
timeLogged.push({
date: new Date().toISOString(),
time: time,
});
return {
...task,
timeLogged: timeLogged,
};
} else {
return task;
}
});
setTodos(newTodos);
}

function handleHoursSubmit(event) {
event.preventDefault();
if (!selectedTask) {
alert('Please select a task');
return;
}
const newChartData = {
labels: chartData.labels.concat(new Date().toLocaleDateString()),
datasets: chartData.datasets.map((dataset) => {
if (dataset.label === selectedTask) {
const data = dataset.data || [];
data.push(hoursWorked);
return {
...dataset,
data: data,
};
} else {
return dataset;
}
}),
};
setChartData(newChartData);
setHoursWorked(0);
}

return (
<div>
<NavBar />
<Container className="my-5">
<Row className="justify-content-center">
<Col xs="12" md="6">
<div className="bg-light rounded-3 p-3">
<Timer onTimeLog={handleTimeLog} />
</div>
</Col>
<Col xs="12" md="6">
<div className="bg-light rounded-3 p-3">
<p>Select a task:</p>
<select
             value={selectedTask}
             onChange={handleTaskChange}
             className="form-select"
           >
<option value="">--Select a task--</option>
{todos.map((task) => (
<option key={task.id} value={task.id}>
{task.name}
</option>
))}
</select>
<form onSubmit={handleHoursSubmit}>
<label htmlFor="hours-input" className="form-label mt-3">
Hours worked today:
</label>
<input
               type="number"
               id="hours-input"
               className="form-control"
               value={hoursWorked}
               onChange={handleHoursChange}
             />
<button type="submit" className="btn btn-primary mt-3">
Log hours
</button>
</form>
</div>
</Col>
</Row>
<Row className="justify-content-center">
<Col xs="12" md="8">
<div className="bg-light rounded-3 p-3 mt-3">
<RechartsLineChart chartData={chartData} />
</div>
</Col>
</Row>
</Container>
</div>
);
}

export default TodayPage;