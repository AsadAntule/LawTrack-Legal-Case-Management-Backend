const express = require("express")

const {
    createHearing,
    getHearings,
    getHearingsByCase
} = require("../Controllers/hearingController");

const protect = require("../Middleware/authMiddleware");
const authorizeRoles = require("../Middleware/roleMiddleware");
const router = express.Router();
router.post(
    "/",
    protect,
    authorizeRoles("lawyer"),
    createHearing
);

router.get(
    "/",
    protect,
    getHearings
);

router.get(
    "/case/:id",
    protect,
    getHearingsByCase

);

module.exports = router;