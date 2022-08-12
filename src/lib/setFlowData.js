import {GRAPH, KEY_VALUES, parseEdges, parseGlobalDefaults, parseNodes} from "./configParsing";
import dagre from "dagre";
import {autoLayout} from "./autoLayout/autoLayout";

export function setFlowData(globalDefaultsJSON, nodesJSON, edgesJSON, setNodes, setEdges) {

    let defaults = parseGlobalDefaults(globalDefaultsJSON);
    let nodes = parseNodes(defaults, nodesJSON);
    let edges = parseEdges(defaults, edgesJSON, nodes);

    if (defaults[GRAPH][KEY_VALUES[GRAPH].AUTO_LAYOUT.id]) {
        const dagreGraph = new dagre.graphlib.Graph();
        dagreGraph.setDefaultEdgeLabel(() => ({}));
        [nodes, edges] = autoLayout(dagreGraph, defaults, nodes, edges);
    }

    setNodes(nodes);
    setEdges(edges);

}
