import {MarkerType} from "react-flow-renderer";

export const globalDefaultsJSON = {
};

export const nodesJSON = [
    {label: 'RDF', shape: "cylinder", vgroup:"group1"},
    {label: "RDF'", shape: "cylinder",  vgroup:"group1"},
    {label: "RDF''", shape: "cylinder",  vgroup:"group1"},
    {label: "RDF'''", shape: "cylinder",  vgroup:"group1"},
    {label: "RDF''''", shape: "cylinder", vgroup:"group1"},


    {shape: "comunica", position: {x: 600, y: 90},  vgroup:"group2"},
    {label: "SPARQL", shape: "note",  vgroup:"group2"},


    {
        id: "note1",
            label: "Comunica queries\nmultiple RDF\ndatasets\nSPARQL sub-query\ngoes in, results\ncome out",
            width: 120,
            height: 120,
            shape: "note",

        position: {x: 500, y: -10}
    },

];


export const edgesJSON = [
    {
        id: "RDF to comunica",
        source: 'RDF',
        target: 'comunica',
        type: 'straight',
        markerStart: {
            type: MarkerType.ArrowClosed,
            orient: "auto-start-reverse"
        },
        style: {strokeDasharray: "5 2 2 2", animationDirection: "reverse"},
        animated: true
    },
    {
        id: "RDF' to comunica",
        source: "RDF'",
        target: 'comunica',
        type: 'straight',
        markerStart: {
            type: MarkerType.ArrowClosed,
            orient: "auto-start-reverse"
        },
        style: {strokeDasharray: "5 2 2 2", animationDirection: "reverse"},
        animated: true
    },
    {
        id: "RDF'' to comunica",
        source: "RDF''",
        target: 'comunica',
        type: 'straight',
        markerStart: {
            type: MarkerType.ArrowClosed,
            orient: "auto-start-reverse"
        },
        style: {strokeDasharray: "5 2 2 2", animationDirection: "reverse"},
        animated: true
    },
    {
        id: "RDF''' to comunica",
        source: "RDF'''",
        target: 'comunica',
        type: 'straight',
        markerStart: {
            type: MarkerType.ArrowClosed,
            orient: "auto-start-reverse"
        },
        style: {strokeDasharray: "5 2 2 2", animationDirection: "reverse"},
        animated: true
    },
    {
        id: "RDF'''' to comunica",
        source: "RDF''''",
        target: 'comunica',
        type: 'straight',
        markerStart: {
            type: MarkerType.ArrowClosed,
            orient: "auto-start-reverse"
        },
        style: {
            strokeDasharray: "5 2 2 2",
            animationDirection: "reverse"
            // animation: "dashdraw .10s linear infinite alternate",
            //animationDirection: "alternate"

        },
        animated: true
    },
    {
        id: "comunica to SPARQL",
        source: "comunica",
        target: "SPARQL",
        type: "straight",
        sourceHandle: "bottom-source",
        targetHandle: "top-target",
        style: {
            strokeDasharray: 3,
            animationDirection: "reverse"
        },
        animated: true
    }
];
