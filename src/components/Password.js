import React, { useState } from 'react';
import { deleteEventApi } from "../redux/Actions/index";
import { connect } from "react-redux";
import { toast } from 'react-toastify';
import axios from "axios";

const url = process.env.REACT_APP_BACKEND_URL_DEV;

const PasswordPrompt = ({ setPage, saveEdit, setSaveEdit, renderStatus, rerender, deleteEventApi }) => {
    const [password, setPassword] = useState('');

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirm = async () => {
        // Validate the password (you can send it to the backend for validation)
        try {
            // Replace 'your_api_route' with the actual API endpoint for password validation
            console.log(password);
            const response = await axios.post(url + '/api/validate', { password });
            console.log(response);
        
            // If the password is valid, perform the edit action
            if (response.data.valid) {
                // Call the API route for edit action 
                if (saveEdit.id === 1) {
                    deleteEventApi(saveEdit.value);
                    rerender(!renderStatus);
                    setPage("Home");
                } else if (saveEdit.id === 2) {
                    setPage("Edit");
                } else if (saveEdit.id === 3) {
                    setPage("Add");
                }
                // Reset
                setSaveEdit(null);
            } else {
                // Handle case when the password is invalid
                toast.error("Invalid password!", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        } catch (error) {
            toast.error("Error while validating password!", {
                position: toast.POSITION.TOP_RIGHT
            });
        }  
    };

    const handleCancel = () => {
        setPage("Home");
    };

    return (
        <div>
            <h3>Enter your password to continue:</h3>
            <input type="password" value={password} onChange={handlePasswordChange} />
            <button onClick={() => handleConfirm(password)}>Confirm</button>
            <button onClick={handleCancel}>Cancel</button>
        </div>
    );
};

function mapStateToProps({event}){
    return {
        event // modalStatus
    }
}

export default connect(mapStateToProps, { deleteEventApi }) (PasswordPrompt)
