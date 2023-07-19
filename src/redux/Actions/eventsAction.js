
import { event } from "../Axios/event"
import * as moment from "moment"
import { addError, removeError } from "./errorsAction"

export const showEvent = (event) => {
    return {
        type: "SHOW_EVENT",
        payload: event
    }
}

export const showEvents = (events) => {
    return {
        type: "SHOW_EVENTS",
        payload: events
    }
}

export const ShowEventApi = id => async dispatch => { 
    // Keep updated with DB
    const result = await event.get(`/${id}/show`);

    try {
        const {title, _id, start, end, describe} = await result.data;
        const convertedEvent = {
            title,
            describe,
            id: _id,
            start: moment(start).format("ddd DD MMM YY LT"),
            end: moment(end).format("ddd DD MMM YY LT")
        }
        await dispatch(showEvent(convertedEvent))
    } catch(err){
        const error =await err.data.message;
        return error
    }
}

export const ShowEventsApi = () => async dispatch => {
    const result = await event.get("/");

    try {
        const convertedDates = await result.data.map(event => {
            return {
                title: event.title,
                start: new Date(event.start),
                end: new Date(event.end),
                id: event._id,
                describe: event.describe
            }
        })
        await dispatch(showEvents(convertedDates))
    } catch(err){
        const error = await err.data.message;
        return error
    }
}

export const deleteEvent = (id) => {
    return {
        type: "DELETE_EVENT",
        payload: id
    }
}

export const deleteEventApi = (id) => async dispatch => {
    const result = await event.delete(`/${id}/delete`)

    try {
        const deleted = await result.data;
        await dispatch(deleteEvent(id))
        return {deleted}
    } catch(err){
        const message = await result.data.message;
        return {message}
    }
}

const addEvent = (newEvent) => {
    return {
        type: "ADD_EVENT",
        payload: newEvent
    }
}

export const addEventApi = (values) => async dispatch => {
    await event.post("/", {
        title: values.title,
        start: values.start,
        end: values.end,
        describe: values.describe
    })
        .then (res => {
            if (res && res.data) {
                dispatch(addEvent(res.data)) 
                dispatch(removeError())
                
                return "success";
            }
        })
        .catch(res => {
            if (res.response.data) {
                dispatch(addError(res.response.data));
            }
        })
}

export const updateEventApi = (values, id) => async dispatch =>{
    try {
        await event.put(`/${id}/update`, {
            title: values.title,
            start: values.start,
            end: values.end,
            describe: values.describe
        })
        dispatch(removeError())
        return "response was successful";
    } catch(err) {
        dispatch(addError(err.response.data));
    }
}