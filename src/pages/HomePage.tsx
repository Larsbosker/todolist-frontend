import React, {useEffect, useState} from 'react';
import axios from "axios";
import Table from "../components/Table";
import {ITodoData} from "../services/ITodoData";

function HomePage() {
    const [data, setData] = useState<ITodoData>(Object);

    const RequestTodoData = () => {
        axios.get("http://127.0.0.1:8000/api/todolist")
            .then(res => {
                setData(res.data['data']);
            })
    }

    useEffect(
        RequestTodoData,
        []
    )

    return (
        <div className="home">
            <div className="add-todo">

            </div>
            <div className="todolist-content">
                <Table data={Object.values(data)}/>
            </div>
        </div>
    );
}

export default HomePage;