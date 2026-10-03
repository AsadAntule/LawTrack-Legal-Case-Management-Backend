const express = require("express")

const {
    uploadDocument,
    getDocuments,
    getDocumentByCase
} = require("../Controllers/documentController")
const protect = require("../Middleware/authMiddleware")
const authorizedRoles = require("../Middleware/roleMiddleware")
const upload = require("../Middleware/uploadMiddleware")

const router = express.Router();

router.post("/",
    protect,
    authorizedRoles("lawyer"),
    upload.single("file"),
    uploadDocument
);

router.get("/",
    protect,
    getDocuments
);

router.get("/case/:id",
    protect,
    getDocumentByCase
);

module.exports = router;