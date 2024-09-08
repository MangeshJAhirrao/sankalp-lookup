const express = require('express');
   const csv = require('csv-parser');
   const fs = require('fs');
   const cors = require('cors');

   const app = express();
   app.use(express.json());
   app.use(cors());

   const data = {};

   // Read and parse the CSV file
   fs.createReadStream('test_app_itenary.csv')
  .pipe(csv())
  .on('data', (row) => {
    // Trim whitespace and convert email to lowercase
    const email = row.Email.trim().toLowerCase();
    data[email] = row;
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });

  app.post('/api/lookup', (req, res) => {
    const email = req.body.email.trim().toLowerCase();
    if (data[email]) {
      res.json(data[email]);
    } else {
      res.status(404).json({ error: 'Email not found' });
    }
  });

   const PORT = process.env.PORT || 3001;
   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));