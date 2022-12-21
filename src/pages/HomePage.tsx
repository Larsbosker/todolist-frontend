import React, {useEffect, useState} from 'react';
import axios from "axios";
import Table from "../components/Table";
import {ITodoData} from "../services/ITodoData";

function HomePage() {
    const config = {headers: {'Content-type': "multipart/form-data"}};
    const url: string = "http://127.0.0.1:8000/api/todolist";
    const [data, setData] = useState<ITodoData[]>(Object);
    const fData = new FormData();

    // Data that will be sent to API
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState(false);
    const [image, setImage] = useState("");

    /**
     * Function for getting all todo-items
     * @constructor
     */
    function RequestTodoData() {
        axios.get(url)
            .then(res => {
                setData(res.data['data']);
            })
    }

    /**
     * Function for sending data for new todo-item to api
     * @param url
     */
    function postData(url: string) {
        axios.post(url, fData, config)
            .then(function (res) {
                setData(res.data['data']);
            })
    }

    useEffect(
        RequestTodoData,
        []
    )


    function submitFunction() {
        fData.append("title", title)
        fData.append("description", description)
        fData.append("completed", JSON.stringify(completed))
        if (image) fData.append("image", image)
        postData(url);
    }

    return (
        <div className="home">
            <div className="add-todo">
                <h1>Todo toevoegen</h1>
                <form onSubmit={submitFunction}>
                    <input id={"title"} type="text" placeholder={"Titel"} onChange={event => setTitle(event.target.value)}/>
                    <textarea id={"description"} placeholder={"Beschrijving"} onChange={event => setDescription(event.target.value)}/>
                    <input id={"image"} type="file" accept="image/png, image/jpg, image/jpeg" onChange={(event: any) => setImage(event.target.files[0])}/>
                    <div className={"completed"}>
                        <label htmlFor={"completed"}>Voltooid</label>
                        <input id={"completed"} type="checkbox" onChange={event => setCompleted(!completed)}/>
                    </div>
                    <button type={"submit"}>Opslaan</button>
                </form>
            </div>
            <div className="todolist-content">
                {data ? <Table data={Object.values(data)}/> : <h1>Er zijn geen todo-items. Voeg er een toe</h1>}
            </div>
        </div>
    );
}

export default HomePage;