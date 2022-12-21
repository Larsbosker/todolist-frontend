import React, {useEffect, useState} from 'react';
import {ITodoData} from "../services/ITodoData";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function EditTodoItemPage() {
    const config = {headers: {'Content-type': "application/json"}};
    const navigate = useNavigate();
    const [data, setData] = useState<ITodoData>(Object);
    const todoItemId = window.location.pathname.split('/')[2];
    const [title, setTitle] = useState(data.title);
    const [description, setDescription] = useState(data.description);
    const [image, setImage] = useState(data.image)
    const [completed, setCompleted] = useState(false);
    const fData = new FormData();

    /**
     * Function for getting data of todo item to edit
     * @constructor
     */
    function RequestTodoData() {
        axios.get(`http://127.0.0.1:8000/api/todolist/${todoItemId}`)
            .then(res => {
                setData(res.data['data']);
                setCompleted(res.data.data.completed === 1)
            })
    }

    /**
     * Function for updating data of todo item
     */
    function updateData() {
        axios.put(`http://127.0.0.1:8000/api/todolist/${todoItemId}`, fData, config)
            .catch(function (res) {
                console.log(res)
            })
    }

    useEffect(
        RequestTodoData,
        [todoItemId]
    )

    /**
     * Function for adding data of the different inputs to fData and calling the updateData function
     * @param event
     */
    const submitFunction = (event: any) => {
        event.preventDefault()
        fData.append("title", title === undefined ? data.title : title)
        fData.append("description", description === undefined ? data.description : description)
        fData.append("completed", JSON.stringify(completed))
        fData.append("image", image ? image : "no-image")
        updateData();
        navigate('/')
    }

    return (
        <div className={"edit-todoitem-page"}>
            <h1>Todo item bewerken</h1>
            <form onSubmit={submitFunction}>
                <input id={"title"} type="text" defaultValue={data.title} onChange={event => setTitle(event.target.value)}/>
                <textarea id={"description"} defaultValue={data.description} onChange={event => setDescription(event.target.value)}/>
                <input id={"image"} type="file" onChange={event => setImage(event.target.value)}/>
                {data.completed !== undefined ? (
                    <div className={"completed"}>
                        <label htmlFor={"completed"}>Voltooid</label>
                        <input id={"completed"} type="checkbox" defaultChecked={completed} onChange={(event) => setCompleted(!completed)}/>
                    </div>) : null}
                <button type={"submit"}>Wijzigingen opslaan</button>
            </form>
        </div>
    );
}

export default EditTodoItemPage;