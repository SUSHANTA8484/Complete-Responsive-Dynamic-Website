
const express = require("express");
const bodyparser = require("body-parser");
const  ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();
//const port = 3000;
app.use(express.static("public"))
app.set('view engine','ejs');
app.use(bodyparser.urlencoded({extended:true}));

mongoose.connect("mongodb://localhost:27017/kolkatadataonlyDB",{useNewUrlParser:true});
const fuserSchema = {
    name:{
    type:String,
    required:true,
    minLength:4
    },
    phone:{
       type:Number,
       required:true,
       minLength:10
    },
    email:{
    type:String,
    required:true,
    // validate(value){
    //     if(!validator.isEmail(value)){
    //         throw new Error("Invalid email id")
    //     }
    // }
    minLength:10,
    
    },
    massege:{
     type:String,
     required:true,
     minLength:50
    },
    date:{
        type:Date,
        default:Date.now
    }
};

const Fuser = new mongoose.model("Fuser",fuserSchema);

app.get("/", function(req, res){
    res.render("home");
})
app.get("/about", function(req, res){
    res.render("about");
})
app.get("/service", function(req, res){
    res.render("service");
})
app.get("/contact", function(req, res){
    res.render("contact");
})
app.get("/portfoli", function(req, res){
    res.render("portfoli");
})

app.post("/submit", function(req, res){
    const newFuser = new Fuser({
        name:req.body.name,
        phone:req.body.phone,
        email:req.body.email,
        massege:req.body.massege
    });
    newFuser.save(function(err){
        if(err){
            res.render("portfoli");
        }else{
           res.render("home");
        }
    })
})

// app.post("/login", function(req, res){
//     const userName = req.body.userName,
//     const password = req.body.password 
// })

app.listen(3000, function(){
    console.log("server runnint port 3000.");
})