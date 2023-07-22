const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const dbURL = process.env.DB_URL;
const apiKey = process.env.API_KEY;


// Connect to MongoDB (replace 'mongodb://localhost/mydatabase' with your actual MongoDB connection string)
mongoose.connect('mongodb://localhost/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// Define the user schema and model using Mongoose
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.model('User', userSchema);

// Routes for CRUD operations using Express Router
const usersRouter = require('./users');
app.use('/users', usersRouter);







app.get('/', (req, res) => {
  res.send('Hello, awesome this is the Express server!');
});

// Start the server and listen on port 3000
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
