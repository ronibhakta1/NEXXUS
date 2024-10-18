const express = require("express");
const app = express();
const port = 3000;
const zod = require("zod");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const jwtSecretToken = "fx505Dt#!?rb";

// mongoose.connect("",{connectTimeoutMS:50000});
// this is Nexxus main database API

const jwtUsers= mongoose.model('users',{
    email: String,
    password:String
})
app.use(express.json());

app.post("/createUserJwtHash",zodCheck,async (req,res)=>{
    const email = req.headers.email;
    const password = req.headers.password;
    let userExist = await jwtUsers.findOne({email:email});
    if (userExist) {
        return res.status(401).json({
            msg:"User already exists!!"
        })
    } else {
        try {
            var token = jwt.sign({password:password },jwtSecretToken);
            await jwtUsers.create({email,password:token});
            res.json({
                msg:"User created successfully!!"
            })
        } catch (error) {
            res.status(401).json({
                msg:"Problem occured while uploading the data to database!!"
            })
        }
    }
});

app.post("/verifyJwt",async(req, res)=>{
    const email = req.headers.email;
    const password = req.headers.password;
    let userExist = await jwtUsers.findOne({email:email});
    if (!userExist) {
        return res.status(401).json({
            msg:"User doesnt exist!!"
        })
    } else {
        try {
            const realToken = userExist.password;
            const decoded = jwt.verify(realToken,jwtSecretToken);
            const tokenDecode = decoded.password;
            if (tokenDecode === password) {
                res.json({
                    msg:"User loggedin successfully!!"});
            } 
        } catch (error) {
            res.status(400).json({
                msg:"Wrong data inputs !!"
            });
        }
    }
})

function zodCheck(req,res,next){
    const email = req.headers.email;
    const password = req.headers.password;
    const emailSchema = zod.string().email();
    const passwordSchema = zod.string().min(8);
    const emailResponse = emailSchema.safeParse(email);
    const passwordResponse = passwordSchema.safeParse(password);
    if (!passwordResponse.success || !emailResponse) {
        return res.status(401).json({
            msg:"Inavlid input!!"
        })
    } else {
        next();
    }
}

app.use((err,req,res,next)=>{
    return res.status(401).json({
        msg:"Something is up the server!!"
    })
});

app.listen(port);