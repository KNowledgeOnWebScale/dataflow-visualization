import {Button} from "react-bootstrap";
import {json2yaml, yaml2json} from "../../../lib/jsonYamlConversionUtil";

const FillInPositions = ({nodes, nodesData, setNodesData, language, setError}) => {

    function setPositions(e) {
        e.preventDefault();

        if (!nodes || !nodes.length) {
            console.log("geen nodes")

            setError(
                "No data available to update positions in the editor.",
                "Make sure there is a flow diagram visible first.",
                true
            )
            return;
        }

        let newNodesData = JSON.parse(language === "yaml" ? yaml2json(nodesData) : nodesData);


        function nodesReactFlowNotSameAsNodesEditor() {

            setError(
                "Error while updating config of nodes.",
                "Make sure the flow visualization is the visualization of the configs.", "Make sure to click 'convert' first.",
                true
            )
        }

        if (nodes.length !== newNodesData.length) {
            nodesReactFlowNotSameAsNodesEditor();
            return;
        }


        for (let i = 0; i < newNodesData.length; i += 1) {
            newNodesData[i]["position"] = nodes[i]["position"];

            if (newNodesData[i].shape !== nodes[i].data.shape && newNodesData[i].image !== nodes[i].data.image) {
                nodesReactFlowNotSameAsNodesEditor();
                return;
            }

        }

        const newNodesDataJSONStringify = JSON.stringify(newNodesData, null, 4);
        setNodesData(language === "yaml" ? json2yaml(newNodesDataJSONStringify) : newNodesDataJSONStringify);

    }

    return <>
        <Button variant={"info"} onClick={setPositions}>Fill in positions into node config</Button>
    </>
}

export default FillInPositions;
