function Message(message,statusCode=503) {
    this.message = message;
    this.statusCode = statusCode;
    this.type="authentication";
}

module.exports={
    getAuthErrorMessage(message,statusCode=401) {
       return new Message(message,statusCode);
    }
};