const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const teacherRoutes = require("./routes/Teachers");
const studentRoutes = require("./routes/Students");
const authenticationRoutes = require("./routes/AuthenticationAndAuthorization");
const classroomRoutes = require("./routes/Classrooms");
const Cors=require("cors");
const app = express();

app.use(Cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/lms/api/", studentRoutes);
app.use("/lms/api/", teacherRoutes);
app.use("/lms/api/", classroomRoutes);
app.use("/lms/auth/api/", authenticationRoutes);

module.exports = app;
