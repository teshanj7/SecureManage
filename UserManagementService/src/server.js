const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const connectToDatabase = require('./config/database');
const { authenticate } = require("./middleware/authMiddleware");

const passport = require("passport");
//const cookieSession = require("cookie-session");
const session = require('express-session');
const passportStrategy = require("./passport");
const cors = require("cors");


app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);


app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false } // Set `true` for HTTPS
    })
  );
  
  // Initialize Passport and session handling
  app.use(passport.initialize());
  app.use(passport.session());


//Initializing the port number
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(express.json());

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

// auth routes
const googleauthRouter = require('./routes/googleRoutes');
app.use('/google-auth',googleauthRouter);



