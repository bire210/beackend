const { render } = require("ejs");
const express = require("express");
const usermodel = require("../models/model");
const jwt = require("jsonwebtoken");

const Router = express.Router();


Router.get("/", (req, res) => {
    res.render("index")
})


// add data
Router.post("/add", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const age = req.body.age;
    const password = req.body.password;
    // console.log(name,email);

    const newclub = new usermodel({
        name,
        email,
        age,
        password
    })

    newclub.save((err) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect("/")
        }
    })
})

Router.get("/login", (req, res) => {
    res.render("login")
})

//login 
let t;
Router.post("/login", async (req, res) => {
    const email = req.body.email;
    const pass = req.body.pass;
    console.log(req.body)
    try {
        const data = await usermodel.find({ email, pass });
        if (data.length > 0) {
            const token = jwt.sign({ course: 'backend' }, 'masai');
            t = token;
            res.send({ "msg": "login sucess", "token": token });
            console.log("Login is done");
        } else {
            res.send("Wrong credential");
            console.log("Wrong credential");
        }
    } catch (error) {
        console.log("error")
    }


})


//Show data

Router.get("/show", (req, res) => {

    const token = req.headers.authorization;
    // token=token[1];
    jwt.verify(t, 'masai', (err, decoded) => {
        if (err) {
            res.send("please login again");
            console.log(err)
        } else {
            usermodel.find((err, file) => {
                if (err) {
                    console.log(err)
                } else {
                    res.render("show", { students: file })

                }
            })
        }

    });

})



//Update

Router.get("/edit/:id", (req, res) => {
    console.log(req.params.id)
    const token = req.headers.authorization;
    // token=token[1];
    jwt.verify(t, 'masai', (err, decoded) => {
        if (err) {
            res.send("please login again");
            console.log(err)
        } else {
            usermodel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, file) => {
                if (err) {
                    console.log("Connot update");
                } else {
                    res.render("edit", { students: file })
                    console.log(req.params.id)
                }
            })
        }

    });

})


Router.post("/edit/:id", (req, res) => {
    const token = req.headers.authorization;
    // token=token[1];
    jwt.verify(t, 'masai', (err, decoded) => {
        if (err) {
            res.send("please login again");
            console.log(err)
        } else {
            usermodel.findByIdAndUpdate({ _id: req.params.id }, req.body, (err, docs) => {
                if (err) {
                    console.log(err)
                } else {
                    res.redirect("/show")
                }
            })
        }

    });



})


// Delete data

Router.get("/delete/:id", (req, res) => {
    const token = req.headers.authorization;
    // token=token[1];
    jwt.verify(t, 'masai', (err, decoded) => {
        if (err) {
            res.send("please login again");
            console.log(err)
        } else {
            usermodel.findByIdAndDelete({ _id: req.params.id }, req.body, (err, docs) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Deleted")
                    res.redirect("/show")
                }
            })
        }

    });






})


module.exports = Router;