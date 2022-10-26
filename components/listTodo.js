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

    useEffect(() => {
        getTodos();
    },[])
    console.log(todos);

    return (
        <div>
            <h1>Hi</h1>
            <ul>
                    {
                        todos.map(todo => <li key={todo.todo_id}>{todo.todo_id}, {todo.description}</li>)
                    }
            </ul>
        </div>
    )
}

// const res = await fetch(
//     "http://localhost:3000/todos"
// );
// const json = await res.json();
// setList(json);