const express = require("express");
const cors = require("cors")
const http = require('http')
const {Server} = require("socket.io")
const log = require("./logger.js");
const setupIO = require("./io.js");
const { createUser, saveUser, getUser, updateUser } = require("./database.js");
const cookieParser = require("cookie-parser");
const app = express();
const dotenv = require("dotenv");
const { trimUser } = require("./helpers/trimUser.js");
const { generateToken } = require("./helpers/generateToken.js");
const { hashPassword } = require("./helpers/hashPassword.js");
const { verifyPassword } = require("./helpers/verifyPassword.js");
const { authenticate } = require("./helpers/authenticate.js");
dotenv.config();

app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true, // Allow cookies to be sent with requests
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"]
    }
));
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET','POST']
    }
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const JWT_SECRET = process.env.JWT_SECRET || "mySecret";
exports.JWT_SECRET = JWT_SECRET;


app.post("/signup",async (req,res) => {
    console.log("This is a body:")
    console.log(req.body);
    let {name, email, password} = trimUser(req.body);

    if(!name || !email || !password){
       return res.status(400).json({status: 400, message: "Invalid SignUp Info"});
    }
    
    if(getUser(email)){
        return res.json({status: 400, message: "User Already exist"});

    }

    const hashedPassword = await hashPassword(password);

    const user = createUser(name, email, hashedPassword);
    saveUser(user);

    res.json({status: "ok", message: "YOu have been signed up and Logged in"});
})

app.post("/login", async (req, res) => {
    const {email, password} = trimUser(req.body);
    
    if(!email || !password){
        return res.status(400).json({status: 400, message: "Invalid Login Info"});
    }

    const user = getUser(email);
    if(!user){
        return res.status(401).json({ status: 401, message: "Email not registered" });
    }

    
    if(!await verifyPassword(password, user.password)){
        return res.status(401).json({ status: 401, message: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.cookie("token", token, {
        httpOnly: true,
        secure: false, 
        sameSite: process.env.NODE_ENV === "production" ? "none" : "Strict",
        maxAge: 1000 * 60 * 60 * 1 // because 1 hour is the expire time in jwt token
    })

    res.json({status: "ok", message: "You have been logged in"});
})

app.get("/isLoggedIn", authenticate, async (req, res) => {
    console.log("authorized");
    res.json({status: 200, message: "Authorized"})
})


setupIO(io);


const PORT = process.env.PORT || 3000
server.listen(PORT ,()=> {
    console.log("Server has started");
});


