import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import classes from './UrlModal.module.css';

const URLModal = (props) => {
    return (
        <div id={classes.modal} className='modal show'>
            <Modal.Dialog>
                <Modal.Header id={classes.modalBackground} closeButton>
                    <Modal.Title>Success!</Modal.Title>
                </Modal.Header>
                <Modal.Body id={classes.modalBackground}>
                    <textarea rows="1" id={classes.textarea} className='form-control' type="text" value={props.displayURL} />
                </Modal.Body>
                <Modal.Footer id={classes.modalBackground}>
                    <Button variant="outline-dark">Copy URL</Button>
                    <Button variant="dark">Close</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    )
};

export default URLModal;