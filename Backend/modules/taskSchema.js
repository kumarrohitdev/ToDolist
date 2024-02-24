const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: [true, "Please enter title"],
    },
    Description: {
        type: String,
        required: [true, "Please enter description"],
    },
    Category: {
        required: [true, "Please select task Category"],
        type: String,
    }
});

module.exports = mongoose.model("taskData", taskSchema);
