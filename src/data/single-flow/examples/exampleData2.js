export const globalDefaultsJSON = {
    graph: {},
    node: {
        presets: {
            "data-preset": {
                vgroup: "vgroup1",
                shape: "cylinder"
            }
        },
        stroke: "darkgray",
        fill: "lightyellow",
        fontsize: 10,
        strokeWidth: 0.2,
    },
    edge: {
        presets: {
            "data-preset": {
                animation: "default",
                markerEnd: {type: "arrowclosed", size: 25},
                strokeDasharray: "varied"
            }
        }
    }

};

export const nodesJSON = [
    {
        preset: "data-preset",
        label: 'CSV',
        position: {y: -85},
    },
    {
        preset: "data-preset",
        label: 'JSON'
    },
    {
        preset: "data-preset",
        label: 'XML'
    },
    {
        preset: "data-preset",
        label: 'MySQL'
    },
    {
        preset: "data-preset",
        label: 'API',
        shape: "circle"
    },

    {
        id: 'RML',
        label: 'RML\nStreamer',
        shape: "8-star",
        width: 70,
        height: 70,
        position: {x: 200, y: 55}
    },
    {label: 'RDF', shape: "cylinder", position: {x: 400, y: 65}},
    {id: 'SPARQL-END', label: 'SPARQL\nEndpoint', shape: "square", position: {x: 450, y: 65}},

    {id: "rmlio", label: "rml.io", shape: "note", position: {x: 210, y: 200}},

    {shape: "comunica", position: {x: 600, y: 65},},
    {label: "SPARQL", shape: "note", position: {x: 600, y: 200}},

    {
        id: "note1",
        label: "The RML Streamer\nstreaminly converts\nthe data from the\nheterogeneous sources",
        width: 110,
        height: 110,
        shape: "note",
        position: {x: 100, y: -100}
    },
    {
        id: "note3",
        label: "Comunica queries the\nSPARQL endpoint:\nSPARQL query\ngoes in,\nresults come out",
        width: 110,
        height: 110,
        shape: "note",
        position: {x: 500, y: -60}
    }


];


export const edgesJSON = [
    {
        source: 'CSV',
        target: 'RDF',
        preset: "data-preset"
    },
    {
        source: 'JSON',
        target: 'RDF',
        preset: "data-preset"
    },
    {
        source: 'XML',
        target: 'RDF',
        preset: "data-preset"
    },
    {
        source: 'MySQL',
        target: 'RDF',
        preset: "data-preset"
    },
    {
        source: 'API',
        target: 'RDF',
        preset: "data-preset"
    },
    {
        source: "RML",
        target: "rmlio",
        type: "straight",
        sourceHandle: "bottom",
        targetHandle: "top",
        strokeDasharray: 3,
    },
    {
        source: "SPARQL-END",
        target: "comunica",
        type: "straight",
        markerStart: {type: "arrowclosed"},
        markerEnd: {type: "arrowclosed"},
    },
    {
        id: "Comunica to SPARQL",
        source: "comunica",
        target: "SPARQL",
        type: "straight",
        sourceHandle: "bottom",
        targetHandle: "top",
        strokeDasharray: 3,
    }

];
