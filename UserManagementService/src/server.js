const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const connectToDatabase = require('./config/database');
const { authenticate } = require("./middleware/authMiddleware");

const helmet = require("helmet"); // use helmet package for secure csp policy

//Initializing the port number
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(express.json());

app.use(helmet()); // use helmet package for enable various security policy
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    }
  })
) // use a csp policy for this express app

//database and server connection
connectToDatabase(process.env.MONGODB_URL);

app.listen(PORT, () => {
    console.log(`server is up and running on port number: ${PORT}`)
})

// auth routes
const authRouter = require('./routes/authRoutes');
app.use('/auth',authRouter);

// admin routes
const adminRouter = require('./routes/adminRoutes');
app.use('/admin', adminRouter);

// student routes
const studentRouter = require('./routes/studentRoutes');
app.use('/student', authenticate, studentRouter);

// instructor routes
const instructorRouter = require('./routes/instructorRoutes');
app.use('/instructor', authenticate, instructorRouter);

// role based authenticate
const authenticateRole = require('./routes/authenticateRole');
app.use('/authenticate-role', authenticateRole);


