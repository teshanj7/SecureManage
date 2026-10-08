const axios = require('axios');

const authenticateadminRole = async (req, res, next) => {
    try {
        // Extract token from request headers
        const token = req.headers.authorization.split(" ")[1];

        // Send request to user management service to authenticate user's role
        const response = await axios.get('http://localhost:3001/authenticate-role/admin', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // Check if authentication was successful
        if (response.status === 200 && response.data.message === "Admin access granted") {
            next();
        } else {
            res.status(403).json({ message: "Access denied, user does not have ADMIN role" });
        }
    } catch (error) {
        console.error("Error authenticating user role:", error);
        res.status(500).json({ message: "Access denied, user does not have ADMIN role" });
    }
};

const authenticateadminAndInstructorRole = async (req, res, next) => {
    try {
        // Extract token from request headers
        const token = req.headers.authorization.split(" ")[1];

        // Send request to user management service to authenticate user's role
        const response = await axios.get('http://localhost:3001/authenticate-role/adminAndInstructor', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // Check if authentication was successful
        if (response.status === 200 && response.data.message === "Admin and Instructor access granted") {
            next();
        } else {
            res.status(403).json({ message: "Access denied, user does not have roles matching ADMIN and INSTRUCTOR" });
        }
    } catch (error) {
        console.error("Error authenticating user role:", error);
        res.status(500).json({ message: "Access denied, user does not have roles matching ADMIN and INSTRUCTOR" });
    }
};

const authenticateadminAndStudentRole = async (req, res, next) => {
    try {
        // Extract token from request headers
        const token = req.headers.authorization.split(" ")[1];

        // Send request to user management service to authenticate user's role
        const response = await axios.get('http://localhost:3001/authenticate-role/adminAndStudent', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // Check if authentication was successful
        if (response.status === 200 && response.data.message === "Admin and Student access granted") {
            next();
        } else {
            res.status(403).json({ message: "Access denied, user does not have roles matching ADMIN and STUDENT" });
        }
    } catch (error) {
        console.error("Error authenticating user role:", error);
        res.status(500).json({ message: "Access denied, user does not have roles matching ADMIN and STUDENT" });
    }
};

const authenticatestudentRole = async (req, res, next) => {
    try {
        // Extract token from request headers
        const token = req.headers.authorization.split(" ")[1];

        // Send request to user management service to authenticate user's role
        const response = await axios.get('http://localhost:3001/authenticate-role/student', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // Check if authentication was successful
        if (response.status === 200 && response.data.message === "Student access granted") {
            next();
        } else {
            res.status(403).json({ message: "Access denied, user does not have STUDENT role" });
        }
    } catch (error) {
        console.error("Error authenticating user role:", error);
        res.status(500).json({ message: "Access denied, user does not have STUDENT role" });
    }
};

const authenticateinstructorRole = async (req, res, next) => {
    try {
        // Extract token from request headers
        const token = req.headers.authorization.split(" ")[1];

        // Send request to user management service to authenticate user's role
        const response = await axios.get('http://localhost:3001/authenticate-role/instructor', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // Check if authentication was successful
        if (response.status === 200 && response.data.message === "Instructor access granted") {
            next();
        } else {
            res.status(403).json({ message: "Access denied, user does not have INSTRUCTOR role" });
        }
    } catch (error) {
        console.error("Error authenticating user role:", error);
        res.status(500).json({ message: "Access denied, user does not have INSTRUCTOR role" });
    }
};

const authenticateinstructorAndStudentRole = async (req, res, next) => {
    try {
        // Extract token from request headers
        const token = req.headers.authorization.split(" ")[1];

        // Send request to user management service to authenticate user's role
        const response = await axios.get('http://localhost:3001/authenticate-role/instructorAndStudent', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // Check if authentication was successful
        if (response.status === 200 && response.data.message === "Instructor and Student access granted") {
            console.log("granted")
            next();
        } else {
            res.status(403).json({ message: "Access denied, user does not have roles matching INSTRUCTOR and STUDENT" });
        }
    } catch (error) {
        // console.error("Error authenticating user role:", error);
        res.status(500).json({ message: "Access denied, user does not have roles matching INSTRUCTOR and STUDENT" });
    }
};

const authenticateanyRole = async (req, res, next) => {
    try {
        // Extract token from request headers
        const token = req.headers.authorization.split(" ")[1];
        const headers = { Authorization: `Bearer ${token}` };

        // Allow instructors and students, otherwise fall back to checking for admin
        const roleChecks = ['instructorAndStudent', 'admin'];
        for (const role of roleChecks) {
            try {
                const response = await axios.get(`http://localhost:3001/authenticate-role/${role}`, { headers });
                if (response.status === 200) {
                    return next();
                }
            } catch (error) {
                // Role check rejected, try the next one
            }
        }

        res.status(403).json({ message: "Access denied, user does not have roles matching ADMIN, INSTRUCTOR or STUDENT" });
    } catch (error) {
        res.status(500).json({ message: "Access denied, user does not have roles matching ADMIN, INSTRUCTOR or STUDENT" });
    }
};

module.exports = {
    authenticateanyRole,
    authenticateadminRole,
    authenticateadminAndInstructorRole,
    authenticateadminAndStudentRole,
    authenticatestudentRole,
    authenticateinstructorRole,
    authenticateinstructorAndStudentRole,
};




