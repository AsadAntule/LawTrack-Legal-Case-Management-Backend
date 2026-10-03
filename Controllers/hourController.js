const BillableHour = require("../Models/BillableHour");
const Case = require("../Models/CAse");

const addHours = async (req, res) => {
    try {
        const {
            case: caseId,
            hours,
            description,
            date
        } = req.body;

        if (!caseId || !hours || !description) {
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

        const billableHour = await BillableHour.create({
            case: caseId,
            lawyer: req.user.id,
            hours,
            description,
            date
        });

        res.status(201).json({
            message: "Billable hours added successfully",
            billableHour
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};


const getHours = async (req, res) => {
    try {
        const hours = await BillableHour.find()
            .populate("case", "title caseNumber caseType")
            .populate("lawyer", "name email role")
            .sort({ date: -1 });

        res.status(200).json({
            message: "Billable hours fetched successfully",
            count: hours.length,
            hours
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};


const getHoursByCase = async (req, res) => {
    try {
        const hours = await BillableHour.find({
            case: req.params.id
        })
            .populate("case", "title caseNumber caseType")
            .populate("lawyer", "name email role")
            .sort({ date: -1 });

        res.status(200).json({
            message: "Case billable hours fetched successfully",
            count: hours.length,
            hours
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};


module.exports = {
    addHours,
    getHours,
    getHoursByCase
};