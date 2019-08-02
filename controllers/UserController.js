const bcrypt = require("bcryptjs"),
    User = require("../models/User")


exports.loginForm = (req, res) => {
    // res.send("Login Form Works!")
    let error = req.session.errorMsg,
        success = req.session.successMsg
    req.session.errorMsg = ""
    req.session.successMsg = ""
    res.render("auth/login", {
        errorMsg: error,
        successMsg: success
    })
}

exports.registerForm = (req, res) => {
    // res.send("Register Form Works!")
    res.render("auth/register")
}

exports.login = (req, res) => {
    const { username, password } = req.body

    User.findOne({ username })
        .then((user) => {
            if (user && bcrypt.compareSync(password, user.passwordHash)) {
                req.session.user = {
                    username: user.username,
                    role: user.role
                }
                res.redirect("/dashboard")
            } else {
                req.session.errorMsg = "Invalid Credentials";
                res.redirect("/login")
            }
        })
}

exports.register = (req, res) => {
    const name = req.body.name,
        username = req.body.username,
        password = req.body.password,
        salt = bcrypt.genSaltSync(10),
        passwordHash = bcrypt.hashSync(password, salt)

    let user = new User()
    user.name = name
    user.username = username
    user.passwordHash = passwordHash

    user.save().then(() => {
        req.session.successMsg = user.username + " is now registered. Login to continue";
        res.redirect("/login")
    }).catch((err) => {
        console.log(err)
    })
}

exports.logout = (req, res) => {
    req.session.destroy()
    res.redirect("/login")
}

exports.authMiddleware = function (req, res, next) {
    if(typeof req.session.user === "undefined") {
        res.redirect("/login");
    } else {
        next();
    }
} 