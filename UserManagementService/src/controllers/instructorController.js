const instructor = require('../models/instructor');
const Instructor = require('../models/instructor');
const bodyParser = require('body-parser');
const router = require("express").Router();

// Get all instructors
const allInstructor= async (req, res) => {
    try {
        const instructors = await Instructor.find();

        // Format timestamps for each instructor
        const formattedInstructors = instructors.map(instructor => ({
            ...instructor.toObject(),
            createdAt: instructor.createdAt ? instructor.createdAt.toISOString() : null,
            updatedAt: instructor.updatedAt ? instructor.updatedAt.toISOString() : null
        }));

        res.json(formattedInstructors);
    } catch (error) {
        res.status(500).json({ status: "Error with fetching data", error: error.message });
    }
}

// Updating a instructor
const updateInstructor = async (req, res) => {
    try{
        let instructorId = req.params.id;
        const  { Instructorname, Email, Password } = req.body;

        const updateInstructor = {
            Instructorname,
            Email,
            Password
        }

        await Instructor.findByIdAndUpdate(instructorId, updateInstructor);

        const updatedInstructor = await Instructor.findById(instructorId);
        const formattedInstructor = {
            ...updatedInstructor.toObject(),
            createdAt: updatedInstructor.createdAt ? updatedInstructor.createdAt.toISOString() : null,
            updatedAt: updatedInstructor.updatedAt ? updatedInstructor.updatedAt.toISOString() : null
        };

        res.status(200).send({status: "Instructor Updated", instructor: formattedInstructor});
    } catch (error){
        res.status(500).send({ status: "Error with updating data", error: error.message });
    }
}

// Deleting a single instructor
const deleteiIstructor = async (req, res) => {
    try {
        let instructorId = req.params.id;

        await Instructor.findByIdAndDelete(instructorId);
        res.status(200).send({ status: "Instructor deleted" });
    } catch (error) {
        res.status(500).send({ status: "Error with delete instructor", error: error.message });
    }
}

// Get the details of a single instructor
const singleInstructor = async (req, res) => {
    try {
        let instructorId = req.params.id;

        const instructor = await Instructor.findById(instructorId);

        // Format timestamps for the fetched instructor
        const formattedInstructor = {
            ...instructor.toObject(),
            createdAt: instructor.createdAt ? instructor.createdAt.toISOString() : null,
            updatedAt: instructor.updatedAt ? instructor.updatedAt.toISOString() : null
        };

        res.status(200).send({ status: "Instructor fetched", instructor: formattedInstructor });
    } catch (error) {
        res.status(500).send({ status: "Error with fetching instructor", error: error.message });
    }
}

// Handle searching users
const searchInstructors = async (req, res) => {
    try {
        let result = await Instructor.find({
            $or: [
                {
                    Instructorname: { $regex: req.params.key },
                },
            ],
        });

        // Format timestamps for each instructor in the search result
        const formattedResult = result.map(instructor => ({
            ...instructor.toObject(),
            createdAt: instructor.createdAt ? instructor.createdAt.toISOString() : null,
            updatedAt: instructor.updatedAt ? instructor.updatedAt.toISOString() : null
        }));

        res.send(formattedResult);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    allInstructor,
    updateInstructor,
    deleteiIstructor,
    singleInstructor,
    searchInstructors
};

