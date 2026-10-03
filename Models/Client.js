const mongoose = require("mongoose")

const clientSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        Phone: {
            type: String,
            trim: true
        },

        address: {
            type: String,
            trim: true,
        },

        dateOfBirth: {
            type: Date
        },

        occupation: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Client", clientSchema)