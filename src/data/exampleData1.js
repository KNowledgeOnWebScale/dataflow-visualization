import {MarkerType} from "react-flow-renderer";

export const nodesData = [
    {id: 'csv', type: "custom", data: { label: 'csv', shape: "cylinder" }, position: { x: 0, y: 0 },},
    {id: 'JSON', type: "custom", data: { label: 'JSON', shape: "cylinder" }, position: { x: 0, y: 70 },},
    {id: 'XML', type: "custom", data: { label: 'XML', shape: "cylinder" }, position: { x: 0, y: 140 },},
    {id: 'MySQL', type: "custom", data: { label: 'MySQL', shape: "cylinder" }, position: { x: 0, y: 210 },},
    {id: 'API', type: "custom", data: { label: 'API', shape: "circle" }, position: { x: 0, y: 280 },},

    { id: 'RML', type:"custom", data: { label: 'RML\nMapper', shape:"8-star", width: "70", height: "70" }, position: { x: 300, y: 55 } },
    { id: 'RDF', type:"custom", data: { label: 'RDF', shape: "cylinder" }, position: { x: 400, y: 65 } },
    {id: 'SPARQL-END', type: "custom", data: { label: 'SPARQL\nEndpoint', shape: "square" }, position: { x: 450, y: 65 } },

    {id: "rmlio", type:"custom", data: {label: "rml.io", shape:"note"}, position:{x:310, y: 200}},

    {id: 'comunica', type: 'custom', data: { label: '', shape: "comunica" }, position: { x: 600, y: 65 },},
    {id: "SPARQL", type: "custom", data: {label: "SPARQL", shape: "note"}, position: {x: 600, y: 200}},


    {id: "note1", type: "custom", data: {label:"The RML Mapper\npulls data from the\nheterogeneous data\nsources", width: 110, height: 110, shape: "note"}, position: {x: 100, y: -100} },
    {id: "note2", type: "custom", data: {label:"The RML Mapper\npushes an RDF graph", width: 110, height: 110, shape: "note"}, position: {x: 330, y: -60} },
    {id: "note3", type: "custom", data: {label:"Comunica queries the\nSPARQL endpoint:\nSPARQL query\ngoes in,\nresults come out", width: 110, height: 110, shape: "note"}, position: {x: 500, y: -60} }



];


export const edgesData = [
    {
        id: 'csv to rml',
        source: 'csv',
        target: 'RML',
        className: 'normal-edge',
        markerEnd: {
            type: MarkerType.ArrowClosed,
        },
    },
    {
        id: 'JSON to rml',
        source: 'JSON',
        target: 'RML',
        className: 'normal-edge',
        markerEnd: {
            type: MarkerType.ArrowClosed,
        },
    },
    {
        id: 'XML to rml',
        source: 'XML',
        target: 'RML',
        className: 'normal-edge',
        markerEnd: {
            type: MarkerType.ArrowClosed,
        },
    },
    {
        id: 'MySQL to rml',
        source: 'MySQL',
        target: 'RML',
        className: 'normal-edge',
        markerEnd: {
            type: MarkerType.ArrowClosed,
        },
    },
    {
        id: 'API to rml',
        source: 'API',
        target: 'RML',
        className: 'normal-edge',
        markerEnd: {
            type: MarkerType.ArrowClosed,
        },
    },
    {
        id: "RML to RDF",
        source: "RML",
        target: "RDF",
        type: "straight",
        markerEnd: {
            type: MarkerType.ArrowClosed
        }
    },
    {
        id: "RML to rmlio",
        source: "RML",
        target: "rmlio",
        type: "straight",
        sourceHandle: "bottom-source",
        targetHandle: "top-target",
        style: {strokeDasharray: 3}
    },
    {
        id: "SPARQL-END to comunica",
        source: "SPARQL-END",
        target: "comunica",
        type: "straight",
        sourceHandle: "right-source",
        targetHandle: "left-target",
        markerEnd: {
            type: MarkerType.ArrowClosed
        },
        markerStart: {
            type: MarkerType.ArrowClosed,
            orient: "auto-start-reverse"
        }
    },
    {
        id: "Comunica to SPARQL",
        source: "comunica",
        target: "SPARQL",
        type: "straight",
        sourceHandle: "bottom-source",
        targetHandle: "top-target",
        style: {strokeDasharray: 3}
    }

];
