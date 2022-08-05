import dagre from "dagre";
import {GRAPH, KEY_VALUES, NODE} from "./configParsing";

// TODO: overal met keys werken uit de hashmap

export function getLayoutedElementsDagre(dagreGraph, nodes, edges, globalDefaults) {

    dagreGraph.setGraph({rankdir: globalDefaults[GRAPH][KEY_VALUES[GRAPH].ORIENTATION.id] === "horizontal" ? "LR" : "TB"});

    //console.log(globalDefaults[GRAPH][KEY_VALUES[GRAPH].ORIENTATION.id])

    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, {
            width: node.width || globalDefaults[NODE].width,
            height: node.height || globalDefaults[NODE].height
        });
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    nodes.forEach((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);

        node.position = {
            x: nodeWithPosition.x - (node.width || globalDefaults[NODE].width) / 2,
            y: nodeWithPosition.y - (node.height || globalDefaults[NODE].height) / 2,
        };

        return node;
    });

    return [nodes, edges];


}


