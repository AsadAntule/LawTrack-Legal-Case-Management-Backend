const mongoose = require("mongoose")
const hearingSchema = new mongoose.Schema(
    {
        case: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Case",
            required: true
        },

        date: {
            type: Date,
            required: true
        },

        courtName: {
            type: String,
            required: true,
            trim: true
        },

        purpose: {
            type: String,
            required: true,
            trim: true
        },

        status: {
            type: String,
            enum: [
                "Scheduled",
                "Completed",
                "Cancelled"
            ],
            default: "Scheduled"
        },

        notes: {
            type: String,
            trim: true
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },

    {
        timestamps: true
    }
);

module.exports = mongoose.model("Hearing", hearingSchema);