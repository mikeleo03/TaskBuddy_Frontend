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
            <div className="w-full bg-white flex rounded-xl">
                <div className="w-1/12 h-full bg-primaryBlue text-white rounded-l-xl">
                    <div className="container-fluid items-center">
                        <div>
                            <a href="/">
                                <h3>Agenda</h3>
                            </a>
                        </div>
                        <div>
                            <a href="/events/add">Add Event</a>
                        </div>
                    </div>
                </div>
                <div className="w-8/12 h-full p-8 pb-4">
                    <Routes>
                        <Route path="/" exact element={<MyCalendar/>} />
                        <Route path="/events/add" element={<AddEvents/>}/>
                        <Route path="/event/:id/update" element={<UpdateEvent/>}/>
                    </Routes>
                </div>
                <div className="w-3/12 h-full bg-primaryGray p-8 flex flex-1 flex-col rounded-r-xl">
                    <div className='h-1/12'>
                        <h1 className='text-xl font-bold'>Upcoming Tasks</h1>
                    </div>
                    <div className='overflow-y-auto h-11/12'>
                        Haloo
                    </div>
                </div>
            </div>
        </div>
    );
}


export default App;