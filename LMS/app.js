const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const teacherRoutes = require("./routes/Teachers");
const studentRoutes = require("./routes/Students");
const authenticationRoutes = require("./routes/AuthenticationAndAuthorization");
const classroomRoutes = require("./routes/Classrooms");
// const assignmentRoutes = require("./routes/Assignment");
const assignmentSubmissionRoutes = require("./routes/AssignmentSubmission");
const courseRoutes = require("./routes/Course");
const courseActivity = require("./routes/CourseActivity");
const courseMaterial = require("./routes/CourseMaterial");
const Lecture = require("./routes/Lecture");
const CourseSection = require("./routes/CourseSection");
const LectureAttendance = require("./routes/LectureAttendance");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", indexRouter);
app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/classroom", classroomRoutes);
// app.use("/api/Assignment", assignmentRoutes);
app.use("/api/AssignmentSubmmission", assignmentSubmissionRoutes);
app.use("/api/auth", authenticationRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/courseActivity", courseActivity);
app.use("/api/courseMaterial", courseMaterial);
app.use("/api/lecture", Lecture);
app.use("/api/courseSection", CourseSection);
app.use("/api/lectureAttendance", LectureAttendance);

module.exports = app;
