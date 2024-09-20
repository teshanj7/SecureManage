const Admin = require('../models/admin');
const bodyParser = require('body-parser');
const router = require("express").Router();

// Get all admin
const allAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();

        // Format the timestamps (if they exist) for each admin
        const formattedAdmins = admins.map(admin => ({
            ...admin.toObject(),
            createdAt: admin.createdAt ? admin.createdAt.toISOString() : null,
            updatedAt: admin.updatedAt ? admin.updatedAt.toISOString() : null
        }));

        res.json(formattedAdmins);
    } catch (error) {
        res.status(500).json({ status: "Error with fetching data", error: error.message });
    }
}

module.exports = { allAdmins }