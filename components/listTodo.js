import React, { Fragment, useState, useEffect } from "react";

export default function ListTodo(){
    const [todos, setTodos] = useState([]);

    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:3000/todos");
            const jsonData = await response.json();
            setTodos(jsonData);
        } catch (err) {
            console.error(err.message)
        }
    }

    const deleteTodo = async (id) => {
        try {
            const deleteTodo = await fetch(`http://localhost:3000/todos/${id}`, {
                method: 'DELETE'
            });
            setTodos(todos.filter(todo => todo.todo_id !== id))
        } catch (err) {
            console.error(err.message);
        }
    }
    useEffect(() => {
        getTodos();
    },[])
    console.log(todos);

    return (
        <div>
        <table className="table">
             <thead>
                <tr>
                    <th>Description</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {/* <tr>
                    <td>John</td>
                    <td>Doe</td>
                    <td>john@example.com</td>
                </tr> */}
                {
                    todos.map(todo => (
                        <tr key={todo.todo_id}>
                            <td>{todo.description}</td>
                            <td>Edit</td>
                            <td><button 
                                    className="btn btn-danger"
                                    onClick={() => deleteTodo(todo.todo_id)}
                                >
                                Delete
                                </button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
            {/* <ul>
                    {
                        todos.map(todo => <li key={todo.todo_id}>{todo.todo_id}, {todo.description}</li>)
                    }
            </ul> */}
        </div>
    )
}

// const res = await fetch(
//     "http://localhost:3000/todos"
// );
// const json = await res.json();
// setList(json);