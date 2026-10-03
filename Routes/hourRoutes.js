const express = require("express");

const {
    addHours,
    getHours,
    getHoursByCase
} = require("../Controllers/hourController");

const protect = require("../Middleware/authMiddleware");
const authorizeRoles = require("../Middleware/roleMiddleware");

const router = express.Router();

router.post(
    "/",
    protect,
    authorizeRoles("lawyer"),
    addHours
);

router.get(
    "/",
    protect,
    getHours
);

router.get(
    "/case/:id",
    protect,
    getHoursByCase
);

module.exports = router;