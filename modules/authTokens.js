const jwt = require("jsonwebtoken");
const TOKEN_EXPIRATION_IN_SECONDS = 20 * 60;
const ALGORITHM = "HS256";
const env = require("dotenv");
env.config();

const ROLES = {
	EMPLOYEE: "DIGITAL_AIDED_SCHOOL_HRMS_TEAM_MEMBER",
	HR_ADVISOR: "DIGITAL_AIDED_SCHOOL_HRMS_TEAM_ADVISOR",
	HR_TEAM_LEADER: "DIGITAL_AIDED_SCHOOL_HRMS_TEAM_LEADER",
	NEW_HR_APPLICANT: "DIGITAL_AIDED_SCHOOL_HRMS_NEW_HR_APPLICANT",
	TEACHER: "DIGITAL_AIDED_SCHOOL_LMS_TEACHER",
	STUDENT: "DIGITAL_AIDED_SCHOOL_LMS_STUDENT",
	ADMIN:"ADMIN"
};
// module.exports.ROLES=ROLES;
const SECRET = process.env.TOKEN_SECRET || "SECRET";

const generateToken = (data, role) => {
	return new Promise((resolve, reject) => {
		if (!data || !role) {
			reject("data and role both are required");
		}
		if (!ROLES[role]) {
			reject("Not valid role");
		}
		if (!data.id) {
			reject("id field is required");
		}
		jwt.sign(
			{
				data: {
					token_details: data,
					role: role,
				},
			},
			SECRET,
			{
				expiresIn: TOKEN_EXPIRATION_IN_SECONDS,
				algorithm: ALGORITHM,
			},
			(err, encode) => {
				if (encode)
					resolve({
						token: encode,
						role: role,
					});
				else reject(err);
			}
		);
	});
};

module.exports.generateToken = generateToken;

const verifyToken = (token, requiredRole) => {
	return new Promise((resolve, reject) => {
		if (!token)
			reject({
				message: "Provide a valid token.",
			});
		jwt.verify(token, SECRET, {}, (err, decoded) => {
			if (decoded) {
				if (decoded.role === requiredRole) resolve(decoded);
				reject({
					message: "not required role",
				});
			} else {
				if (err.name === "TokenExpiredError") {
					reject({
						message: "Token expired",
					});
				}
				reject({
					message: "unable to verify tokens",
					stack: err,
				});
			}
		});
	});
};

module.exports.getTokenDetails = (token) => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, SECRET, {}, (err, decoded) => {
			if (decoded) {
				resolve(decoded);
			} else {
				if (err.name === "TokenExpiredError") {
					reject({
						message: "Token expired",
					});
				}
				reject({
					message: "unable to verify tokens",
					stack: err,
				});
			}
		});
	});
};

//===========================================================================

module.exports.tokenGenerateForEmployee = (data) => {
	return generateToken(data, "EMPLOYEE");
};
module.exports.tokenGenerateForHrTeamLeader = (data) => {
	return generateToken(data, "HR_TEAM_LEADER");
};
module.exports.tokenGenerateForHrAdvisor = (data) => {
	return generateToken(data, "HR_ADVISOR");
};
module.exports.tokenGenerateForHrApplicant = (data) => {
	return generateToken(data, "NEW_HR_APPLICANT");
};
module.exports.tokenGenerateForTeacher = (data) => {
	return generateToken(data, "TEACHER");
};
module.exports.tokenGenerateForStudent = (data) => {
	return generateToken(data, "STUDENT");
};
module.exports.tokenGenerateForAdmin = (data) => {
	return generateToken(data, "ADMIN");
};

//===========================================================================

module.exports.verifyTokenForEmployee = (data) => {
	return verifyToken(data, "EMPLOYEE");
};

module.exports.verifyTokenForHrTeamLeader = (data) => {
	return verifyToken(data, "HR_TEAM_LEADER");
};

module.exports.verifyTokenForHrAdvisor = (data) => {
	return verifyToken(data, "HR_ADVISOR");
};

module.exports.verifyTokenForHrApplicant = (data) => {
	return verifyToken(data, "NEW_HR_APPLICANT");
};

module.exports.verifyTokenForTeacher = (data) => {
	return verifyToken(data, "TEACHER");
};

module.exports.verifyTokenForStudent = (data) => {
	return verifyToken(data, "STUDENT");
};
module.exports.verifyTokenForAdmin = (data) => {
	return verifyToken(data, "ADMIN");
};

//===========================================================================
