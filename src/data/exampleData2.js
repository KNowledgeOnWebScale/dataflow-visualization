import {MarkerType} from "react-flow-renderer";

export const globalDefaultsJSON = {
    stroke: "darkgray",
    fill: "lightyellow",
    fontsize: 10,
    strokeWidth: 0.2
};

export const nodesJSON = [
    {label: 'CSV', shape: "cylinder" , position: { x: 0, y: -30 },},
    {label: 'JSON', shape: "cylinder" , position: { x: 0, y: 30 },},
    {label: 'XML', shape: "cylinder" , position: { x: 0, y: 90 },},
    {label: 'MySQL', shape: "cylinder" , position: { x: 0, y: 150 },},
    {label: 'API', shape: "circle" , position: { x: 0, y: 210 },},

    { id: 'RML', type:"custom", label: 'RML\nStreamer', shape:"8-star", width: "70", height: "70" , position: { x: 200, y: 55 } },
    { label: 'RDF', shape: "cylinder" , position: { x: 400, y: 65 } },
    {id: 'SPARQL-END', type: "custom", label: 'SPARQL\nEndpoint', shape: "square" , position: { x: 450, y: 65 } },

    {id: "rmlio", type:"custom", label: "rml.io", shape:"note", position:{x:210, y: 200}},

    { shape: "comunica" , position: { x: 600, y: 65 },},
    {label: "SPARQL", shape: "note", position: {x: 600, y: 200}},


    {id: "note1", type: "custom", label:"The RML Streamer\nstreaminly converts\nthe data from the\nheterogeneous sources", width: 110, height: 110, shape: "note", position: {x: 100, y: -100} },
    {id: "note3", type: "custom", label:"Comunica queries the\nSPARQL endpoint:\nSPARQL query\ngoes in,\nresults come out", width: 110, height: 110, shape: "note", position: {x: 500, y: -60} }



];


export const edgesJSON = [
    {
        id: 'CSV to RDF',
        source: 'CSV',
        target: 'RDF',
        className: 'normal-edge',
        markerEnd: {
            type: MarkerType.ArrowClosed,
        },
        style: {strokeDasharray: "5 2 2 2"},
        animated: true
    },
    {
        id: 'JSON to RDF',
        source: 'JSON',
        target: 'RDF',
        className: 'normal-edge',
        markerEnd: {
            type: MarkerType.ArrowClosed,
        },
        style: {strokeDasharray: "5 2 2 2"},
        animated: true
    },
    {
        id: 'XML to RDF',
        source: 'XML',
        target: 'RDF',
        className: 'normal-edge',
        markerEnd: {
            type: MarkerType.ArrowClosed,
        },
        style: {strokeDasharray: "5 2 2 2"},
        animated: true
    },
    {
        id: 'MySQL to RDF',
        source: 'MySQL',
        target: 'RDF',
        className: 'normal-edge',
        markerEnd: {
            type: MarkerType.ArrowClosed,
        },
        style: {strokeDasharray: "5 2 2 2"},
        animated: true
    },
    {
        id: 'API to RDF',
        source: 'API',
        target: 'RDF',
        className: 'normal-edge',
        markerEnd: {
            type: MarkerType.ArrowClosed,
        },
        style: {strokeDasharray: "5 2 2 2"},
        animated: true
    },
    {
        id: "RML to rmlio",
        source: "RML",
        target: "rmlio",
        type: "straight",
        sourceHandle: "bottom-source",
        targetHandle: "top-target",
        style: {strokeDasharray: 3},
    },
    {
        id: "SPARQL-END to comunica",
        source: "SPARQL-END",
        target: "comunica",
        type: "straight",
      //  sourceHandle: "right-source",
       // targetHandle: "left-target",
        markerEnd: {
            type: MarkerType.ArrowClosed
        },
        markerStart: {
            type: MarkerType.ArrowClosed,
            orient: "auto-start-reverse"
        },
    },
    {
        id: "Comunica to SPARQL",
        source: "comunica",
        target: "SPARQL",
        type: "straight",
     //   sourceHandle: "bottom-source",
      //  targetHandle: "top-target",
        style: {strokeDasharray: 3}
    }

];
