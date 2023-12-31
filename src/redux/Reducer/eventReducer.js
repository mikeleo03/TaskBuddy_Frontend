const initialValue = {
    id: "",
    start: "",
    end: "",
    describe: ""
}

const EventReducer = (state = initialValue, action) => {
    // Switch case
    switch (action.type) {
        case "SHOW_EVENT":
            return action.payload
        case "UPDATE_EVENT":
            return action.payload
        case "DELETE_EVENT":
            return initialValue
        case "CLOSE_EVENT":
            return initialValue
        default:
            return state
    }
}

export default EventReducer;