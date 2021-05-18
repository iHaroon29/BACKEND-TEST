<<<<<<< HEAD
const socket = require('socket.io')
=======
const server=require("./httpServer");
const socket=require("socket.io");
const io=socket(server);
io.on("connection",socket=>{
    console.log(socket)
});
module.exports=socket;
>>>>>>> 193c244bc4ae58aa1b8072325f615dd0abd7357a
