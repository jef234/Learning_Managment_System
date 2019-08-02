const express = require("express"),
    session = require("express-session"),
    bodyParser = require("body-parser"),
    UserRouter = require("./routes/UserRoute"),
    DashboardRouter = require("./routes/DashboardRoute"),
    CourseRouter = require("./routes/CourseRoute"),
    Database = require("./helpers/database"),
    app = express()

Database.connection()

app.use(session({
    secret: "abcd1234",
    resave: false,
    saveUninitialized: true,
    cookie: {}
}));
app.set("view engine", 'ejs')

app.get("/", function (req, res) {
    res.redirect("/login");
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use("/", UserRouter)
app.use("/", CourseRouter)
app.use("/dashboard", DashboardRouter)

module.exports = app