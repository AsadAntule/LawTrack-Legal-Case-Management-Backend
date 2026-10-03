const Invoice = require("../Models/Invoice");
const Case = require("../Models/CAse");
const User = require("../Models/User");

const createInvoice = async (req, res) => {
    try {
        const {
            invoiceNumber,
            case: caseId,
            client,
            amount,
            status,
            issueDate
        } = req.body;

        if (
            !invoiceNumber ||
            !caseId ||
            !client ||
            amount === undefined
        ) {
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

        const existingClient = await User.findById(client);

        if (!existingClient || existingClient.role !== "client") {
            return res.status(404).json({
                message: "Client not found"
            });
        }

        const existingInvoice = await Invoice.findOne({
            invoiceNumber
        });

        if (existingInvoice) {
            return res.status(400).json({
                message: "Invoice number already exists"
            });
        }

        const invoice = await Invoice.create({
            invoiceNumber,
            case: caseId,
            client,
            amount,
            status,
            issueDate
        });

        res.status(201).json({
            message: "Invoice created successfully",
            invoice
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};


const getInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find()
            .populate("case", "title caseNumber caseType")
            .populate("client", "name email role")
            .sort({ issueDate: -1 });

        res.status(200).json({
            message: "Invoices fetched successfully",
            count: invoices.length,
            invoices
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};


const getInvoicesByCase = async (req, res) => {
    try {
        const invoices = await Invoice.find({
            case: req.params.id
        })
            .populate("case", "title caseNumber caseType")
            .populate("client", "name email role")
            .sort({ issueDate: -1 });

        res.status(200).json({
            message: "Case invoices fetched successfully",
            count: invoices.length,
            invoices
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};


module.exports = {
    createInvoice,
    getInvoices,
    getInvoicesByCase
};