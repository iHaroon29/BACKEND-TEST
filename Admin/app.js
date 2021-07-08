var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();
const AdminRoutes = require("./admin.api");
const LMSTeacherRoutes = require("../LMS/lms.teacher.api");
const LMSStudentRoutes = require("../LMS/lms.student.api");
const AuthRoutes=require("../routes/authentication.api");

app.use(cors());
// view engine setup
app.set("views", path.join(__dirname, "../views/admin"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/admin/api", AdminRoutes);
app.use("/lms/api/teacher", LMSTeacherRoutes);
app.use("/lms/api/authenticated/teacher", require("../teacher/lms.teacher.api"));
app.use("/lms/api/student", LMSStudentRoutes);
app.use("/auth/api", AuthRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
