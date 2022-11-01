const express = require("express"); //express allows us to quickly create  server from node.js
const app = express();
const path = require("path");
const PORT = 3000;
const cors = require("cors"); //cors allows different domain applications to interact with each other
const dotenv = require("dotenv");
dotenv.config();
const todoController = require("./controllers/todoController");
const db = require("./models/db.js");

//middleware
app.use(cors());

//need to get data from client side - from request.body object
//express.json() gives us access to use request.body in order to get json data
app.use(express.json());

// serve static files
app.use(express.static(path.resolve(__dirname, "../dist")));

//On the client side - whenever we click 'submit', 'edit', or 'delete' buttons,
//the onClick function sends an HTTP request to my restful API (server), 
//and depending on the HTTP request and route being hit it is going to
//instruct my database on what CRUD operation needs to be performed.

//A RESTful API(server|routes) uses transfer protocal(is HTTP requests) in order to run CRUD operations.

if (process.env.NODE_ENV === "production") {
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./src/index.html"));
  });
}

///Route to get all todos
// app.get("/todos",  todoController.getPosts , (req, res) => {
//   res.status(200).json(res.locals.posts);
// }

app.get("/todos", todoController.getPosts, (req, res) => {
    // const query = "SELECT * FROM todo";
    // db.query(query)
    //   .then(response => {
    //     res.status(200);
    //     res.json(response.rows);
    //   })
    //   .catch(err => console.log(err)); //error handler
    res.status(200).json(res.locals.posts);
});

//Route to get a specific todo 
app.get("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM todo WHERE todo_id = $1";
  const values = [id];
  db.query(query, values)
    .then(response => {
      res.status(200);
      res.json(response.rows[0]);
    })
    .catch(err => console.log(err));
});

//Routing for posting a todo 
app.post("/todos", async (req, res) => {
    const { description } = req.body;
    const query = "INSERT INTO todo (description) VALUES($1) RETURNING *";
    const values = [description];
    db.query(query, values)
      .then(response => {
        res.status(200);
        res.json(response.rows[0]);
      })
      .catch(err => console.log(err));
});

//Route to update todo description 
app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  const query = "UPDATE todo SET description = $1 WHERE todo_id = $2";
  const values = [description, id];
  db.query(query, values)
    .then(response => {
      res.status(200);
      res.json('Todo updated');
    })
    .catch(err => console.log(err));
});

//Route for deleting todo
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM todo WHERE todo_id = $1"
  const values = [id];
  db.query(query, values)
    .then(response => {
      res.status(200);
      res.json('Todo deleted')
    })
    .catch(err => console.log(err));
});

// serve index.html on the route '/'
// app.get("/", (req, res) => {
//   return res.status(200).sendFile(path.join(__dirname, "./index.html"));
// });

app.use('*', (req, res) => res.status(404).sendFile(path.join(__dirname, '404.html')));
app.use((req, res) => res.status(404).json("Request sent to unknown page"));

//Error handling
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
});

module.exports = app;



/////// --------------------------------------------------------------------------------------------- \\\\\\\

///Route to get all todos
// app.get("/todos", async (req, res) => {
//   const allTodos = await db.query(
//     "SELECT * FROM todo"
//   );
//   res.json(allTodos.rows);
// });

//Route for posting a todo 
// app.post("/todos", async (req, res) => {
//     const { description } = req.body;
//     const newTodo = await pool.query(
//       "INSERT INTO todo (description) VALUES($1) RETURNING *", 
//       [description]
//     );
//     res.json(newTodo.rows[0]);
// });

//Route for deleting todo
// app.delete("/todos/:id", async (req, res) => {
//   const { id } = req.params;
//   const deleteTodo = await pool.query(
//     "DELETE FROM todo WHERE todo_id = $1",
//     [id]
//   );
//   res.json('Todo deleted')
// });
