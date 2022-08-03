
export const globalDefaultsJSON = {
    stroke: "darkgray",
    fill: "lightyellow",
    fontsize: 10,
    strokeWidth: 0.2,
    animated: true,
    markerEnd: {type: "arrowclosed"},
};

export const nodesJSON = [
    {vgroup: "vgroup1", label: 'CSV', shape: "cylinder", position: { y: -85 },},
    {vgroup: "vgroup1", label: 'JSON', shape: "cylinder"},
    {vgroup: "vgroup1", label: 'XML', shape: "cylinder" },
    {vgroup: "vgroup1", label: 'MySQL', shape: "cylinder"},
    {vgroup: "vgroup1", label: 'API', shape: "circle"},

    { id: 'RML', type:"custom", label: 'RML\nStreamer', shape:"8-star", width: 70, height: 70 , position: { x: 200, y: 55 } },
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
        source: 'CSV',
        target: 'RDF',
        style: {strokeDasharray: "5 2 2 2"},
    },
    {
        source: 'JSON',
        target: 'RDF',
        style: {strokeDasharray: "5 2 2 2"},
    },
    {
        source: 'XML',
        target: 'RDF',
        style: {strokeDasharray: "5 2 2 2"},
    },
    {
        source: 'MySQL',
        target: 'RDF',
        style: {strokeDasharray: "5 2 2 2"},
    },
    {
        source: 'API',
        target: 'RDF',
        style: {strokeDasharray: "5 2 2 2"},
    },
    {
        source: "RML",
        target: "rmlio",
        type: "straight",
        sourceHandle: "bottom-source",
        targetHandle: "top-target",
        style: {strokeDasharray: 3},
        markerEnd: {},
        animated: false
    },
    {
        source: "SPARQL-END",
        target: "comunica",
        type: "straight",
        markerStart: {type: "arrowclosed"},
        animated: false
    },
    {
        id: "Comunica to SPARQL",
        source: "comunica",
        target: "SPARQL",
        type: "straight",
        sourceHandle: "bottom-source",
        targetHandle: "top-target",
        style: {strokeDasharray: 3},
        markerEnd: {},
        animated: false
    }

];
