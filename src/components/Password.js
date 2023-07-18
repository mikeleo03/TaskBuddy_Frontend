import React, { useState } from 'react';
import { deleteEventApi } from "../redux/Actions/index";
import { connect } from "react-redux";
import { toast } from 'react-toastify';
import axios from "axios";

const url = process.env.REACT_APP_BACKEND_URL_DEV;

const PasswordPrompt = ({ setPage, saveEdit, setSaveEdit, renderStatus, rerender, deleteEventApi, eventTrig, setEventTrig }) => {
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
                    setEventTrig(!eventTrig);
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
        <div className="w-full md:h-[35rem] h-150 flex flex-col items-center justify-center">
            <div className="w-full md:py-5 py-4 md:px-5 px-4 h-full space-y-4 rounded-xl bg-light">
                <div className='w-full'>
                    <h1 className='text-xl font-bold'>Password</h1>
                    <h3 className='text-lg py-1.5 font-semibold text-primaryBlue'>Password is required to do an update</h3>
                </div>
                <div className="w-full">
                    <input 
                        required
                        type="password" 
                        value={password} 
                        onChange={handlePasswordChange}
                        className="form-control w-full py-2 appearance-none bg-transparent outline-none border rounded-xl"
                    />
                </div>
                <div className="w-full">
                    <button className="md:px-10 px-8 py-1.5 text-white font-medium bg-primaryBlue hover:bg-indigo-400 active:bg-indigo-600 rounded-lg duration-150 mr-4" onClick={() => handleConfirm(password)}>Confirm</button>
                    <button className="md:px-10 px-8 py-1.5 text-white font-medium bg-indigo-400 hover:bg-indigo-400 active:bg-indigo-600 rounded-lg duration-150" onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

function mapStateToProps({event}){
    return {
        event // modalStatus
    }
}

export default connect(mapStateToProps, { deleteEventApi }) (PasswordPrompt)
