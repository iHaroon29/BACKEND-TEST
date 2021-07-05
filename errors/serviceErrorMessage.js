module.exports={
    getRejectResponse(message,statusCode=503,trace="no trace found"){
        return {
            message:message,
            trace:trace,
            statusCode:statusCode
        }
    }
};