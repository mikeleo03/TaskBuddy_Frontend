import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from "react";
import { connect } from "react-redux";
import { deleteEventApi, closeEvent } from "../redux/Actions/index";

// Popping components
const Popping = ({open, handleClose, event, deleteEventApi, renderStatus, rerender, setPage }) => {
    const {id, describe, title, start, end} = event;

    const handleDelete = async () => {
        await deleteEventApi(event.id);
        rerender(!renderStatus)
    }

    const handleSet = () => {
        setPage("Edit");
    }

    function makeLinksClickable(text) {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const linesWithLinks = text.split("\n").map((line) => {
            const lineWithLink = line.replace(urlRegex, (url) => `<a href="${url}" class="tooltip-test" title="Tooltip" target="_blank">${url}</a>`);
            return lineWithLink;
        });
        return linesWithLinks.join("<br />");
    }
    
    const descriptionWithClickableLinks = makeLinksClickable(describe);

    // Popup modals
    const modal = () => {
        return (
            <Modal show={open} onHide={handleClose} size="lg" className="rounded-xl">
                <Modal.Header closeButton className="bg-primaryBlue text-white px-4">
                    <Modal.Title className="text-capitalize">{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="px-4 break-words">
                    {descriptionWithClickableLinks ? (
                        <p className="lead" dangerouslySetInnerHTML={{ __html: descriptionWithClickableLinks }}></p>
                    ) : (
                        "No Descriptions Yet"
                    )}
                    <div className="row justify-content-between mt-4">
                        <p className="col small text-muted text-center pb-0 mb-0">from: {start}</p>
                        <p className="col small text-muted text-center pb-0 mb-0">to: {end}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="px-4">
                    <Button variant="warning" onClick={handleClose} className="text-black hover:text-white">Close</Button>
                    <Button variant="success" onClick={handleSet} className="text-black">Update</Button>
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