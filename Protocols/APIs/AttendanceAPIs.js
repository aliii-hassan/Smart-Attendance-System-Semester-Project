const express = require("express");
const app = express();

const AttendanceController = require("../../Controllers/AttendanceController");
const { InsertAttendance, UpdateAttendance, DeleteAttendance, ViewAttendanceAll, ViewAttendanceOne } = AttendanceController;

app.post('/', InsertAttendance);
app.put('/:id', UpdateAttendance);
app.delete('/:id', DeleteAttendance);
app.get('/', ViewAttendanceAll);
app.get('/:id', ViewAttendanceOne);

module.exports = app;