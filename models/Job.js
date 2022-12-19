const mongoose = require("mongoose");

let jobSchema = new mongoose.Schema({
    company : {
        type: String,
        maxlength: 50,
        required: [true, "Company name is mandatory"]
    },
    position: {
        type: String,
        maxlength : 100,
        required: [true, "Position is mandatory"]
    },
    status: {
        type: String,
        enum: {
            values: ["interview", "pending", "declined"],
            message: '{VALUE} is not a valid status'
        },
        default: "pending"
    },
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref : 'User',
        required: [true, "User is required"]
    }
}, {timestamps: true})

let Job = mongoose.model("Job", jobSchema);

module.exports = {
    Job
}