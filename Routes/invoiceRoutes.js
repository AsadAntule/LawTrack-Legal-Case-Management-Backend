const express = require("express");

const {
    createInvoice,
    getInvoices,
    getInvoicesByCase
} = require("../Controllers/invoiceController");

const protect = require("../Middleware/authMiddleware");
const authorizeRoles = require("../Middleware/roleMiddleware");

const router = express.Router();

router.post(
    "/",
    protect,
    authorizeRoles("lawyer"),
    createInvoice
);

router.get(
    "/",
    protect,
    getInvoices
);

router.get(
    "/case/:id",
    protect,
    getInvoicesByCase
);

module.exports = router;