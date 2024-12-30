const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = 3308;

app.use(cors());
app.use(express.json());

// MySQL database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "signup",
  port: 3307,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err.message);
  } else {
    console.log("Connected to the MySQL database");
  }
});

// Create (Signup)
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = "INSERT INTO login (name, email, password) VALUES (?, ?, ?)";
  db.query(sql, [name, email, password], (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).json({ error: "Email already exists" });
      }
      console.error("Database Error:", err);
      return res.status(500).json({ error: "Database error occurred" });
    }
    res.status(201).json({ message: "User registered successfully!" });
  });
});

// Read (Get all users)
app.get("/users", (req, res) => {
  const sql = "SELECT id, name, email, password FROM login";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ error: "Database error occurred" });
    }
    res.status(200).json(results);
  });
});

// Read (Get a single user by ID)
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT id, name, email, password  FROM login WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ error: "Database error occurred" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(results[0]);
  });
});

// Update (Edit user by ID)
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = "UPDATE login SET name = ?, email = ?, password = ? WHERE id = ?";
  db.query(sql, [name, email, password, id], (err, result) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ error: "Database error occurred" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully!" });
  });
});

// Delete (Remove user by ID)
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM login WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ error: "Database error occurred" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully!" });
  });
});

// Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const sql = "SELECT * FROM login WHERE email = ?";
  db.query(sql, [email], (err, result) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ error: "Database error occurred" });
    }

    if (result.length > 0) {
      const user = result[0];
      if (user.password === password) {
        res.status(200).json({ message: "Login successful" });
      } else {
        res.status(401).json({ error: "Invalid password" });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  });
});


app.get("/employee", (req, res) => {
  const query = "SELECT * FROM employee";
  
  db.query(query, (err, results) => {  
    if (err) {
      console.error("Error fetching data: ", err);
      return res.status(500).json({ error: "Failed to fetch employee data" });
    }
    res.json(results);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
