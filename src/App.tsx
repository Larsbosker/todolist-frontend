import React from 'react';
import './App.scss';
import HomePage from "./pages/HomePage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import TodoItemPage from "./pages/TodoItemPage";
import Header from "./components/Header";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Header/>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="todo-item/:repo" element={<TodoItemPage/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
