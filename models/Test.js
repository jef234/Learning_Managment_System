let mongoose = require("mongoose"),
    ObjectID = mongoose.Schema.Types.ObjectId,
    TestSchema = new mongoose.Schema({
        title: { type: String, required: true },
        description: { type: String },
        courseId: { type: ObjectID, required: true }
    },{
        timestamps: true
    });

module.exports = mongoose.model("Test", TestSchema);
