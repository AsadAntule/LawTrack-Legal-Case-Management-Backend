const Hearing = require("../Models/Hearing");
const Case = require("../Models/CAse");

const createHearing = async (req, res) => {
    try {
        const {
            case: caseId,
            date,
            courtName,
            purpose,
            status,
            notes
        } = req.body;

        if (!caseId || !date || !courtName || !purpose) {
            return res.status(400).json({
                message: "Required fields are missing"
            });
        }

        const existingCase = await Case.findById(caseId);

        if (!existingCase) {
            return res.status(404).json({
                message: "Case not found"
            });
        }

        const hearing = await Hearing.create({
            case: caseId,
            date,
            courtName,
            purpose,
            status,
            notes,
            createdBy: req.user.id
        });

        res.status(201).json({
            message: "Hearing scheduled successfully",
            hearing
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};


const getHearings = async (req, res) => {
    try {
        const hearings = await Hearing.find()
            .populate("case", "title caseNumber caseType")
            .populate("createdBy", "name email role")
            .sort({ date: 1 });

        res.status(200).json({
            message: "Hearings fetched successfully",
            count: hearings.length,
            hearings
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};


const getHearingsByCase = async (req, res) => {
    try {
        const hearings = await Hearing.find({
            case: req.params.id
        })
            .populate("case", "title caseNumber caseType")
            .populate("createdBy", "name email role")
            .sort({ date: 1 });

        res.status(200).json({
            message: "Case hearings fetched successfully",
            count: hearings.length,
            hearings
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};


module.exports = {
    createHearing,
    getHearings,
    getHearingsByCase
};