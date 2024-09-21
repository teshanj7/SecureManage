let Course = require("../models/course");
const authenticateRole = require("../middleware/authenticationRole");

// Create new course
const createCourse = async (req, res) => {
    const { UserId, CourseName, CourseCode, Description, Instructor, Price, Image, Duration, VideoLink } = req.body;

    // Validations
    if (Price <= 0 || typeof Price !== 'number') {
        return res.status(400).json({ message: 'Price must be a positive number!' });
    }
    if (!CourseName || !CourseCode || !Description || !Instructor || !Price || !Image || !Duration || !VideoLink) {
        return res.status(400).json({ message: 'All fields are required!' });
    }

    const newCourse = new Course({
        UserId,
        CourseName,
        CourseCode,
        Description,
        Instructor,
        Price,
        Image,
        Duration,
        VideoLink
    });

    try {
        await newCourse.save();
        res.status(201).json({ message: "Course created successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to create course. Please try again later." });
    }
};

// View all courses by userId
const getAllCoursesByUserId = async (req, res) => {
    const UserId = req.params.id;

    try {
        const courses = await Course.find({ UserId: UserId });
        res.json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// View all courses
const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Update a course by id
const updateCourse = async (req, res) => {
    const courseId = req.params.id;
    const { CourseName, CourseCode, Description, Instructor, Price, Duration, VideoLink } = req.body;

    // Validate input fields if necessary

    const updateCourse = {
        CourseName,
        CourseCode,
        Description,
        Instructor,
        Price,
        Duration,
        VideoLink
    };

    try {
        await Course.findByIdAndUpdate(courseId, updateCourse);
        res.status(200).send({ message: "Course successfully updated!" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Course update unsuccessful. Please try again later." });
    }
};

// Delete course by id
const deleteCourse = async (req, res) => {
    const courseId = req.params.id;

    try {
        await Course.findByIdAndDelete(courseId);
        res.status(200).send({ message: "Course deleted!" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Course deletion unsuccessful. Please try again later." });
    }
};

// View one specific course by id
const viewOneCourseById = async (req, res) => {
    const courseId = req.params.id;
    console.log(courseId);
    try {
        const course = await Course.findById(courseId);
        console.log(course);
        if (!course) {
            return res.status(404).send({ message: "Course not found!" });
        }
        res.status(200).json({ course });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error fetching the course. Please try again later." });
    }
};

// Search course
const searchCourse = async (req, res) => {
    const searchKey = req.params.key;
    try {
        let result = await Course.find({
            "$or": [
                { CourseName: { $regex: searchKey, $options: 'i' } },
                { Instructor: { $regex: searchKey, $options: 'i' } }
            ]
        });
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error searching for courses. Please try again later." });
    }
};

module.exports = {
    createCourse,
    getAllCoursesByUserId,
    getAllCourses,
    updateCourse,
    deleteCourse,
    viewOneCourseById,
    searchCourse
};
