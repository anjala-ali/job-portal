// Import dependencies
const express = require('express');
// const cors = require('cors');
const multer = require('multer');
require("./connection")
const path = require('path');
const fs = require('fs'); // Import fs for file operations
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');



// const authMiddleware = require('../middleware/authMiddleware'); // Middleware to verify token


// Import models
const jobModel=require('./model/Jobs.js');
const UserModel = require('./model/UserModel');
const AppliedJobModel = require('./model/AppliedJobModel');
const SavedJobModel = require('./model/SavedJobModel');


// Initialize
var app = express();



//middleware
app.use(express.json());
var cors = require('cors');

app.use(cors())



//API  

app.get('/', (req, res) => {
    res.send("message for trail")
})
app.get('/welcome', (req, res) => {
    res.send("message for trail")
})


app.use('/uploads', express.static('uploads'));



const adminCredentials = {
    username:'admin',
    password:'admin12',
    
};

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the folder to save files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Use the current timestamp as the filename
    }
});

const upload = multer({ storage: storage });


app.post('/register', upload.fields([{ name: 'photo' }, { name: 'resume' }]), async (req, res) => {
    try {
        const { fullname, email, username, password, place, age, qualification } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const photo = req.files['photo'] ? req.files['photo'][0].filename : null;
        const resume = req.files['resume'] ? req.files['resume'][0].filename : null;

        const user = new UserModel({
            fullname,
            email,
            username,
            password: hashedPassword,
            place,
            age,
            qualification,
            photo,
            resume
        });
        await user.save();
        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).send({ message: 'Error registering user', error: error.message });
    }
});

app.post('/login', async (req, res) => {
  try {
      const { username, password } = req.body;
 
      // Check if the username matches the hardcoded admin username
      if (username === adminCredentials.username) {
          // Compare the password
          if (password === adminCredentials.password) {
              // Generate token for admin
              const token = jwt.sign({ role: 'admin' }, 'your_jwt_secret_key', { expiresIn: '1h' });
              return res.json({ token, role: 'admin' });
          } else {
              return res.status(401).json({ message: 'Invalid credentials' });
          }
      }
 
      // Otherwise, check the database for the user credentials
      const user = await UserModel.findOne({ username });
      if (!user) {
          return res.status(401).json({ message: 'Invalid credentials' });
      }
 
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(401).json({ message: 'Invalid credentials' });
      }
 
      const token = jwt.sign({ userId: user._id, role: user.role }, 'your_jwt_secret_key', { expiresIn: '1h' });
      res.json({ token, role: user.role, userId: user._id });
  } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Server error' });
  }
 });




// API to apply for a job
app.post('/apply', async (req, res) => {
  const { userId, jobId } = req.body;

  try {
      // Check if the job is already applied for by the user
      const alreadyApplied = await AppliedJobModel.findOne({ userId, jobId });
      if (alreadyApplied) {
          return res.status(400).json({ message: 'You have already applied for this job.' });
      }

      // Create a new application record
      const application = new AppliedJobModel({ userId, jobId });
      await application.save();

      res.status(200).json({ message: 'Job applied successfully' });
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server error' });
  }
});

app.get('/applied-jobs/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
      const appliedJobs = await AppliedJobModel.find({ userId })
          .populate('jobId') // Ensure this matches your JobModel schema
          .exec();
      
      console.log('Fetched applied jobs:', appliedJobs); // Log the fetched jobs
      res.status(200).json(appliedJobs);
  } catch (error) {
      console.log('Error fetching applied jobs:', error);
      res.status(500).json({ message: 'Server error' });
  }
});

app.post('/save-job', async (req, res) => {
  const { userId, jobId } = req.body;

  try {
      const existingSave = await SavedJobModel.findOne({ userId, jobId });
      if (existingSave) {
          return res.status(400).json({ success: false, message: 'Job already saved.' });
      }

      const savedJob = new SavedJobModel({ userId, jobId });
      await savedJob.save();

      res.status(201).json({ success: true, message: 'Job saved successfully.' });
  } catch (error) {
      console.error(`Error saving job for user ${userId}, job ${jobId}:`, error);
      res.status(500).json({ success: false, message: 'Server error' });
  }
});
app.get('/saved-jobs/:userId', async (req, res) => {
  const { userId } = req.params;


  try {
      // Check if JobModel is properly imported and used
      console.log('JobModel:', jobModel);

      const savedJobs = await SavedJobModel.find({ userId })
          .populate('jobId').exec();
      res.status(200).json(savedJobs);
  } catch (error) {
      console.error('Error fetching saved jobs:', error);
      res.status(500).json({ message: 'Server error' });
  }
});













//admin
  app.post('/add', async(request, response) => {
    try {
        await jobModel(request.body).save();
        response.send({ message: 'Job Added Successfully' })
    } catch (error) {
        console.log(error)
    }
})

app.get('/view', async (request, response) => {
    try {
        const result = await jobModel.find();
        response.send(result)
    } catch (error) {
        console.log(error)

    }
})

app.delete('/remove/:id', async (req, res) => {
    try {
        await JobsModel.findByIdAndDelete(req.params.id)
        res.send({message:'Data deleted'})
    } catch (error) {
        console.log(error)
    }
})
app.put('/update/:id', async (req, res) => {
    try {
       var data = await JobsModel.findByIdAndUpdate(req.params.id,req.body)
        res.send({ message: 'Data Updated',data })
    } catch (error) {
        console.log(error)
    }
})

// API to get all applied jobs with user and job details (Admin)
app.get('/admin/viewApplications', async (req, res) => {
  try {
      const applications = await AppliedJobModel.find()
          .populate('userId', 'fullname email')  // Populates user details
          .populate('jobId', 'JobTitle CompanyName Des Req Loc Sal Jobtype Industry');  // Populates job details
      
      res.status(200).json(applications);
  } catch (error) {
      console.error('Error fetching applications:', error);
      res.status(500).json({ message: 'Server error' });
  }
});


//Port
app.listen(3008, () => {
  console.log("port is up")
});