import {Form} from "react-bootstrap";

const ToggleButtons = ({changeAutoSync, changeSnapToGrid}) => {

    return <>

        <Form style={{margin: "10px 5px"}}>
            <Form.Check
                type="switch"
                id="auto-sync-switch"
                label="Autosync"
                defaultChecked={true}
                inline={true}
                onChange={changeAutoSync}
            />
            <Form.Check
                type="switch"
                id="snap-to-grid-switch"
                label="Snap to grid"
                defaultChecked={true}
                inline={true}
                onChange={changeSnapToGrid}
            />
        </Form>

    </>
}

export default ToggleButtons;
