export const globalDefaultsJSON = {
    graph: {},
    node: {
        presets: {
            "cylinder-1": {
                shape: "cylinder",
                vgroup: "vgroup1"
            },
            "RML-Translator-preset": {
                label: "RML\nTranslator",
                shape: "8-star",
                fill: "dodgerblue",
                width: 60,
                vgroup: "vgroup2"
            },
            "RDF": {
                shape: "cylinder",
                label: "RDF",
                height: 30,
                fill: "lightgreen",
            }
        }
    },
    edge: {
        type: "straight",
        markerEnd: {
            type: "arrowclosed"
        }
    }

};

export const nodesJSON = [
    {label: 'CSV', preset: "cylinder-1", fill: "indianred", position: {x: 0, y: -30}},
    {label: "JSON", preset: "cylinder-1", fill: "lightcoral"},
    {label: "XML", preset: "cylinder-1", fill: "sandybrown"},
    {label: "MySQL", preset: "cylinder-1", fill: "khaki"},
    {label: "API", preset: "cylinder-1", fill: "darkseagreen"},

    {
        id: "RML-CSV",
        preset: "RML-Translator-preset",
        position: {x: 80, y: -30},
        hgroup: "RDF-CSV"
    },
    {
        id: "RML-JSON",
        preset: "RML-Translator-preset",
        hgroup: "RDF-JSON"
    },
    {
        id: "RML-XML",
        preset: "RML-Translator-preset",
        hgroup: "RDF-XML"
    },
    {
        id: "RML-MySQL",
        preset: "RML-Translator-preset",
        hgroup: "RDF-MySQL"
    },
    {
        id: "RML-API",
        preset: "RML-Translator-preset",
        hgroup: "RDF-API",
    },

    {
        id: "RDF-CSV",
        preset: "RDF",
        hgroup: "RDF-CSV",
    },
    {
        id: "RDF-JSON",
        preset: "RDF",
        hgroup: "RDF-JSON"
    },
    {
        id: "RDF-XML",
        preset: "RDF",
        hgroup: "RDF-XML"
    },
    {
        id: "RDF-MySQL",
        preset: "RDF",
        hgroup: "RDF-MySQL"
    },
    {
        id: "RDF-API",
        preset: "RDF",
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
        position: {x: 250, y: -100}
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
        sourceHandle: "bottom",
        targetHandle: "top",
        strokeDasharray: "6 3",
        markerEnd: {}
    },

    {
        source: "comunica",
        target: "SPARQL",
        sourceHandle: "bottom",
        targetHandle: "top",
        strokeDasharray: "6 3",
        markerEnd: {}
    }

];
