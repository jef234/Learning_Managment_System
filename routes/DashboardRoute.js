const router = require("express").Router(),
    DashboardController = require("../controllers/DashboardController"),
    UserController = require("../controllers/UserController")

router.get("/", UserController.authMiddleware, DashboardController.getTotalCourses, DashboardController.getTotalTests, DashboardController.dashboard)

module.exports = router