import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import classes from './UrlModal.module.css';
import { useState, useEffect } from 'react';

const buttonText = ["Copy Shortened URL", "Copied your URL!"];
const UrlModal = (props) => {
    const {open, onClose, styleId} = props;
    const [showCopyButton, setShowCopyButton] = useState(false);
    const [modalStyle, setModalStyle] = useState({});
    const [copyButtonStyle, setCopyButtonStyle] = useState({color: "primary", disabled: false});
    const [copyButtonText, setCopyButtonText] = useState(buttonText[0]);


    useEffect( () => {
        if (styleId.type === "success") {
            setShowCopyButton(true);
            setModalStyle({background: "#23E21D"})
        }
        else {
            setShowCopyButton(false);
            setModalStyle({background:"#FF3B3D"})
        }
    }, [styleId.type]);


    const copyHandler = () => {
        navigator.clipboard.writeText(props.displayURL);
        setCopyButtonText(buttonText[1]);
        setCopyButtonStyle({color:"secondary", disabled: "true"});
    }

    const copyExiter = () => {
        setCopyButtonText(buttonText[0]);
        setCopyButtonStyle({color: "primary", disabled: false});
        onClose();
    };

    return (
            <Modal backdrop="static" class="modal show" show={open}>
                <Modal.Header style={modalStyle}>
                    <Modal.Title>{props.styleId.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={modalStyle}>
                    {showCopyButton &&<textarea readOnly rows="1" id={classes.textarea} className='form-control' type="text" value={props.displayURL || ''} /> || null}
                </Modal.Body>
                <Modal.Footer style={modalStyle}>
                    {showCopyButton && <Button disabled={copyButtonStyle.disabled} onClick={copyHandler} variant={copyButtonStyle.color}>{copyButtonText}</Button> || null}
                    <Button type='button' onClick={copyExiter} variant="dark">Close</Button>
                </Modal.Footer>
            </Modal>
    )
};

export default UrlModal;