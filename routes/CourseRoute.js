const router = require("express").Router(),
    CourseController = require("../controllers/CourseController")

function checkUser(req, res, next){
    if(typeof req.session.user !== "undefined"){
        next()
    } else {
        res.redirect("/login")
    }
}

function checkAdmin(req, res, next){
    if(typeof req.session.user === "undefined"){
        res.redirect("/login")
    } else {
        if(req.session.user.role === "admin"){
            next()
        } else {
            res.redirect("/dashboard")
        }
    }
}

router.get("/courses", [checkUser, CourseController.listCourses])
router.get("/courses/add", [checkAdmin, CourseController.addCourseForm])
router.post("/courses/add", [checkAdmin, CourseController.addCourse])

router.get("/tests/:courseId", [checkUser, CourseController.listTests])
router.get("/tests/:courseId/add", [checkAdmin, CourseController.addTestForm])
router.post("/tests/:courseId/add", [checkAdmin, CourseController.addTest])

module.exports = router