let Course = require("../models/Course"),
    Test = require("../models/Test"),
    totalCourses = 0,
    totalTests = 0

exports.getTotalCourses = function (req, res, next) {
    Course.find().count().then(function (count) {
        totalCourses = count;
        next();
    });
}

exports.getTotalTests = function (req, res, next) {
    Test.find().count().then(function (count) {
        totalTests = count;
        next();
    });
}

exports.dashboard = (req, res) => {
    res.render("dashboard", {
        totalCourses: totalCourses,
        totalTests: totalTests,
        user: req.session.user
    })
}