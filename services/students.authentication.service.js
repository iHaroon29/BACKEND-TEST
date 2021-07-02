const Students = require("../models/students.model");
const AuthToken = require("../modules/authTokens");
const bcrypt = require("../modules/bcrypt");
const LoginSchema =
  require("../validators/AuthenticationAndAuthorization").MakeLogin;
const LoginActivity = require("../models/login.activity.model");

module.exports = {
  studentLogin(loginDetails) {
    LoginSchema(loginDetails)
      .then((validLoginData) => {
        Students.findOne({ email: validLoginData.username })
          .then((student) => {
            //if student not found
            if (!student)
              return res.send("invalid username or password").status(401);
            const studentPassword = student.password;
            // match password
            bcrypt
              .compareHash(validLoginData.password, studentPassword)
              .then((passwordMatched) => {
                const role = student.role;
                if (role !== "STUDENT") {
                  return res.send("Unauthorized").status(401);
                }
                // generate auth token
                AuthToken.generateToken({ id: student._id }, role)
                  .then((token) => {
                    console.log(token);
                    const LoginActivityData = {
                      user_type: token.role,
                      user_id: student._id,
                      activity: { token: token.token },
                      has_logged_out: false,
                    };
                    // saving login
                    new LoginActivity(LoginActivityData)
                      .save()
                      .then((r) => {
                        console.log("new user logged in ", r);
                      })
                      .catch(() => {});
                    return token;
                    // return res.send(token).status(202);
                  })
                  .catch((unableToGenerateAuthToken) => {
                    console.log(
                      "unable to make you login please try again later"
                    );
                  });
              })
              .catch((invalidPassword) => {
                console.log("invalid username or password");
                // .status(401);
              });
          })
          .catch((errorInFindingStudent) => {
            console.log("unable to find student");
            // .status(500);
          });
      })
      .catch((invalidLoginDetails) => {
        console.log("please provide username and password");
        // .status(406); // 406--> Not acceptable
      });
  },
};
