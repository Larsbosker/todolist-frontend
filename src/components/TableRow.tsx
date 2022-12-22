import React from 'react';
import {ITodoData} from "../services/ITodoData";
import {useNavigate} from "react-router-dom";

interface IProps {
    data: ITodoData,
}

/**
 * Functional component for displaying todo-item in a table-row
 * @param props: IProps
 * @constructor
 */
function TableRow(props: IProps) {
    let navigate = useNavigate();
    
    function navigateTodoItemPage() {
        navigate(`/todo-item/${props.data.id}`)
    }

    return (
        <tr>
            <td onClick={navigateTodoItemPage}>{props.data.title}</td>
            <td onClick={navigateTodoItemPage}>{props.data.completed ? "Ja" : "Nee"}</td>
            <td onClick={navigateTodoItemPage}>{new Date(props.data.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            })}</td>
        </tr>
    );
}

export default TableRow;