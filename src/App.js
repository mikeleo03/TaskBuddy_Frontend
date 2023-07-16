import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import MyCalendar from "./components/Calendar";
import AddEvents from "./components/AddEvents";
import UpdateEvent from "./components/UpdateEvent";
import TaskCard from "./components/TaskCard";

const url = process.env.REACT_APP_BACKEND_URL_DEV;

const backgroundStyle = {
    backgroundColor : "#ECEEF9",
    height: "auto",
    width: "100vw",
    minHeight: "100vh",
    maxHeight: "100vh",
}

function App() {
    const [eventData, setEventData] = useState([]);

    const compareByEndDate = (a, b) => {
        const dateA = new Date(a.end);
        const dateB = new Date(b.end);
        return dateA - dateB;
    };

    useEffect(() => {
        console.log("i rendered because of refresh or start");
        fetch(url + "/api/events", {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then((res) => res.json())
            .then((data) => {
                // Update state
                data.sort(compareByEndDate);
                console.log(data);
                setEventData(data);
            });
    }, [])

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
                        {eventData[0] ? (
                            eventData.map((event, index) => {
                                const startDate = new Date(event.start);
                                const finishDate = new Date(event.end);
                                const formattedStartDate = startDate.toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit',
                                });
                                const formattedFinishDate = finishDate.toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit',
                                });
                                return (
                                    <TaskCard
                                        key={index}
                                        title={event.title}
                                        start={formattedStartDate}
                                        end={formattedFinishDate}
                                    />
                                );
                            })
                        ) : (
                            <div className='text-lg'>There is no tasks, Congrats!</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}


export default App;