const express = require("express")
const protect = require("../Middleware/authMiddleware")
const router = express.Router();

router.get("/protected", protect, (req, res) => {
    res.json({
        message: "You acessed a Protected Route",
        user: req.user
    })
});

module.exports = router;