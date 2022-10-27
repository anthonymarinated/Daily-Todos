import React, { Fragment, useEffect, useState } from "react";

//destructure todo prop (argument to the EditTodo component)
const EditTodo = ({ todo }) => {
    // console.log(todo);
    const [description, setDescription] = useState(todo.description);
    const updateDescription = async (e) => {
        e.preventDefault();
        try {
            const body = { description };
            const response = await fetch(`http://localhost:3000/todos/${todo.todo_id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    }
    return (
        <div>
            <button 
                type="button" 
                class="btn btn-warning" 
                data-toggle="modal" 
                data-target={`#id${todo.todo_id}`} 
            >
            {/* you target an id by using hash sign # */}
            Edit
            </button>

            {/* give the id the value of todo_id in order to make ever edit modal unique to a todo*/}
            <div class="modal" id={`id${todo.todo_id}`} onClick={() => setDescription(todo.description)}> 
            {/* OnClick function sets description back to origin description if click outside of modal */}
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Edit Todo</h4>
                            {/* OnClick function sets description back to origin description if click 'x' to close modal */}
                            <button type="button" 
                                class="close" 
                                data-dismiss="modal"
                                onClick={() => setDescription(todo.description)}
                            >
                                &times;
                            </button>
                        </div>

                        <div class="modal-body">
                            <input type="text" 
                                className="form-control" 
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-warning" data-dismiss="modal" onClick={(e) => updateDescription(e)}>
                                Edit
                            </button>
                            {/* OnClick function sets description back to origin description if you click close button */}
                            <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={() => setDescription(todo.description)}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditTodo;

