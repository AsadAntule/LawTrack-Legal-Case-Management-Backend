const express = require("express")

const {
    createCase,
    getCases,
    getCaseById,
    updateCase,
    deleteCase
} = require("../Controllers/caseController");

const protect = require("../Middleware/authMiddleware")
const authorizedRoles = require("../Middleware/roleMiddleware")

const router = express.Router();

router.post("/", protect, authorizedRoles("lawyer"), createCase)

router.get("/", protect, getCases)
router.get("/:id", protect, getCaseById)
router.put("/:id", protect, authorizedRoles("lawyer"), updateCase)
router.delete("/:id", protect, authorizedRoles("lawyer"), deleteCase);


module.exports = router;