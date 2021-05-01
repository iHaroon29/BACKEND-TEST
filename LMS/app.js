const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const hrRoutes = require("./routes/HR");
const teacherRoutes = require("./routes/Teachers");
const crmRoutes = require("./routes/CRM");
const studentRoutes = require("./routes/Students");
const adminRouter = require("./routes/Admin");
const authenticationRoutes = require("./routes/AuthenticationAndAuthorization");
const classroomRoutes = require("./routes/Classrooms");
const AssignmentRoutes = require("./routes/Assignment");
const AssignmentSubmissionRoutes = require("./routes/AssignmentSubmission");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", indexRouter);
app.use("/api/hr", hrRoutes);
app.use("/api/crm", crmRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/classroom", classroomRoutes);
app.use("/api/Assignment", AssignmentRoutes);
app.use("/api/AssignmentSubmmission", AssignmentSubmissionRoutes);
app.use("/api/admin", adminRouter);
app.use("/api/auth", authenticationRoutes);

module.exports = app;
