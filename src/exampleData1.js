import {MarkerType} from "react-flow-renderer";

export const nodesData = [
    {id: 'csv', type: "custom", data: { label: 'csv', shape: "cylinder" }, position: { x: 0, y: 0 },},
    {id: 'JSON', type: "custom", data: { label: 'JSON', shape: "cylinder" }, position: { x: 0, y: 70 },},
    {id: 'XML', type: "custom", data: { label: 'XML', shape: "cylinder" }, position: { x: 0, y: 140 },},
    {id: 'MySQL', type: "custom", data: { label: 'MySQL', shape: "cylinder" }, position: { x: 0, y: 210 },},
    {id: 'API', type: "input", data: { label: 'API' }, position: { x: 0, y: 280 },},

    { id: 'RML', type:"custom", data: { label: 'RML Mapper', shape:"8-star" }, position: { x: 300, y: 55 } },
    { id: 'RDF', type:"custom", data: { label: 'RDF', shape: "cylinder" }, position: { x: 400, y: 55 } },
    {id: 'SPARQL-END', data: { label: 'SPARQL Endpoint' }, position: { x: 450, y: 70 } },

    {id: "rmlio", type:"custom", data: {label: "rml.io", shape:"note"}, position:{x:300, y: 200}},

    {id: 'comunica', type: 'custom', data: { label: 'Output 7', shape: "comunica" }, position: { x: 500, y: 250 },},
    {id: "SPARQL", type: "custom", data: {label: "SPARQL", shape: "note"}, position: {x: 500, y: 400}}
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
        targetHandle: "top-target",
        markerEnd: {
            type: MarkerType.ArrowClosed
        }
    },
    {
        id: "Comunica to SPARQL",
        source: "comunica",
        target: "SPARQL",
        type: "straight",
        sourceHandle: "bottom-source",
        targetHandle: "top-target",
        makerEnd: {
            type:MarkerType.ArrowClosed
        }
    }

];
