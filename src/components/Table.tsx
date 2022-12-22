import React from 'react';
import {ITodoData} from "../services/ITodoData";
import TableRow from "./TableRow";

interface IProps {
    data: ITodoData[]
}

/**
 * Functional component for displaying a table
 * @param props
 * @constructor
 */
function Table(props: IProps) {
    const headValues: string[] = ["Titel", "Voltooid", "Gemaakt op"]

    /**
     * For each todo-item create a tablerow
     */
    const tableRow = props.data.map((todoItem: ITodoData, id: number) => (
        <TableRow key={id} data={todoItem}/>
    ))

    return props.data.length === 0 ? <h1>Er zijn momenteel geen todo-items. Voeg er een toe!</h1> : (
        <table>
            <thead>
            <tr>{headValues.map((value: string, id: number) => <th key={id}>{value}</th>)}</tr>
            </thead>
            <tbody>
            {tableRow}
            </tbody>
        </table>
    )
}

export default Table;