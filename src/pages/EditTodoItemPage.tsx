import React, {useEffect, useState} from 'react';
import {ITodoData} from "../services/ITodoData";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function EditTodoItemPage() {
    const config = {headers: {'Content-type': "application/json"}};
    const todoItemId = window.location.pathname.split('/')[2];
    const navigate = useNavigate();
    const [data, setData] = useState<ITodoData>(Object);
    const fData = new FormData();

    // Data that will be sent to the API
    const [title, setTitle] = useState(data.title);
    const [description, setDescription] = useState(data.description);
    const [image, setImage] = useState(data.image)
    const [completed, setCompleted] = useState(false);

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
        axios.patch(`http://127.0.0.1:8000/api/todolist/${todoItemId}`, fData, config)
            .catch(function (res) {
                console.log(res)
            })
    }

    useEffect(
        RequestTodoData,
        [todoItemId]
    )

    /**
     * Function for adding the data that will be sent to fData and calling the postData method
     * @param event
     */
    function submitFunction(event: any) {
        event.preventDefault()
        fData.append("title", title === undefined ? data.title : title)
        fData.append("description", description === undefined ? data.description : description)
        fData.append("completed", JSON.stringify(completed))
        if (image) fData.append("image", image);
        updateData();
        navigate('/')
    }

    return (
        <div className={"edit-todoitem-page"}>
            <h1>Todo item bewerken</h1>
            <form onSubmit={submitFunction}>
                {/* Title */}
                <input id={"title"} type="text" defaultValue={data.title} onChange={event => setTitle(event.target.value)}/>

                {/* Description */}
                <textarea id={"description"} defaultValue={data.description} onChange={event => setDescription(event.target.value)}/>

                {/* Image */}
                {data.image ? <>
                    <h3 className={"image-info"}>Afbeelding:</h3>
                    <img src={`http://127.0.0.1:8000/${data.image}`} alt={"todo-image"}/><br/>
                </> : null}

                {/* Image input */}
                <input id={"image"} type="file" accept="image/png, image/jpg, image/jpeg" onChange={(event: any) => setImage(event.target.files[0])}/>

                {/* Completed */}
                {data.completed !== undefined ? (
                    <div className={"completed"}>
                        <label htmlFor={"completed"}>Voltooid</label>
                        <input id={"completed"} type="checkbox" defaultChecked={completed} onChange={() => setCompleted(!completed)}/>
                    </div>) : null}

                <button type={"submit"}>Wijzigingen opslaan</button>
            </form>
        </div>
    );
}

export default EditTodoItemPage;