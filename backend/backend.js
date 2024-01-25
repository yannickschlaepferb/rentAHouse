const express = require("express");
const app = express();
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const http = require("http");

dotenv.config();
const saltRound = 10;

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

app.use(cors({
  origin : ["http://localhost:3000"],
  methods : ["GET", "POST", "DELETE"],
  credentials: true,
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



const pool = mysql.createPool({
  host: process.env.MARIADB_HOST,
  user: "root",
  password: process.env.MARIADB_ROOT_PASSWORD,
  database: process.env.MARIADB_DATABASE,
  connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT),
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to database: " + err.stack);
    return;
  }
  console.log("Connected to database ");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  pool.execute(
    "SELECT id, username, password FROM users WHERE username = ?",
    [username],
    (err, results) => {
      if (err) {
        console.error("Error during login:", err);
        return res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }

      if (results.length === 0) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid username or password" });
      }

      const user = results[0];
      console.log("user", user);

      bcrypt.compare(password, user.password, (err, isValid) => {
        if (err) {
          console.error("Error during password comparison:", err);
          return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
        }

        if (!isValid) {
          return res
            .status(401)
            .json({ success: false, message: "Invalid username or password" });
        }

        return res.json({
          success: true,
          message: "Login successful",
          userId: user.id,
        });
      });
    }
  );
});

//SIGNUP
app.post("/signup", (req, res) => {
  console.log("here");
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, saltRound, (err, hash) => {
    if (err) {
      console.log(err);
    }
    pool.execute(
      "INSERT INTO users (username, password) VALUES (?,?)",
      [username, hash],
      (err, result) => {
        console.log(err);
        console.log(result);
      }
    );
    res.json({ success: true, message: "User created successfully" });
  });
});

app.post("/room", (req, res) => {
  const roomname = req.body.room;

  pool.execute("SELECT id FROM rooms WHERE roomname = ?", [roomname], (selectErr, selectResult) => {
    if (selectErr) {
      console.log('Error checking room existence:', selectErr);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
      return;
    }

    if (selectResult.length > 0) {
      
      const roomId = selectResult[0].id;
      console.log('Room already exists. Room ID:', roomId);
      res.json({ success: true, message: 'Room already exists', roomId });
    } else {

      pool.execute("INSERT INTO rooms (roomname) VALUES (?)", [roomname], (insertErr, result) => {
        if (insertErr) {
          console.log('Error creating room:', insertErr);
          res.status(500).json({ success: false, message: 'Internal Server Error' });
          return;
        }
        const roomId = result.insertId;
        console.log('Room created successfully. Room ID:', roomId);
        res.json({ success: true, message: 'Room created successfully', roomId });
      });
    }
  });
});

app.get('/get-user/:username', (req, res) => {
const { username } = req.params;

pool.execute('SELECT * FROM users WHERE username = ?', [username], (error, results, fields) =>{
  if (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error'});
  } else {
    res.json({ success: true, message: results });
  }
})
});