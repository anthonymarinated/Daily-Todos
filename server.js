const express = require("express");
const app = express();
const path = require("path");
const PORT = 3000;
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const db = require("./db");

app.use(cors());
//need to get data from client side - from request.body object
//gives us access to use request.body in order to get json data
app.use(express.json());

app.use(express.static(path.resolve(__dirname, "./dist")));

///Route to get all todos
app.get("/todos", async (req, res) => {
    const query = "SELECT * FROM todo";
    db.query(query)
      .then(response => {
        res.json(response.rows);
      })
  });
  
//Routing for posting a todo 
app.post("/todos", async (req, res) => {
    const { description } = req.body;
    const query = "INSERT INTO todo (description) VALUES($1) RETURNING *";
    const values = [description];
    db.query(query, values)
      .then(response => {
        res.json(response.rows[0]);
      })
});

//express allows us to quickly create  server from node.js
//cors allows different domain applications to interact with each other
//pg is there to connect our database with our server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
});


module.exports = app;