import {Button, Modal} from "react-bootstrap";

const ErrorModal = ({errorModalVisible, errorMessageTitle, errorMessages, handleErrorPopUpClose}) => {


    return <>

        <Modal show={errorModalVisible} onHide={handleErrorPopUpClose}
               scrollable={true}>
            <Modal.Header closeButton>
                <Modal.Title>{errorMessageTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errorMessages.map(e => <p>{e}</p>)}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleErrorPopUpClose}>
                    OK
                </Button>
            </Modal.Footer>
        </Modal>

    </>

}

export default ErrorModal;
