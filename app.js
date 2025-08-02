require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require("path");
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); 

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USERNAME,
  password: process.env.SQL_PASSWORD,       // Update if needed
  database: process.env.SQL_DATABASENAME,
  port: process.env.SQL_PORT // <-- Replace with your DB name
});

// Connect to DB
db.connect((err) => {
  if (err) throw err;
  console.log('✅ Connected to MySQL database');
});

// Register endpoint
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
console.log("Received Registration Data:", req.body);
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      name,
      email,
      password: hashedPassword
    };

    console.log("🧾 New User Registered:", user);

    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(
      sql,
      [user.name, user.email, user.password],
      (err, result) => {
        if (err) {
          console.error("❌ DB Insert Error:", err);
          return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json({ message: 'User registered successfully!' });
      }
    );
  } catch (error) {
    console.error("❌ Bcrypt or Server Error:", error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/login', (req, res) => {
  const { emailOrUsername, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ? OR name = ? LIMIT 1';
  db.query(sql, [emailOrUsername, emailOrUsername], async (err, results) => {
    if (err) {
      console.error("❌ DB Query Error:", err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'User not found' });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful', user: { id: user.id, name: user.name, email: user.email } });
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'loader.html'));
});


// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


