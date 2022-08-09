export const globalDefaultsJSON = {
    graph: {},
    node: {},
    edge: {
        type: "straight",
        markerEnd: {
            type: "arrowclosed"
        }
    }

};

export const nodesJSON = [
    {label: 'CSV', shape: "cylinder", fill: "indianred", position: {x: 0, y: -30}, vgroup: "vgroup1"},
    {label: "JSON", shape: "cylinder", fill: "lightcoral", vgroup: "vgroup1",},
    {label: "XML", shape: "cylinder", fill: "sandybrown", vgroup: "vgroup1"},
    {label: "MySQL", shape: "cylinder", fill: "khaki", vgroup: "vgroup1"},
    {label: "API", shape: "square", fill: "darkseagreen", vgroup: "vgroup1"},

    {
        id: "RML-CSV",
        type: "custom",
        label: "RML\nTranslator",
        shape: "8-star",
        fill: "dodgerblue",
        position: {x: 80, y: -30},
        width: 60,
        vgroup: "vgroup2",
        hgroup: "RDF-CSV"
    },
    {
        id: "RML-JSON",
        type: "custom",
        label: "RML\nTranslator",
        shape: "8-star",
        fill: "dodgerblue",
        vgroup: "vgroup2",
        width: 60,
        hgroup: "RDF-JSON"
    },
    {
        id: "RML-XML",
        type: "custom",
        label: "RML\nTranslator",
        shape: "8-star",
        fill: "dodgerblue",
        vgroup: "vgroup2",
        width: 60,
        hgroup: "RDF-XML"
    },
    {
        id: "RML-MySQL",
        type: "custom",
        label: "RML\nTranslator",
        shape: "8-star",
        fill: "dodgerblue",
        vgroup: "vgroup2",
        width: 60,
        hgroup: "RDF-MySQL"
    },
    {
        id: "RML-API",
        type: "custom",
        label: "RML\nTranslator",
        shape: "8-star",
        fill: "dodgerblue",
        vgroup: "vgroup2",
        hgroup: "RDF-API",
        width: 60
    },

    {
        id: "RDF-CSV",
        type: "custom",
        label: "RDF",
        shape: "cylinder",
        height: 30,
        fill: "lightgreen",
        hgroup: "RDF-CSV",
    },
    {
        id: "RDF-JSON",
        type: "custom",
        label: "RDF",
        shape: "cylinder",
        height: 30,
        fill: "lightgreen",
        hgroup: "RDF-JSON"
    },
    {id: "RDF-XML", type: "custom", label: "RDF", shape: "cylinder", height: 30, fill: "lightgreen", hgroup: "RDF-XML"},
    {
        id: "RDF-MySQL",
        type: "custom",
        label: "RDF",
        shape: "cylinder",
        height: 30,
        fill: "lightgreen",
        hgroup: "RDF-MySQL"
    },
    {
        id: "RDF-API",
        type: "custom",
        label: "RDF",
        shape: "cylinder",
        height: 30,
        fill: "lightgreen",
        hgroup: "RDF-API",
    },

    {shape: "rmlio", fill: "steelblue", position: {x: 85, y: 350}},

    {shape: "comunica", position: {x: 600, y: 90},},
    {label: "SPARQL", shape: "note", fill: "steelblue", position: {x: 600, y: 180}},

    {
        id: "note1",
        type: "custom",
        label: "RMLTranslator translates\n raw data to RDF on-the-fly,\nbased on the sub-queries\nof comunica",
        shape: "note",
        width: 150,
        height: 150,
        fill: "lightyellow",
        strokeWidth: 0.1,
        stroke: "khaki",
        position: {x: 200, y: -100}
    },
    {
        id: "note2",
        type: "custom",
        label: "Comunica queries\nmultiple RDF\ndatasets.\nSPARQL sub-queries go in,\nresults come out",
        shape: "note",
        width: 150,
        height: 150,
        fill: "lightyellow",
        strokeWidth: 0.1,
        stroke: "khaki",
        position: {x: 450, y: -50}
    }


];


export const edgesJSON = [
    {
        source: "CSV",
        target: "RML-CSV"

    },
    {
        source: "JSON",
        target: "RML-JSON",
    },
    {
        source: "XML",
        target: "RML-XML",
    },
    {
        source: "MySQL",
        target: "RML-MySQL",
    },
    {
        source: "API",
        target: "RML-API",
    },

    {
        source: "comunica",
        target: "RML-CSV",
    },
    {
        source: "comunica",
        target: "RML-JSON",
        type: "straight",
    },
    {
        source: "comunica",
        target: "RML-XML",
    },
    {
        source: "comunica",
        target: "RML-MySQL",
    },
    {
        source: "comunica",
        target: "RML-API",
    },

    {
        source: "RML-CSV",
        target: "rmlio",
        sourceHandle: "bottom-source",
        targetHandle: "top-target",
        strokeDasharray: "6 3",
        markerEnd: {}
    },

    {
        source: "comunica",
        target: "SPARQL",
        sourceHandle: "bottom-source",
        targetHandle: "top-target",
        strokeDasharray: "6 3",
        markerEnd: {}
    }

];
