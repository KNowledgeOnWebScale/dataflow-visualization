import {MarkerType} from "react-flow-renderer";

export const globalDefaultsJSON = {
    type: "straight",
    animated: true,
    markerEnd: {type: "arrowclosed"},
    strokeDasharray: "5 2 2 2"
};

export const nodesJSON = [
    {label: 'RDF', shape: "cylinder", vgroup:"group1"},
    {label: "RDF'", shape: "cylinder",  vgroup:"group1"},
    {label: "RDF''", shape: "cylinder",  vgroup:"group1"},
    {label: "RDF'''", shape: "cylinder",  vgroup:"group1"},
    {label: "RDF''''", shape: "cylinder", vgroup:"group1"},


    {shape: "comunica", position: {x: 600, y: 90},  vgroup:"group2"},
    {label: "SPARQL", shape: "note",  vgroup:"group2"},


    {label: "Comunica queries\nmultiple RDF\ndatasets\nSPARQL sub-query\ngoes in, results\ncome out", width: 120, height: 120, shape: "note", position: {x: 500, y: -10}},

];


export const edgesJSON = [
    {
        target: 'RDF',
        source: 'comunica',
    },
    {
        target: "RDF'",
        source: 'comunica',
    },
    {
        target: "RDF''",
        source: 'comunica',
    },
    {
        target: "RDF'''",
        source: 'comunica',
    },
    {
        target: "RDF''''",
        source: 'comunica',
    },
    {
        source: "comunica",
        target: "SPARQL",
        sourceHandle: "bottom-source",
        targetHandle: "top-target",
        markerEnd: {},
        style: {
            strokeDasharray: 3,
            animation: "none"
        },
    }
];
