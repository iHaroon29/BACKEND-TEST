const Teachers = require("../models/teachers.model");
const AuthToken = require("../modules/authTokens");
const bcrypt = require("../modules/bcrypt");
const LoginSchema =
  require("../validators/AuthenticationAndAuthorization").MakeLogin;
const LoginActivity = require("../models/login.activity.model");

module.exports = {
  teacherLogin(loginDetails) {
    LoginSchema(loginDetails)
      .then((validLoginData) => {
        Teachers.findOne({ email: validLoginData.username })
          .then((teacher) => {
            //if teacher not found
            if (!teacher)
              return res.send("invalid username or password").status(401);
            const teacherPassword = teacher.password;
            // match password
            bcrypt
              .compareHash(validLoginData.password, teacherPassword)
              .then((passwordMatched) => {
                const role = teacher.role;
                if (role !== "TEACHER") {
                  return res.send("Unauthorized").status(401);
                }
                // generate auth token
                AuthToken.generateToken({ id: teacher._id }, role)
                  .then((token) => {
                    console.log(token);
                    const LoginActivityData = {
                      user_type: token.role,
                      user_id: teacher._id,
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
          .catch((errorInFindingteacher) => {
            console.log("unable to find teacher");
            // .status(500);
          });
      })
      .catch((invalidLoginDetails) => {
        console.log("please provide username and password");
        // .status(406); // 406--> Not acceptable
      });
  },
};
