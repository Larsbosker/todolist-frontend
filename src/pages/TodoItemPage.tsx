import React, {useEffect, useState} from 'react';
import axios, {AxiosResponse} from "axios";
import {ITodoData} from "../services/ITodoData";
import {useNavigate} from "react-router-dom";

function TodoItemPage() {
    const [data, setData] = useState<ITodoData>(Object);
    const todoItemId = window.location.pathname.split('/')[2];
    const navigate = useNavigate();

    /**
     * Function for getting a todo-item with specific id
     * @constructor
     */
    function RequestTodoData() {
        axios.get(`http://127.0.0.1:8000/api/todolist/${todoItemId}`)
            .then(res => {
                setData(res.data['data']);
            })
    }

    /**
     * Function for sending a delete request for a todo-item to api
     * @constructor
     */
    function DeleteTodo() {
        axios.delete(`http://127.0.0.1:8000/api/todolist/${todoItemId}`)
            .then(function (res: AxiosResponse<any>) {
                navigate("/")
            })
    }

    useEffect(
        RequestTodoData,
        [todoItemId]
    )

    return (
        <div className="todoitem-page">
            <h5>{new Date(data.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            })}</h5>
            <h1 className={"title"}>{data.title}</h1><br/>

            <h3 className={"image-info"}>Beschrijving:</h3>
            <h4>{data.description}</h4><br/>

            {data.image ? <>
                <h3 className={"image-info"}>Afbeelding:</h3>
                <img src={`http://127.0.0.1:8000/${data.image}`} alt={"todo-image"}/><br/>
            </> : null}

            <h3 className={"completed-info"}>Voltooid:</h3>
            <h4>{data.completed ? "Ja" : "Nee"}</h4>

            <div className={"buttons"}>
                <a className={"edit-button"} href={`/edit-todo-item/${todoItemId}`}>Bewerken</a>
                <button className={"delete-button"} onClick={DeleteTodo}><img src={require("../assets/images/BinIcon.png")} alt=""/></button>
            </div>
        </div>
    );
}

export default TodoItemPage;