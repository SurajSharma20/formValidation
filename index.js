const express = require("express")
const app = express()
app.set("view engine" , "ejs")
app.use(express.json())
const route =require('./router')
const Router = require("./router")
app.use(express.urlencoded({extended:true}))
app.use(Router)

// Call the server
app.listen(3000, (req , res) =>{
    console.log('perfect')
})
