const Student = require('../models/student');
const bodyParser = require('body-parser');
const router = require("express").Router();

// Get all users
const allStudents = async (req, res) => {
    try {
        const students = await Student.find();

        // Format the timestamps before sending the response
        const formattedStudents = students.map(student => ({
            ...student.toObject(),
            createdAt: student.createdAt ? student.createdAt.toISOString() : null,
            updatedAt: student.updatedAt ? student.updatedAt.toISOString() : null
        }));

        res.json(formattedStudents);
    } catch (error) {
        res.status(500).json({ status: "Error with fetching data", error: error.message });
    }
}

// Updating a student
const updateStudent = async (req, res) => {
    try{
        let studentId = req.params.id;
        const  { Fullname, Email, Password } = req.body;

        const updateStudent = {
            Fullname,
            Email,
            Password
        }
        await Student.findByIdAndUpdate(studentId, updateStudent);

        const updatedStudent = await Student.findById(studentId);
        const formattedStudent = {
            ...updatedStudent.toObject(),
            createdAt: updatedStudent.createdAt ? updatedStudent.createdAt.toISOString() : null,
            updatedAt: updatedStudent.updatedAt ? updatedStudent.updatedAt.toISOString() : null
        };

        res.status(200).send({ status: "Student Updated", student: formattedStudent });
    } catch (error){
        res.status(500).send({ status: "Error with updating data", error: error.message });
    }
}

// Deleting a single student
const deleteStudent = async (req, res) => {
    try {
        let studentId = req.params.id;

        await Student.findByIdAndDelete(studentId);
        res.status(200).send({ status: "Student deleted" });
    } catch (error) {
        res.status(500).send({ status: "Error with delete Student", error: error.message });
    }
}

// Get the details of a single student
const singleStudent = async (req, res) => {
    try {
        let studentId = req.params.id;

        const student = await Student.findById(studentId);

        // Format the timestamps before sending the response
        const formattedStudent = {
            ...student.toObject(),
            createdAt: student.createdAt ? student.createdAt.toISOString() : null,
            updatedAt: student.updatedAt ? student.updatedAt.toISOString() : null
        };
        res.status(200).send({ status: "Student fetched", student: formattedStudent });
    } catch (error) {
        res.status(500).send({ status: "Error with fetching student", error: error.message });
    }
}

// Handle searching students
const searchstudents = async (req, res) => {
    try {
        let result = await Student.find({
            $or: [
                {
                    Fullname: { $regex: req.params.key },
                },
            ],
        });

        // Format the timestamps in the search results
        const formattedResult = result.map(student => ({
            ...student.toObject(),
            createdAt: student.createdAt ? student.createdAt.toISOString() : null,
            updatedAt: student.updatedAt ? student.updatedAt.toISOString() : null
        }));
        res.send(formattedResult);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    allStudents,
    updateStudent,
    deleteStudent,
    singleStudent,
    searchstudents
};

