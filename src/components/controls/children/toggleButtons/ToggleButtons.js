import {Form} from "react-bootstrap";
import AutoSynchSwitchButton from "./AutoSynchSwitchButton";
import SnapToGridSwitchButton from "./SnapToGridSwitchButton";

const ToggleButtons = ({changeAutoSync, changeSnapToGrid}) => {

    return <>

        <Form style={{margin: "10px 5px"}}>
            <AutoSynchSwitchButton changeAutoSync={changeAutoSync} />
            <SnapToGridSwitchButton changeSnapToGrid={changeSnapToGrid} />
        </Form>

    </>
}

export default ToggleButtons;
