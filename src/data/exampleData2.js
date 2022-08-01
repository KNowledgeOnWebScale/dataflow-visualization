import {MarkerType} from "react-flow-renderer";

export const globalDefaultsJSON = {
    fontsize:10,
    edgeThickness: 0.5
};

export const nodesJSON = [
    {vgroup: "vgroup1", label: 'csv', shape: "cylinder", position: { x: 1, y: -85 },},
    {vgroup: "vgroup1", label: 'JSON', shape: "cylinder", /*position: { x: 0, y: 70 },*/ },
    {vgroup: "vgroup1", label: 'XML', shape: "cylinder" /*, position: { x: 0, y: 140 },*/},
    {vgroup: "vgroup1", label: 'MySQL', shape: "cylinder"/*, position: { x: 0, y: 210 },*/},
    {vgroup: "vgroup1", label: 'API', shape: "circle"/*, position: { x: 0, y: 280 },*/},

    { id: 'RML', vgroup: "vgroup3",/*, type:"custom",*/ label: 'RML\nMapper', shape:"8-star", width: 70, height: 70 , position: { x: 300, y: 55 } },
    { /*id: 'RDF', type:"custom",*/ label: 'RDF', shape: "cylinder", position: { x: 400, y: 65 } },
    {hgroup: "hgroup1", id: 'SPARQL-END',label: 'SPARQL\nEndpoint', shape: "square" , position: { x: 450, y: 65 } },

    {vgroup: "vgroup3", image: "rmlio", stroke:"white" /*TODO: die stroke autom fixen*/  /*, position:{x:310, y: 200}*/},

    {hgroup: "hgroup1", vgroup: "vgroup2", shape: "comunica" /*, position: { x: 600, y: 65 },*/},
    {id: "SPARQL", vgroup: "vgroup2", label: "SPARQL", shape: "note"/*, position: {x: 600, y: 200}*/},


    {id: "note1", label:"The RML Mapper\npulls data from the\nheterogeneous data\nsources", width: 110, height: 110, shape: "note", position: {x: 100, y: -100} },
    {id: "note2", label:"The RML Mapper\npushes an RDF graph", width: 110, height: 110, shape: "note", position: {x: 330, y: -60} },
    {id: "note3", label:"Comunica queries the\nSPARQL endpoint:\nSPARQL query\ngoes in,\nresults come out", width: 110, height: 110, shape: "note", position: {x: 500, y: -60} }



];


export const edgesJSON = [
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
       // sourceHandle: "right-source",
       // targetHandle: "left-target",
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
