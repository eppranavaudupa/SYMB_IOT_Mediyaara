const express = require('express');
const path = require('path');
const dotEnv = require('dotenv');

dotEnv.config();

const tabletScheduler = require('./tablet_scheduler');

const app = express();
const port = 3000;

app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the HTML form page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to handle form submission
app.post('/submit', (req, res) => {
  tabletScheduler(req.body);
  // Respond with a JSON message
  res.json({ message: 'Form submitted successfully' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
