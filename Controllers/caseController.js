const Case = require("../Models/CAse")


const createCase = async (req, res) => {
    try {
        const {
            title,
            caseNumber,
            description,
            caseType,
            client,
            status,
            startDate
        } = req.body;

        if (
            !title ||
            !caseNumber ||
            !description ||
            !caseType ||
            !client
        ) {
            return res.status(400).json({
                message: "Required fields are missing"
            });
        }

        const existingCase = await Case.findOne({
            caseNumber
        });

        if (existingCase) {
            return res.status(400).json({
                message: "Case number already exists"
            });
        }

        const newCase = await Case.create({
            title,
            caseNumber,
            description,
            caseType,
            client,
            status,
            startDate,
            createdBy: req.user.id
        });
        res.status(201).json({
            message: "Case created successfully",
            case: newCase
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};


const getCases = async (req, res) => {
    try {
        const cases = await Case.find()
            .populate("client", "name email role")
            .populate("createdBy", "name email role");
        res.status(200).json({
            message: "Cases fetched successfully",
            count: cases.length,
            cases
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};



const getCaseById = async (req, res) => {

    try {
        const caseData = await Case.findById(req.params.id)
            .populate("client", "name email role")
            .populate("createdBy", "name email role");
        if (!caseData) {
            return res.status(404).json({
                message: "Case not found"
            });
        }
        res.status(200).json({
            message: "Case fetched successfully",
            case: caseData
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};


const updateCase = async (req, res) => {

    try {
        const updatedCase = await Case.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedCase) {
            return res.status(404).json({
                message: "Case not found"
            });
        }
        res.status(200).json({
            message: "Case updated successfully",
            case: updatedCase
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};



const deleteCase = async (req, res) => {
    try {
        const deletedCase = await Case.findByIdAndDelete(
            req.params.id
        );
        if (!deletedCase) {
            return res.status(404).json({
                message: "Case not found"
            });
        }
        res.status(200).json({
            message: "Case deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

module.exports = {
    createCase,
    getCases,
    getCaseById,
    updateCase,
    deleteCase
};