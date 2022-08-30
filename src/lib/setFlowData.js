import {GRAPH, KEY_VALUES, parseEdges, parseGlobalDefaults, parseNodes} from "./configParsing";
import dagre from "dagre";
import {autoLayout} from "./autoLayout/autoLayout";

export function setFlowData(globalDefaultsJSON, nodesJSON, edgesJSON, setNodes = undefined, setEdges = undefined) {
    let defaults = undefined;
    let nodes = undefined;
    let edges = undefined;

    try {
        defaults = parseGlobalDefaults(globalDefaultsJSON);
        nodes = parseNodes(defaults, nodesJSON);
        edges = parseEdges(defaults, edgesJSON, nodes);
    } catch (e) {
        console.error(e);
        return;
    }

    if (defaults[GRAPH][KEY_VALUES[GRAPH].AUTO_LAYOUT.id]) {
        const dagreGraph = new dagre.graphlib.Graph();
        dagreGraph.setDefaultEdgeLabel(() => ({}));
        [nodes, edges] = autoLayout(dagreGraph, defaults, nodes, edges);
    }

    if (!setNodes && !setEdges) {
        return [nodes, edges];
    }

    setNodes(nodes);
    setEdges(edges);

}
