import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { addEventApi } from "../redux/Actions/index";
import { connect } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

// Schema to validate event inputs 
const schema = yup.object({
    title: yup.string().required("Can't Be Empty"),
    start: yup.date().required("Please specify the time to start"),
}).required();

// To handle adding events
const AddEvents = ({addEventApi, error, setPage, eventTrig, setEventTrig}) => {
    // States
    const navigate = useNavigate()
    const [rerender, setRerender] = useState(false);
    const [dbError, setError] = useState(false)
    const [firstRender, setFirstRender] = useState(true)
 
    useEffect( ()=>{
        if (error && !firstRender) {
            setError(error)
        }
        if (!error.start && !error.end && dbError !== false) {
            setTimeout(navigate("/")) 
        }
    }, [rerender, dbError, error, firstRender, navigate])

    // Using form-hook to register event data
    const { register, handleSubmit, formState: {errors}, control } = useForm({
        resolver: yupResolver(schema)
    });
   
    const onSubmit = async(values) => {
        setFirstRender(false)
        addEventApi(values)
        .then(()=>{
            setRerender(!rerender);
            setEventTrig(!eventTrig);
            setPage("Home");
            toast.success("New task is successfully added!", {
                position: toast.POSITION.TOP_RIGHT
            });
        })
    }

    return (
        // Implementation using bootstrap
        <>
            <div className='w-full pb-3'>
                <h1 className='text-2xl font-bold'>Add New Task</h1>
                <h3 className='text-lg py-1.5 font-semibold text-primaryBlue'>Please fill the form with the task information!</h3>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className=" align-content-center">
                <div className="mb-[2rem]">
                    <label htmlFor="title" className="form-label">Task Title</label>
                    <input {...register("title")} type="text" placeholder="Insert the task title" className="form-control w-full py-2 appearance-none bg-transparent outline-none border rounded-xl" id="title" aria-describedby="title" />
                    <p className={`error text-warning position-absolute ${errors.title?"active":""}`}>{errors.title?<i className="bi bi-info-circle me-2"></i>:""}{errors.title !== undefined ? ("Title " + errors.title?.message) : ("")}</p>
                </div>
                <div className="mb-[2rem] flex flex-row">
                    <div className="w-1/2 flex flex-col pr-4">
                        <div>
                            <label htmlFor="start" className="form-label">Start Date</label>
                        </div>
                        {/* Controllers are the way you can wrap and use datePicker inside react form-hook*/}
                        {/* Start date controller*/}
                        <div className="w-full">
                            <Controller
                                control={control}
                                name="start"
                                render={({ field }) => (
                                    <DatePicker
                                        placeholderText="Select date"
                                        onChange={(date) => field.onChange(date)}
                                        selected={field.value}
                                        value={field.value}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                        className="form-control"
                                        id="start"
                                    />
                                )}
                            />
                        </div>
                        {/* error handling */}
                        <div>
                            <p className={`error text-warning position-absolute ${errors.start?"active":""}`}>{errors.start?<i className=" bi bi-info-circle me-2"></i>:""}{errors.start?.message}</p>
                            <p className={`error text-warning position-absolute ${dbError.start?"":"d-none"}`}>{dbError.start?<i className=" bi bi-info-circle me-2"></i>:""}{dbError.start}</p>
                        </div>
                    </div>
                    <div className="w-1/2 flex flex-col pr-4">
                        <div>
                            <label htmlFor="end" className="form-label">End Date</label>
                        </div>
                        {/* end date controller*/}
                        <div className="rounded-xl">
                            <Controller
                                control={control}
                                name="end"
                                render={({ field }) => (
                                    <DatePicker
                                        placeholderText="Select end date"
                                        onChange={(date) => field.onChange(date)}
                                        selected={field.value}
                                        value={field.value}
                                        timeFormat="HH:mm"
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                        showTimeSelect
                                        className="form-control"
                                        id="end"
                                    />
                                )}
                            />
                        </div>
                        <div>
                            <p className={`error text-warning position-absolute ${dbError.end?"":"d-none"}`}>{dbError.end?<i className=" bi bi-info-circle me-2"></i>:""}{dbError.end}</p>
                        </div>
                    </div>
                </div>
                <div className="mb-2 h-48">
                    <label htmlFor="describe" className="form-label">
                        Task Description <span className="text-danger small">(optional)</span>
                    </label>
                    <textarea 
                        {...register("describe")}
                        rows="5"
                        className="form-control w-full h-full py-2 resize-none appearance-none bg-transparent outline-none border rounded-xl"
                        id="describe"
                        aria-describedby="describe"
                        placeholder="Describe your task here..."
                    >
                    </textarea>
                </div>
                <button
                    className="px-10 py-1.5 text-white font-medium bg-primaryBlue hover:bg-indigo-400 active:bg-indigo-600 rounded-lg duration-150"
                    type="submit"
                >
                    Create
                </button>
            </form>
        </>
    )
}


function mapStateToProps({event, error}){
    return {
        event,
        error  // event
    }
}

export default connect(mapStateToProps, {addEventApi}) (AddEvents)