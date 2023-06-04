const express = require("express");
const Router = express.Router();
const userdetail = require("./connection");
const bcrypt = require("bcryptjs");

// This is homepage by the nav bar
Router.get("/", (req, res) => {
  res.render("register")
});

// This is navbar login page
Router.get("/loginn", (req, res) => {
  res.render("login");
});

// This is Register page
Router.post("/registerpage", async (req, res) => {
  try {
    const data = new userdetail(req.body);  //Acess the userDetails
    if (data.password === data.cnfpassword) {
      const emailvalidation = await userdetail.findOne({ email: data.email });
      if (emailvalidation) {
        res.send("This email is already exit please login");
      }
      const savedata = await data.save();  //Through this save the userDetails in database
      res.render("login");
    } else {
      res.status(404).send("Does not match");
    }
  } catch (error) {
    res.status(404).send(error);
  }
});

// This is login page
Router.post("/login", async (req, res) => {
  try {
    const passworduser = req.body.password;   //Acess user password
    const checkemail = req.body.email;        //Acess user email
    const databasedata = await userdetail.findOne({ email: checkemail }); // Compare userEmail and dataBase Email
    const ismatch = bcrypt.compare(passworduser, databasedata.password); 
    if (ismatch) {
      res.render("contact");
    } else {
      res.status(404).send("please fill the correct passaword");
    }
  } catch (error) {
    res.status(404).send(error);
  }
});

// This is contact page
Router.post("/contact" , async(req  , res) =>{
  try {
    const data = new userdetail(req.body);
    res.send(data)
    // await data.save()
  } catch (error) {
    res.status(404).send(error);
  }
})

// This is Delete page
Router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const databasedata = await userdetail.findByIdAndDelete({ _id: id });
    res.send(databasedata);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = Router;
