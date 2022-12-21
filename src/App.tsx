import React from 'react';
import './App.scss';
import HomePage from "./pages/HomePage";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import TodoItemPage from "./pages/TodoItemPage";
import Header from "./components/Header";
import EditTodoItemPage from "./pages/EditTodoItemPage";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Header/>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="todo-item/:id" element={<TodoItemPage/>}/>
                    <Route path="edit-todo-item/:id" element={<EditTodoItemPage/>}/>

                    <Route path="*" element={<Navigate to="/" replace/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
