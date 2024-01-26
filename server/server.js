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

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Learn React Today" }],
  [2, { priceInCents: 20000, name: "Learn CSS Today" }],
])

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map(item => {
        const storeItem = storeItems.get(item.id)
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        }
      }),
      success_url: `http://127.0.0.1/success.html`,
      cancel_url: `http://127.0.0.1/cancel.html`,
    })
    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})