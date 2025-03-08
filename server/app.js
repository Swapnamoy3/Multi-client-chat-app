const express = require("express");
const cors = require("cors")
const http = require('http')
const {Server} = require("socket.io")
const log = require("./logger.js");
const setupIO = require("./io.js");

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET','POST']
    }
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/signup",(req,res) => {
    console.log("This is a body:")
    console.log(req.body);

    res.json({status: "ok", message: "YOu have been signed up and Logged in"});
})


setupIO(io);



server.listen(3000,()=> {
    console.log("Server has started");
});


