function Message(message,trace){
    this.message=message;
    this.trace=trace;
    this.type="log"
}
module.exports={
    loggerErrorMessage(message,trace){
        return new Message(message,trace);
    }
};