const mongoose = require("mongoose")
const bcrypt = require('bcryptjs');

// Connect to database
const DB = "mongodb+srv://formvalidation:324331@cluster0.m9nzfgo.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(DB , {
}).then( () =>{
    console.log("connection perfect")
}).catch((error) =>{
    console.log("no connection")
})

// Define schema
const schema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:Number
    },
    password:{
        type:String
    },
    message:{
        type:String
        
    },
    cnfpassword:{
        type:String
    },

});

// This method is used to generate the bcrype password
schema.pre("save" , async function(next){
    try {
        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(this.password , salt)
        this.password = hashpassword;
        next()
    } catch (error) {
        next(error)
    }
})

// Define collection and schema
const  userdetail =mongoose.model("details" , schema);

// export the module
module.exports=userdetail

