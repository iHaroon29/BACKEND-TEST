const Students = require("../models/students.model");
const AuthToken = require("../modules/authTokens");
const bcrypt = require("../modules/bcrypt");
const LoginSchema = require("../validators/AuthenticationAndAuthorization").MakeLogin;
const LoginActivity = require("../models/login.activity.model");
const Student = require("../dao/students.dao");
const ServiceErrorMessage = require("../errors/serviceErrorMessage").getRejectResponse;
const AuthErrorMessage = require("../errors/authentication.errors").getAuthErrorMessage;
const StudentDao = require("../dao/students.dao")

module.exports = {
    async studentLogin(loginDetails) {
        try {
            const validLoginDetails = await LoginSchema(loginDetails);

            let student = await StudentDao.getStudentByEmail(validLoginDetails.username)

            student=student[0];

            if (!await bcrypt.compareHash(validLoginDetails.password, student.password)) {
                throw AuthErrorMessage("Invalid Credentials");

            }
            return await AuthToken.tokenGenerateForStudent({ email: student.email, id: student._id })
        }
        catch (e) {
            throw AuthErrorMessage(e.message || "Invalid Credentials");
        }
    },
    getStudentAuthToken(loginDetails) {
        return new Promise((resolve, reject) => {
            if (!loginDetails.email) {
                reject(ServiceErrorMessage("email not provided", 400))
            }
            if (!loginDetails.password) {
                reject(ServiceErrorMessage("email not provided", 400))
            }
            Student.getStudentByEmail(loginDetails.email)
                .then(details => {
                    bcrypt.compareHash(loginDetails.password, details.password)
                        .then(() => {
                            AuthToken.tokenGenerateForStudent({ id: details._id, email: details.email })
                                .then(token => {
                                    resolve(token);
                                })
                        }).catch(err => {
                            if (err === "texts doesn't match") {
                                reject(ServiceErrorMessage(" invalid username or password", 401))
                            }
                            reject(ServiceErrorMessage(err.message || "unable to check password "))
                        })
                }).catch(err => {
                    reject(ServiceErrorMessage(" invalid username or password", 401))

                })
        })
    }
};
