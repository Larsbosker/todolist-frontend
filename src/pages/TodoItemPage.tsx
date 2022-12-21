import React, {useEffect, useState} from 'react';
import axios from "axios";
import {ITodoData} from "../services/ITodoData";
import {useNavigate} from "react-router-dom";

function TodoItemPage() {
    const [data, setData] = useState<ITodoData>(Object);
    const todoItemId = window.location.pathname.split('/')[2];
    const navigate = useNavigate();

    const RequestTodoData = () => {
        axios.get(`http://127.0.0.1:8000/api/todolist/${todoItemId}`)
            .then(res => {
                setData(res.data['data']);
            })
    }

    const DeleteTodo = () => {
        axios.delete(`http://127.0.0.1:8000/api/todolist/${todoItemId}`)
            .then(function (res) {
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
            <h4>{data.description}</h4><br/>
            {data.image ? <>
                <h3 className={"image-info"}>Afbeelding:</h3>
                <h4>{data.image}</h4><br/>
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