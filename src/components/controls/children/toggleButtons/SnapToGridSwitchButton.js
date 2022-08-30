import {Form} from "react-bootstrap";

const SnapToGridSwitchButton = ({changeSnapToGrid}) => {

    return <>

        <Form.Check
            type="switch"
            id="snap-to-grid-switch"
            label="Snap to grid"
            defaultChecked={true}
            inline={true}
            onChange={changeSnapToGrid}
        />

    </>

}

export default SnapToGridSwitchButton;
