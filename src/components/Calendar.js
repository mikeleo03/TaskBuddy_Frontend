import React, { useEffect, useState } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Popping from './Popping';
import {closeEvent, ShowEventApi, ShowEventsApi } from "../redux/Actions/index"
import { connect } from 'react-redux'
import "./Calendar.css";

const locales = {
    'en-US': enUS,
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})

// Calendar scheme
const MyCalendar = ({ events, ShowEventApi, closeEvent, ShowEventsApi, page, setPage }) => {
    // States
    const [open, setOpen] = useState(false);
    const [renderStatus, rerender] = useState(false);

    useEffect(() => {
        ShowEventsApi()
        console.log("i rendered because of refresh or start");
    }, [])

    useEffect(() => {
        ShowEventsApi()
        console.log("i rendered");
    }, [renderStatus])
   
    // Click event
    const openEventClick = (event)=>{
        setOpen(true);
        if(event.id) {
            ShowEventApi(event.id);
        }
        return;
    }

    const closeEventClick = () =>{
        setOpen(false);
        setTimeout(() => closeEvent(), 200);
    }
    
    return (
        <>
            <Popping open={open}
                handleOpen={openEventClick} 
                handleClose={closeEventClick} 
                renderStatus = {renderStatus} 
                rerender= {rerender}
                setPage={setPage}
            />
            <div className="h-full w-full">
                <div className='h-1/12 w-full'>
                    <h1 className='text-xl font-bold'>Tasks Calendar</h1>
                </div>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    className="w-full"
                    onSelectEvent={openEventClick}
                    views={['month', 'week', 'day']} 
                    defaultView='month'
                />
            </div>
        </>
    )
}

function mapStateToProps({event, events}){
    return{
        event,
        events
    }
}

export default connect(mapStateToProps, {ShowEventApi, closeEvent, ShowEventsApi })(MyCalendar)