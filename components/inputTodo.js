import React, { Fragment, useState } from "react";

const InputTodo = () => {
    const [ description, setDescription ] = useState("")

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { description };
            const response = await fetch("http://localhost:3000/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            console.log(response);
            window.location = "/"; //redirects to "http://localhost:8080/"
        } catch (err) {
            console.error(err.message);
        }
    }
    
    return (
        <div>
            <div id="appheader">
            <h1 className="text-center mt-5">Todo List</h1>
            </div>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <input type="text" 
                    className="form-control" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button className="btn btn-success">Add</button>
            </form>
        </div>
    )
}

export default InputTodo;