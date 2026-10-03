const Document = require("../Models/Document")
const Case = require("../Models/CAse")

const uploadDocument = async (req, res) => {
    try {
        const { case: { caseId, Description } } = req.body;

        if (!caseId) {
            return res.status(400).json({
                message: "CaseId is Required"
            })
        }

        if (!req.file) {
            return res.status(400).json({
                message: "File is Required"
            })
        }

        const existingCase = await Case.findById(caseId)
        if (!existingCase) {
            return res.status(404).json({
                message: "Case not Found"
            })
        }

        const document = await Document.create({
            case: caseId,
            uploadedBy: req.user.id,
            fileName: req.file.originalname,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            description
        });

        res.status(200).json({
            message: "Document Uploaded Successfully",
            document
        })
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        })
    }
};

const getDocuments = async (req, res) => {
    try {
        const documents = await Document.find()
            .populate("case", "title caseNumber, caseType")
            .populate("uploadedBy", "name email role")

        res.status(200).json({
            message: "Document Fethed Successfully",
            count: documents.length,
            documents
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        })
    }
};

const getDocumentByCase = async (req, res) => {
    try {
        const document = await Document.find({
            case: req.params.id
        })
            .populate("case", "title caseNumber caseType")
            .populate("uploadedBy", "name email role")

        res.status(200).json({
            message: "Case Document Fethched Successfully",
            count: documents.length,
            documents
        })
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        })
    }
};

module.exports = {
    uploadDocument,
    getDocuments,
    getDocumentByCase
};