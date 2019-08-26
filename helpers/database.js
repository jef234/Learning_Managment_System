// import { Mongoose } from "mongoose";
let mongoose = require("mongoose");

exports.connection = function () {
    mongoose.connect(
        process.env.MONGODB_URI || "mongodb://localhost:27018/lms",
        { useNewUrlParser: true, useCreateIndex: true },
        function (err) {
            if (!err) {
                console.log("DB Connected");
            }
        }
    );
}