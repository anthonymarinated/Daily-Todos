const path = require('path');
const db = require('../models/db');

const todoController = {};

todoController.getPosts = async (req, res, next) => {
    const query = "SELECT * FROM todo";
    db.query(query)
        .then(response => {
            res.locals.posts = response.rows;
            return next ();
        })
        .catch((err) => {
            return next ({log: `todoController.getPosts: ERROR: ${err}`,
            message: {
                err: `todoController.getPosts: ERROR: Check server logs for details`
            }
        })
      })
}

module.exports = todoController;