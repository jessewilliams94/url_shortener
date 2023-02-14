import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import classes from './UrlModal.module.css';
import { useState } from 'react';

const UrlModal = (props) => {
    const {open, onClose, showButton} = props;
    // const [showCopyButton, setShowCopyButton] = useState(showButton);
    return (
        <div id={classes.modal} className='modal show'>
            <Modal show={open}>
                <Modal.Header closeButton onClick={() => onClose()}>
                    <Modal.Title>{props.styleId.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <textarea readOnly rows="1" id={classes.textarea} className='form-control' type="text" value={props.displayURL || 'URL must look like > www.google.com'} />
                </Modal.Body>
                <Modal.Footer >
                    {/* {showCopyButton && <Button variant="outline-dark">Copy URL</Button>} */}
                    <Button type='button' onClick={() => onClose()} variant="dark">Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
};

export default UrlModal;