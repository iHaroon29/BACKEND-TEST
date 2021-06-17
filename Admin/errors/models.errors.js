function ModelException(message,statusCode=400){
    this.message=message;
    this.statusCode=statusCode;
}
module.exports={
    modelException(errorLog){
        if(errorLog.name!=="ValidationError"){
            return
        }
        let missingValue;
            missingValue=errorLog.message.split("Path")[1];
            throw new ModelException(missingValue);
        // console.log(missingValue);

    }
};