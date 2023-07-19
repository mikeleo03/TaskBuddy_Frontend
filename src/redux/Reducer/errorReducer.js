const initialValue = {}

const errorReducer = (state = initialValue, action) => {
    // Switch case
    switch (action.type) {
        case "ADD_ERROR":
            return action.payload
        case "REMOVE_ERROR":
            return {}
        default:
            return state
    }
}

export default errorReducer;