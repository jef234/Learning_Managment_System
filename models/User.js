let mongoose = require("mongoose"),
    UserSchema = new mongoose.Schema({
        name: { type: String, required: true },
        username: { type: String, required: true, unique: true },
        passwordHash: { type: String, required: true },
        role: { type: String, default: "user" }
    }, {
            timestamps: true
    });

module.exports = mongoose.model("User", UserSchema);