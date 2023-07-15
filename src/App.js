import React from "react";
import { Routes, Route } from "react-router-dom";
import MyCalendar from "./components/Calendar";
import AddEvents from "./components/AddEvents";
import UpdateEvent from "./components/UpdateEvent";

const backgroundStyle = {
    backgroundColor : "#ECEEF9",
    height: "auto",
    width: "100vw",
    minHeight: "100vh",
    maxHeight: "100vh",
}

function App() {
    return (
        <div style={backgroundStyle} className="flex flex-row p-[1.5vh]">
            <div className="w-full bg-light flex rounded-xl">
                <div className="w-1/12 h-full">
                    <div className="container-fluid items-center bg-primaryGray">
                        <a className="navbar-brand ms-2" href="/">
                            <h3>Agenda</h3>
                        </a>
                        <span className="navbar-brand mb-0 h2">
                            <a className="nav-link pe-0 " href="/events/add">Add Event</a>
                        </span>
                    </div>
                </div>
                <div className="w-11/12 h-full">
                    <Routes>
                        <Route path="/" exact element={<MyCalendar/>} />
                        <Route path="/events/add" element={<AddEvents/>}/>
                        <Route path="/event/:id/update" element={<UpdateEvent/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
}


export default App;