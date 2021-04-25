/*
*
* module to use bcrypt for hashing and comparing passwords
*
 */

const bcrypt=require("bcrypt");
const saltRounds = 8;
bcrypt.genSaltSync(saltRounds);
/*
*
* function to generate hash and return as a JS promise
*
 */
module.exports.genHash=(stringToHash)=>{
    bcrypt.hashSync(stringToHash,(err,hash)=>{
        // initializing JS Promise
        return new Promise(((resolve, reject) => {
            if(err)
                reject("unable to produce hash");
            if(hash)
                resolve(hash);
        }));
    });
};

/*
*
* function to compare hash and return as a JS promise
*
 */

module.exports.compareHash=(compareTo,compareFrom)=>{
    // initializing JS Promise
    return new Promise((resolve, reject) => {
        bcrypt.comppare(compareFrom,compareTo,(err,result)=>{
            if(result)
                resolve(result);
            if(err)
                reject(err);

        });
    });
};

