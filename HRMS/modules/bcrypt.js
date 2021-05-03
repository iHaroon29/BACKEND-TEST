/*
*
* module to use bcrypt for hashing and comparing passwords
*
 */

const bcrypt=require("bcrypt");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
/*
*
* function to generate hash and return as a JS promise
*
 */
module.exports.genHash=(stringToHash)=>{
    console.log(stringToHash," ",salt);
        return bcrypt.hash(stringToHash,salt); // returns promise of hash
};

/*
*
* function to compare hash and return as a JS promise
*
 */

module.exports.compareHash=(plainText,encryptedText)=>{
    // initializing JS Promise
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainText,encryptedText)
            .then(result=>{
                if(!result)
                    reject("texts doesn't match"); // both texts doesn't match
                resolve(true) // if both texts matches
            })
            .catch(err=>{
                reject(err); // error by bcrypt compare method
            })
    });
};

