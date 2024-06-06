const net = require("node:net");

const socket = net.createConnection({
  host: "127.0.0.1",
  port: 3099,
}, () =>{
  const buffer = Buffer.alloc(2);
  
  buffer[0] = 12;
  buffer[1] = 34;
  
  socket.write(buffer);
});
