const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { jsPDF } = require('jspdf');
const Pdf = require('./public/db');

dotenv.config();

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle form submission
app.post('/submit', async (req, res) => {
  try {
    const formData = req.body;
    const doc = new jsPDF();

    // Set heading as "Mediyaara"
    doc.setFontSize(16);
    doc.text("Mediyaara", 10, 10);

    // Set border for the page
    doc.rect(5, 5, doc.internal.pageSize.width - 10, doc.internal.pageSize.height - 10);

    let y = 30; // Start position below the heading
    for (const key in formData) {
      if (Array.isArray(formData[key])) {
        formData[key].forEach(val => {
          doc.text(`${key}: ${val}`, 10, y);
          y += 10;
        });
      } else {
        doc.text(`${key}: ${formData[key]}`, 10, y);
        y += 10;
      }
    }

    // Generate PDF and save it to a Buffer
    const pdfBuffer = doc.output('arraybuffer');

    // Create a new PDF document
    const newPdf = new Pdf({
      data: Buffer.from(pdfBuffer),
      contentType: 'application/pdf',
      filename: `form_data_${Date.now()}.pdf`
    });

    // Save PDF to MongoDB
    await newPdf.save();

    res.json({ message: 'Form submitted and PDF saved to MongoDB successfully' });
  } catch (error) {
    console.error('Error generating or saving PDF:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
