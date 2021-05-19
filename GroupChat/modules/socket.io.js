const server=require("./httpServer");
const socket=require("socket.io");
const io=socket(server);
io.on("connection",socket=>{
    console.log(socket)
});
module.exports={
    socket, 
    server
};


