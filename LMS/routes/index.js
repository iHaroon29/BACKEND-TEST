const express = require("express");
const router = express.Router();
const { Users } = require("./DataValidators");
const authTokenManager = require("../../modules/authTokens");
const CourseSections = require("../../models/course.materials.model");
const models = require("../../models/lecture.attendances.model");
models
  .findById("507f1f77bcf86cd799439011")
  .then((result) => {
    // console.log(result)
  })
  .catch((err) => {
    console.log(err);
  });
const multer = require("../../modules/fileUploads");

models
  .findById("507f1f77bcf86cd799439011")
  .then((result) => {
    // console.log(result)
  })
  .catch((err) => {
    console.log(err);
  });

/* GET home page. */
router.get("/validate", function (req, res) {
  Users(req.body)
    .then((data) => {
      console.log("data", data);
    })
    .catch((err) => {
      console.log("err ", err);
    });

  return res.send("OK").status(200);
});
router.post("/gen_token", (req, res) => {
  authTokenManager
    .generateToken(req.body.data, req.body.role)
    .then((data) => {
      console.log(data);
      return res
        .send({
          token: data,
          status: "generated",
        })
        .status(202);
    })
    .catch((err) => {
      return res
        .send({
          message: err,
          status: "unable to generate token",
        })
        .status(400);
    });
});
router.post("/verify_token", (req, res) => {
  authTokenManager
    .verifyToken(req.body.data, req.body.role)
    .then((data) => {
      console.log(data);
      return res
        .send({
          message: data.data,
          status: "valid token",
        })
        .status(202);
    })
    .catch((err) => {
      console.error(err);
      return res
        .send({
          message: err,
          status: "invalid token",
        })
        .status(401);
    });
});

router.post("/upload/file", multer.single("file"), (req, res) => {
  console.log(req.file.destination);
  return res.send(req.file.filename).status(200);
});
router.get("/test", (req, res) => {
  CourseSections.find()
    .then((result) => {
      return res.send(result).status(200);
    })
    .catch((err) => {
      console.log(err);
      return res.send(err).status(500);
    });
});

module.exports = router;
