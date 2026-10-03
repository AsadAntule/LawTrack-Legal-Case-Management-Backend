const mongoose = require("mongoose");

const billableHourSchema = new mongoose.Schema(
    {
        case: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Case",
            required: true
        },

        lawyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        hours: {
            type: Number,
            required: true,
            min: 0.1
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        date: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("BillableHour", billableHourSchema);