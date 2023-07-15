import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from "react";
import { connect } from "react-redux";
import {Link} from "react-router-dom"
import { deleteEventApi, closeEvent } from "../redux/Actions/index";

// Popping components
const Popping = ({open, handleClose, event, deleteEventApi, renderStatus, rerender}) => {
    const {id, describe, title, start, end} = event;

    const handleDelete =async () => {
        await deleteEventApi(event.id);
        rerender(!renderStatus)
    }

    // Popup modals
    const modal = () => {
        return (
            <Modal show={open} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title className="text-capitalize">{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {describe? <p className="lead">{describe}</p>: "No Dsecriptions Yet"}
                    <div className="row justify-content-between mt-4">
                        <p className="col small text-muted text-center pb-0 mb-0">from: {start}</p>
                        <p className="col small text-muted text-center pb-0 mb-0">to: {end}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={handleClose} className="text-black hover:text-white">Close</Button>
                    <Link to={`/event/${id}/update`}>
                        <Button variant="success" className="text-black">Update</Button>
                    </Link>
                    <Button variant="danger" onClick={handleDelete} className="text-black">Delete</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    // ID components
    if (id) {
        return modal()
    } else {
        <p>there is no modal to preview</p>
    }
}

function mapStateToProps({event}){
    return {
        event // modalStatus
    }
}
  
export default connect(mapStateToProps, {deleteEventApi, closeEvent}) (Popping)