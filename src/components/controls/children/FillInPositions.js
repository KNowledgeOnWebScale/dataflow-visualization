import {Button} from "react-bootstrap";
import {json2yaml, yaml2json} from "../../../lib/jsonYamlConversionUtil";
import {GRAPH, KEY_VALUES} from "../../../lib/configParsing";

const FillInPositions = ({nodes, globalDefaultsData, nodesData, setNodesData, language, setError}) => {

    function setPositions(e) {
        e.preventDefault();

        if (!nodes || !nodes.length) {
            console.warn("No nodes")

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

        // Let's sort on id (if id is present (otherwise on some other stuff)) and otherwise it'll be in the correct order already (normally)
        // This ugly thing was necessary to fix issue #95
        // This code is not something to be particularly proud of, but it is a necessary evil. Without this, flows with autolayout (and groups) would be totally messed up

        function sortFunction(a, b) {
            if (a.id && b.id) {
                if (a.id < b.id) return -1;
                if (a.id > b.id) return 1;
            }
            if (a.preset && b.preset) {
                if (a.preset < b.preset) return -1;
                if (a.preset > b.preset) return 1;
            }
            if (a.vgroup && b.group) {
                if (a.vgroup < b.vgroup) return -1;
                if (a.vgroup > b.vgroup) return 1;
            }
            if (a.hgroup && b.hgroup) {
                if (a.hgroup < b.hgroup) return -1;
                if (a.hgroup > b.hgroup) return 1;
            }
            if (a.label && b.label) {
                if (a.label < b.label) return -1;
                if (a.label > b.label) return 1;
            }
            if (a.shape && b.shape) {
                if (a.shape < b.shape) return -1;
                if (a.shape > b.shape) return 1;
            }
            return 0;
        }

        const nodesSorted = nodes.slice(0);
        if (JSON.parse(globalDefaultsData)[GRAPH][KEY_VALUES[GRAPH].AUTO_LAYOUT.id]) {
            nodesSorted.sort(sortFunction);
        }

        const newNodesSorted = newNodesData.slice(0);
        if (JSON.parse(globalDefaultsData)[GRAPH][KEY_VALUES[GRAPH].AUTO_LAYOUT.id]) {
            newNodesSorted.sort(sortFunction);
        }


        for (let i = 0; i < newNodesSorted.length; i += 1) {
            newNodesSorted[i]["position"] = nodesSorted[i]["position"];

            if (newNodesSorted[i].shape !== nodesSorted[i].data.shape && newNodesSorted[i].image !== nodesSorted[i].data.image) {
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
