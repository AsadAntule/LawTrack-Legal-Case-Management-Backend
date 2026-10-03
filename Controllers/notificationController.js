const Notification = require("../Models/Notification");
const User = require("../Models/User");

const sendNotification = async (req, res) => {
    try {
        const {
            user,
            title,
            message,
            type
        } = req.body;

        if (!user || !title || !message) {
            return res.status(400).json({
                message: "User, title and message are required"
            });
        }

        const existingUser = await User.findById(user);

        if (!existingUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const notification = await Notification.create({
            user,
            title,
            message,
            type
        });

        // Send real-time notification using Socket.io
        if (req.io) {
            req.io.to(user.toString()).emit(
                "notification",
                notification
            );
        }

        res.status(201).json({
            message: "Notification sent successfully",
            notification
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

module.exports = {
    sendNotification
};