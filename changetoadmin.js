require("./helpers/database").connection()

const User = require("./models/User")

User.findOne({ username: process.argv[2] })
    .then(user => {
        user.role = "admin"
        user.save().then(() => {
            console.log(user.username + " is now an Admin")
            process.exit()
        })
    })
