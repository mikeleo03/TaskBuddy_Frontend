const initialValue = {}

const errorReducer = (state=initialValue, action) => {
    // Switch case
    switch (action.type) {
        case "ADD_ERROR":
            console.log("error was added", action.payload)
            return action.payload
        case "REMOVE_ERROR":
            console.log("error was removed")
            return {}
        default:
            return state
    }
}

export default errorReducer;