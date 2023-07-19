import React, { useState, useEffect } from "react";
import Splashscreen from "./components/Splashscreen";
import MyCalendar from "./components/Calendar";
import AddEvents from "./components/AddEvents";
import UpdateEvent from "./components/UpdateEvent";
import TaskCard from "./components/TaskCard";
import Sidebar from './components/Sidebar';
import Password from './components/Password';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ShowEventsApi } from "./redux/Actions/index"
import { connect } from 'react-redux'

const url = process.env.REACT_APP_BACKEND_URL;

const backgroundStyle = {
    backgroundColor : "#ECEEF9",
    height: "auto",
    width: "100vw",
    minHeight: "100vh",
    maxHeight: "100vh",
}

function App({ ShowEventsApi }) {
    // Page switching handler
    const [page, setPage] = useState("Home");
    const [saveEdit, setSaveEdit] = useState();
    const [eventData, setEventData] = useState([]);

    const compareByEndDate = (a, b) => {
        const dateA = new Date(a.end);
        const dateB = new Date(b.end);
        return dateA - dateB;
    };

    useEffect(() => {
        fetch(url + "/api/events", {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then((res) => res.json())
            .then((data) => {
                // Update state
                // Filter just by the deadline
                data = data.filter(event => {
                    const finishDate = new Date(event.end);
                    return finishDate.getTime() > Date.now();
                })
                // Then sort by nearest dl
                data.sort(compareByEndDate); 
                setEventData(data);
            });
    }, [])

    useEffect(() => {
        ShowEventsApi()
    }, [ShowEventsApi])

    return (
        <>
            <Splashscreen />
            <div style={backgroundStyle} className="flex flex-row md:p-[1.5vh]">
                <ToastContainer />
                <div className="w-full md:h-full h-auto bg-white flex md:flex-row flex-col rounded-xl">
                    <div className="w-1/12 h-full md:relative sticky top-0 md:z-0 z-50 md:w-auto w-full bg-primaryBlue text-white rounded-l-xl">
                        <Sidebar page={page} setPage={setPage} saveEdit={saveEdit} setSaveEdit={setSaveEdit}/>
                    </div>
                    <div className="md:w-8/12 w-full h-full md:p-8 p-4 pb-4 md:mb-0 mb-4">
                        {page === "Home" && <MyCalendar setPage={setPage} saveEdit={saveEdit} setSaveEdit={setSaveEdit}/>}
                        {page === "Add" && <AddEvents setPage={setPage} />}
                        {page === "Edit" && <UpdateEvent setPage={setPage} />}
                        {page === "Pass" && <Password setPage={setPage} saveEdit={saveEdit} setSaveEdit={setSaveEdit} />}
                    </div>
                    <div className="md:w-3/12 w-full h-full bg-primaryGray p-8 flex flex-1 flex-col rounded-r-xl">
                        <div className='h-1/8 xl:h-1/12 mb-0 md:block hidden'>
                            <h1 className='text-xl font-bold'>Upcoming Deadlines!</h1>
                        </div>
                        <div className='h-1/8 xl:h-1/12 mb-4 md:hidden block'>
                            <h1 className='text-xl font-bold'>Upcoming Deadlines!</h1>
                        </div>
                        <div className='md:overflow-y-auto md:h-7/8 xl:h-11/12'>
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
        </>
    );
}

function mapStateToProps({event, events}){
    return{
        event,
        events
    }
}

export default connect(mapStateToProps, { ShowEventsApi }) (App)