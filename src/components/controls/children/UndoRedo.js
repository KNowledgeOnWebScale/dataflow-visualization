import {Button, ButtonGroup} from "react-bootstrap";
import {json2yaml} from "../../../lib/jsonYamlConversionUtil";

const UndoRedo = ({UndoRedoModel, setData, language}) => {

    function writeToEditors(newConfigs) {
        let globalDefaults = JSON.stringify(newConfigs[0], null, 4)
        let nodes = JSON.stringify(newConfigs[1], null, 4)
        let edges = JSON.stringify(newConfigs[2], null, 4)

        if (language === "yaml") {
            globalDefaults = json2yaml(globalDefaults);
            nodes = json2yaml(nodes);
            edges = json2yaml(edges)
        }

        setData(globalDefaults, nodes, edges, false);
    }

    function undoClicked(e) {
        e.preventDefault();
        writeToEditors(UndoRedoModel.undoAction())
    }

    function redoClicked(e) {
        e.preventDefault();
        writeToEditors(UndoRedoModel.redoAction(language));
    }

    return <>
        <ButtonGroup>
            <Button variant={"warning"} onClick={undoClicked}>
                Undo
            </Button>

            <Button variant={"warning"} onClick={redoClicked}>
                Redo
            </Button>
        </ButtonGroup>
    </>
}

export default UndoRedo;
