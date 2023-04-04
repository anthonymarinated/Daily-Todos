const path = require('path');
const db = require('../models/db');

const todoController = {};

todoController.getPosts = async (req, res, next) => {
    const query = "SELECT * FROM todo";
    db.query(query)
        .then(response => {
            res.locals.posts = response.rows;
            return next();
        })
        .catch((err) => {
            return next ({log: `todoController.getPosts: ERROR: ${err}`,
            message: {
                err: "todoController.getPosts: ERROR: Check error logs for details"
            }
        })
      })
}

todoController.submitPost = async (req, res, next) => {
    const { description } = req.body;
    const query = "INSERT INTO todo (description) VALUES($1) RETURNING *";
    const values = [description];
    db.query(query, values)
        .then(response => {
            res.status(200);
            res.json(response.rows[0]);
        })
        .catch(err => {
            return next({
                log: `todoController.submitPost: ERROR: ${err}`,
                message: { err: "todoController.submitPost: ERROR: Check error log for details"},
            });
        });
}

todoController.editPost = async (req, res, next) => {
    const { id } = req.params;
    const { description } = req.body;
    const query = "UPDATE todo SET description = $1 WHERE todo_id = $2";
    const values = [description, id];
    db.query(query, values)
        .then(response => {
            res.status(200);
            res.json("Todo updated");
        })
        .catch(err => {
            return next({
                log: `todoController.editPost: ERROR: ${err}`,
                message: { err: "todoController.editPost: ERROR: Check error log for details"},                
            });
        });
}

todoController.deletePost = async (req, res, next) => {
    const { id } = req.params;
    const query = "DELETE FROM todo WHERE todo_id = $1";
    const values = [id];
    db.query(query, values)
        .then(response => {
            res.status(200);
            res.json('Todo deleted');
        })
        .catch(err => {
            return next({
                log: `todoController.deletePost: ERROR: ${err}`,
                message: { err: "todoController.deletePost: ERROR: Check error log for details"},                
            });
        });
}

module.exports = todoController;