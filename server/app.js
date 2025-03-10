const express = require("express");
const cors = require("cors")
const http = require('http')
const {Server} = require("socket.io")
const log = require("./logger.js");
const setupIO = require("./io.js");
const { createUser, saveUser, getUser, updateUser } = require("./database.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();
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


const JWT_SECRET = "mySecret";

function generateToken(user){
    return  jwt.sign({
        id: user.id,
        email: user.email
    }, 
        JWT_SECRET,{
            expiresIn: "1h"
        }
    )
}


app.post("/signup",async (req,res) => {
    console.log("This is a body:")
    console.log(req.body);
    let {name, email, password} = req.body;
    name = name.trim().toLowerCase();
    email = email.trim().toLowerCase();
    password = password.trim();

    if(!name || !email || !password){
       return res.status(400).json({status: 400, message: "Invalid SignUp Info"});
    }
    
    if(getUser(email)){
        return res.json({status: 400, message: "User Already exist"});

    }

    const hashedPassword = await bcrypt.hash(password, 10);


    const user = createUser(name, email, hashedPassword);
    saveUser(user);
    console.log(user)

    res.json({status: "ok", message: "YOu have been signed up and Logged in"});
})

app.post("/login", async (req, res) => {
    console.log(req.body);
    const {email, password} = req.body;

    const user = getUser(email);
    if(!user){
        return res.status(401).json({ status: 401, message: "Email not registered" });
    }

    const passwordMatching = await bcrypt.compare(password, user.password);
    if(!passwordMatching){
        return res.status(401).json({ status: 401, message: "Invalid credentials" });
    }


    const token = generateToken(user);

    res.cookie("token", token, {
        httpOnly: true,
        secure: false, 
        // sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 1 // because 1 hour is the expire time in jwt token
    })
    console.log("token:",token);

    res.json({status: "ok", message: "You have been logged in"});
})

function authenticate(req, res, next){
    const token = req.cookies.token;
    console.log(req.cookies);
    if(!token) return  res.status(403).json({status: 403, message: "Unauthorized"});

    jwt.verify(token, JWT_SECRET, (err, user) =>{
        console.log(err)
        if(err) return res.status(403).json({ status: 403, message: "Invalid token" });
        req.user = user;
        next();
    })

}

app.get("/isLoggedIn", authenticate, async (req, res) => {
    console.log("authorized");
    res.json({status: 200, message: "Authorized"})
})


setupIO(io);



server.listen(3000,()=> {
    console.log("Server has started");
});


