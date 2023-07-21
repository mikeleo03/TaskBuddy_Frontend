import React, { useState, useEffect } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Popping from './Popping';
import { closeEvent, ShowEventApi } from "../redux/Actions/index"
import { connect } from 'react-redux'
import "../style/Calendar.css";

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
const MyCalendar = ({ events, ShowEventApi, closeEvent, setPage, setSaveEdit }) => {
    // States
    const [open, setOpen] = useState(false);
   
    // Click event
    const openEventClick = (event) => {
        setOpen(true);
        const id = event.id || event._id
        if (id) {
            ShowEventApi(id);
        }
        return;
    }

    const selectEventClick = ({ start, end }) => {
        setSaveEdit({ "id": 3, "value": {"start": start, "end": end} });
        setPage("Pass");
    }

    const closeEventClick = () => {
        setOpen(false);
        setTimeout(() => closeEvent(), 200);
    }

    useEffect(() => {
        const elements = document.querySelectorAll('.rbc-header span');
        elements.forEach((element) => {
            const text = element.textContent;
            const trimmedText = text.slice(0, 3);
            element.textContent = trimmedText;
        });

        const prev = document.querySelector('.rbc-btn-group > button:not(:first-child):not(:last-child)');
        if (prev) {
            prev.textContent = '<';
        };

        const next = document.querySelector('.rbc-btn-group > button:last-child:not(:first-child)');
        if (next) {
            next.textContent = '>';
        };
    }, []);
    
    return (
        <>
            <Popping open={open}
                handleClose={closeEventClick} 
                setPage={setPage}
                setSaveEdit={setSaveEdit}
            />
            <div className="md:h-full h-[53rem] w-full">
                <div className='h-[3rem] w-full'>
                    <h1 className='text-2xl font-bold'>Tasks Calendar</h1>
                </div>
                <Calendar
                    selectable
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    className="w-full"
                    onSelectEvent={openEventClick}
                    onSelectSlot={selectEventClick}
                    views={['month', 'week']} 
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

export default connect(mapStateToProps, { ShowEventApi, closeEvent }) (MyCalendar)
