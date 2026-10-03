const express = require("express");

const {
    sendNotification
} = require("../Controllers/notificationController");

const protect = require("../Middleware/authMiddleware");
const authorizeRoles = require("../Middleware/roleMiddleware");

const router = express.Router();

router.post(
    "/send",
    protect,
    authorizeRoles("lawyer"),
    sendNotification
);

module.exports = router;