const router = require("express").Router(),
    UserController = require("../controllers/UserController")

router.get("/login", UserController.loginForm)
router.post("/login", UserController.login)

router.get("/register", UserController.registerForm)
router.post("/register", UserController.register)

router.get("/logout", UserController.logout)

module.exports = router