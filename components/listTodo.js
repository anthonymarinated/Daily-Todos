import React, { Fragment, useState, useEffect } from "react";
import EditTodo from "./EditTodo";

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
            setTodos(todos.filter(todo => todo.todo_id !== id)); 
            //use filter method on todos 
            //if the todo.todo_id does not equal to the todo id that was deleted 
            //then return an array of all todos except for the todo that was deleted
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getTodos();
    },[])
    // console.log(todos);

    return (
        <div className="mt-5">
        <table className="table" id="todo">
             <thead>
                <tr>
                    <th>Description</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    todos.map(todo => (
                        <tr key={todo.todo_id}>
                            <td>{todo.description}</td>
                            <td><EditTodo todo={todo}/></td>
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
        </div>
    )
}

// const res = await fetch(
//     "http://localhost:3000/todos"
// );
// const json = await res.json();
// setList(json);