const express = require("express");

const {
    createClient,
    getClients,
    getClientById,
    updateClient
} = require("../Controllers/ClientController");

const protect = require("../Middleware/authMiddleware");
const authorizeRoles = require("../Middleware/roleMiddleware");

const router = express.Router();


router.post(
    "/",
    protect,
    authorizeRoles("lawyer"),
    createClient
);


router.get(
    "/",
    protect,
    authorizeRoles("lawyer"),
    getClients
);


router.get(
    "/:id",
    protect,
    getClientById
);


router.put(
    "/:id",
    protect,
    authorizeRoles("lawyer"),
    updateClient
);


module.exports = router;