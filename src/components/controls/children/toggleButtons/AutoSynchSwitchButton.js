import {Form} from "react-bootstrap";

const AutoSynchSwitchButton = ({changeAutoSync}) => {

    return <>
        <Form.Check
            type="switch"
            id="auto-sync-switch"
            label="Autosync"
            defaultChecked={true}
            inline={true}
            onChange={changeAutoSync}
        />
    </>

}

export default AutoSynchSwitchButton;
