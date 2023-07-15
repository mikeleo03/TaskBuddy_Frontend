import React from "react";
import { Routes, Route } from "react-router-dom";
import MyCalendar from "./components/Calendar";
import AddEvents from "./components/AddEvents";
import UpdateEvent from "./components/UpdateEvent";

function App() {
    return (
        <>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid align-items-center">
                    <a className="navbar-brand ms-2" href="/">
                        <h3>Agenda</h3>
                    </a>
                    <span className="navbar-brand mb-0 h2 ">
                        <a className="nav-link pe-0 " href="/events/add">Add Event</a>
                    </span>
                </div>
            </nav>
            <Routes>
                <Route path="/" exact element={<MyCalendar/>} />
                <Route path="/events/add" element={<AddEvents/>}/>
                <Route path="/event/:id/update" element={<UpdateEvent/>}/>
            </Routes>
        </>
    );
}


export default App;