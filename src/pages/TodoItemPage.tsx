import React, {useEffect, useState} from 'react';
import axios from "axios";
import {ITodoData} from "../services/ITodoData";

function TodoItemPage() {
    const [data, setData] = useState<ITodoData>(Object);
    const todoItemId = window.location.pathname.split('/')[2];
    console.log("Dit is het item", todoItemId)

    const RequestTodoData = () => {
        axios.get(`http://127.0.0.1:8000/api/todolist/${todoItemId}`)
            .then(res => {
                setData(res.data['data']);
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
            <h1>{data.title}</h1><br/>
            <h3>Beschrijving:</h3>
            <h2>{data.description}</h2><br/>
            <h3>Afbeelding:</h3><br/>
            <h3>Voltooid:</h3>
            <h2>{data.completed ? "Ja" : "Nee"}</h2>
        </div>
    );
}

export default TodoItemPage;