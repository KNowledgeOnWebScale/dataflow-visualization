export const globalDefaultsJSON = {
    "graph": {},
    "node": {
        shape: "cylinder"
    },
    "edge": {
        presets: {
            "comunica-to-rdf": {
                type: "straight",
                animated: true,
                markerEnd: {type: "arrowclosed"},
                strokeDasharray: "varied",
            }
        }
    }

};

export const nodesJSON = [
    {
        label: 'RDF',
        vgroup: "group1"
    },
    {
        label: "RDF'",
        vgroup: "group1"
    },
    {
        label: "RDF''",
        vgroup: "group1"
    },
    {
        label: "RDF'''",
        vgroup: "group1"
    },
    {
        label: "RDF''''",
        vgroup: "group1"
    },


    {
        shape: "comunica",
        position: {x: 600, y: 90},
        vgroup: "group2"
    },
    {
        label: "SPARQL",
        shape: "note",
        vgroup: "group2"
    },


    {
        label: "Comunica queries\nmultiple RDF\ndatasets\nSPARQL sub-query\ngoes in, results\ncome out",
        width: 120,
        height: 120,
        shape: "note",
        position: {x: 500, y: -10}
    },

];


export const edgesJSON = [
    {
        target: 'RDF',
        source: 'comunica',
        preset: "comunica-to-rdf"
    },
    {
        target: "RDF'",
        source: 'comunica',
        preset: "comunica-to-rdf"
    },
    {
        target: "RDF''",
        source: 'comunica',
        preset: "comunica-to-rdf"
    },
    {
        target: "RDF'''",
        source: 'comunica',
        preset: "comunica-to-rdf"
    },
    {
        target: "RDF''''",
        source: 'comunica',
        preset: "comunica-to-rdf"
    },
    {
        source: "comunica",
        target: "SPARQL",
        sourceHandle: "bottom",
        targetHandle: "top",
        markerEnd: {},
        strokeDasharray: 3,
        animation: "none"
    }
];
