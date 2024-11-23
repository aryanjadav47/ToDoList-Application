const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const taskRoutes = require('./src/routers/taskRoutes');
const path = require('path');

dotenv.config();
connectDB();

const app = express();

app.use(bodyParser.json());
app.use('/api', taskRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve the frontend for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
