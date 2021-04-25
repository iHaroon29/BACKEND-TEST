const bcrypt=require("bcrypt");
const saltRounds = 8;
bcrypt.genSaltSync(saltRounds);

module.exports.genHash=(stringToHash)=>{
    bcrypt.hashSync(stringToHash,(err,hash)=>{
        return new Promise(((resolve, reject) => {
            if(err)
                reject("unable to produce hash");
            if(hash)
                resolve(hash);
        }))
    });
};



module.exports.compareHash=(compareTo,compareFrom)=>{
    return new Promise((resolve, reject) => {
        bcrypt.comppare(compareFrom,compareTo,(err,result)=>{
            if(result)
                resolve(result);
            if(err)
                reject(err);

        });
    })


}

