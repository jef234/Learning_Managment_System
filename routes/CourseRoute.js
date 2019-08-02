const router = require("express").Router(),
    CourseController = require("../controllers/CourseController")

function checkUser(req, res, next){
    console.log("Check user")
    console.log(req.session.user)
    if(typeof req.session.user !== "undefined"){
        console.log("Is User")
        next()
    } else {
        console.log("Failed user")
        res.redirect("/login")
    }
}

function checkAdmin(req, res, next){
    console.log("Check Admin")
    console.log(req.session.user)
    if(typeof req.session.user === "undefined"){
        console.log("not signed in")
        res.redirect("/login")
    } else {
        if(req.session.user.role === "admin"){
            console.log("Is admin")
            next()
        } else {
            console.log("Failed admin")
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