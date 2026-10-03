const Client = require("../Models/Client");
const User = require("../Models/User");


const createClient = async (req, res) => {
    try {
        const {
            user,
            phone,
            address,
            dateOfBirth,
            occupation
        } = req.body;

        if (!user) {
            return res.status(400).json({
                message: "User ID is required"
            });
        }

        const existingUser = await User.findById(user);

        if (!existingUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (existingUser.role !== "client") {
            return res.status(400).json({
                message: "User must have client role"
            });
        }

        const existingClient = await Client.findOne({
            user
        });

        if (existingClient) {
            return res.status(400).json({
                message: "Client profile already exists"
            });
        }

        const client = await Client.create({
            user,
            phone,
            address,
            dateOfBirth,
            occupation
        });

        res.status(201).json({
            message: "Client profile created successfully",
            client
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};


const getClients = async (req, res) => {
    try {
        const clients = await Client.find()
            .populate("user", "name email role");

        res.status(200).json({
            message: "Clients fetched successfully",
            count: clients.length,
            clients
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};


const getClientById = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id)
            .populate("user", "name email role");

        if (!client) {
            return res.status(404).json({
                message: "Client not found"
            });
        }

        res.status(200).json({
            message: "Client fetched successfully",
            client
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};


const updateClient = async (req, res) => {
    try {
        const updatedClient = await Client.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        ).populate("user", "name email role");

        if (!updatedClient) {
            return res.status(404).json({
                message: "Client not found"
            });
        }

        res.status(200).json({
            message: "Client updated successfully",
            client: updatedClient
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};


module.exports = {
    createClient,
    getClients,
    getClientById,
    updateClient
};