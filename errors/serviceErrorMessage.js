function Message(message,trace,statusCode){
    this.message=message;
    this.trace=trace;
    this.statusCode=statusCode;
    this.type="service"
}
module.exports={
    getRejectResponse(message,statusCode=503,trace="no trace found"){
        return new Message(message,trace,statusCode);
    }
};