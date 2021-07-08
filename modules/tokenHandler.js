const jwt = require("jsonwebtoken");
const TOKEN_EXPIRATION_IN_SECONDS = 20 * 60*60;
const ALGORITHM = "HS256";
const env = require("dotenv");
const SECRET = process.env.TOKEN_SECRET || "SECRET";
env.config();

const TokenErrorMessages={
    TOKEN_EXPIRED:"Token expired",
    INVALID_TOKEN_PROVIDED:"Provide a valid token",
    TOKEN_VERIFICATION_MODULE_ERROR:"unable to verify tokens"
};


module.exports={
    encodeWithRole(data,role,tokenValidationTimeInSeconds=TOKEN_EXPIRATION_IN_SECONDS){
        return new Promise((resolve,reject)=>{
            jwt.sign(
                {
                    token_details: data,
                    role:role
                },
                SECRET,
                {
                    expiresIn: tokenValidationTimeInSeconds,
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
        })
    },
    encodeWithoutRole(data,tokenValidationTimeInSeconds=TOKEN_EXPIRATION_IN_SECONDS){
        return new Promise((resolve,reject)=>{
            jwt.sign(
                {
                    token_details: data
                },
                SECRET,
                {
                    expiresIn: tokenValidationTimeInSeconds,
                    algorithm: ALGORITHM,
                },
                (err, encode) => {
                    if (encode)
                        resolve({
                            token: encode
                        });
                    else reject(err);
                }
            );
        })
    },
    decodeToken(token){
        return new Promise((resolve, reject) => {
            if (!token)
                reject({
                    message: TokenErrorMessages.INVALID_TOKEN_PROVIDED,
                });
            jwt.verify(token, SECRET, {}, (err, decoded) => {
                if (decoded) {
                    resolve(decoded);
                } else {
                    if (err.name === "TokenExpiredError") {
                        reject({
                            message:TokenErrorMessages.TOKEN_EXPIRED ,
                        });
                    }
                    reject({
                        message: TokenErrorMessages.TOKEN_VERIFICATION_MODULE_ERROR,
                        stack: err,
                    });
                }
            });
        });
    }
};