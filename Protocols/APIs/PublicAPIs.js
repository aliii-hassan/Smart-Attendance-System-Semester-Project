const express = require("express");
const app = express();

const { GetUsersAll, GetUsersOne } = require("../../Controllers/UserController");
const { GetStudentAll, GetStudentOne } = require("../../Controllers/StudentController");
const { GetEmployeeAll, GetEmployeeOne } = require("../../Controllers/EmployeeController");

app.get('/users', GetUsersAll);
app.get('/users/:id', GetUsersOne);
app.get('/students', GetStudentAll);
app.get('/students/:id', GetStudentOne);
app.get('/employees', GetEmployeeAll);
app.get('/employees/:id', GetEmployeeOne);

module.exports = app;