function MissingValueException(message,statusCode=400){
    this.message=message;
    this.statusCode=statusCode
};

module.exports={
    missingValue(errorLog){
        if(errorLog.details && errorLog._original){
            console.log("JOI");
            throw new MissingValueException(errorLog.details[0].message);
        }
    }
};