const TokenHandler = require("./tokenHandler");
const env = require("dotenv");
env.config();

const TokenErrorMessages={
	TOKEN_EXPIRED:"Token expired",
	INVALID_TOKEN_PROVIDED:"Provide a valid token",
	NOT_REQUIRED_ROLE:"not required role",
	TOKEN_VERIFICATION_MODULE_ERROR:"unable to verify tokens"
};
// module.exports.TokenErrorMessages=TokenErrorMessages;

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

const generateToken = async (data, role) => {

	try{
		if (!data || !role) {
			throw new Error("data and role both are required");
		}
		if (!ROLES[role]) {
			throw new Error("Not valid role");
		}
		if (!data.id) {
			throw new Error("id field is required");
		}
		return await TokenHandler.encodeWithRole(data,role);

	}catch (e) {
		throw e;
	}
};

module.exports.generateToken = generateToken;

const verifyToken = (token, requiredRole) => {
	return new Promise((resolve,reject)=>{
		TokenHandler.decodeToken(token)
			.then(decoded=>{
				if(decoded.role && decoded.role.toLowerCase()!==requiredRole.toLowerCase()){
					reject("Not required Role")
				}
				resolve(decoded);
			}).catch(err=>{
				reject(err);
		})
	})
};

module.exports.getTokenDetails = (token) => {
	return TokenHandler.decodeToken(token);


	// new Promise((resolve, reject) => {
	// 	TokenHandler.decodeToken(token)
	// 		.then(decode)
	// 	jwt.verify(token, SECRET, {}, (err, decoded) => {
	// 		if (decoded) {
	// 			resolve(decoded);
	// 		} else {
	// 			if (err.name === "TokenExpiredError") {
	// 				reject({
	// 					message: TokenErrorMessages.TOKEN_EXPIRED,
	// 				});
	// 			}
	// 			reject({
	// 				message: TokenErrorMessages.TOKEN_VERIFICATION_MODULE_ERROR,
	// 				stack: err,
	// 			});
	// 		}
	// 	});
	// });
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
