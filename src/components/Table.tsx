import React from 'react';
import {ITodoData} from "../services/ITodoData";
import TableRow from "./TableRow";

interface IProps {
    data: ITodoData[]
}

function Table(props: IProps) {
    const headValues: string[] = ["Titel", "Voltooid", "Gemaakt op"]


    const tableRow = props.data.map((todoItem: ITodoData, id: number) => (
        <TableRow key={id} data={todoItem}/>
    ))

    return (
        <table>
            <thead>
            <tr>{headValues.map((value: string, id: number) => <th key={id}>{value}</th>)}</tr>
            </thead>
            <tbody>
            {tableRow}
            </tbody>
        </table>
    );
}

export default Table;