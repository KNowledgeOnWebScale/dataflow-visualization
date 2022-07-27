import {MarkerType} from "react-flow-renderer";

export const nodesData = [
    {id: 'CSV', type: "custom", data: {label: 'CSV', shape: "cylinder", fill:"indianred"}, position: {x: 0, y: -30},},
    {id: "JSON", type: "custom", data: {label: "JSON", shape: "cylinder", fill:"lightcoral"}, position: {x: 0, y: 30},},
    {id: "XML", type: "custom", data: {label: "XML", shape: "cylinder", fill:"sandybrown"}, position: {x: 0, y: 90},},
    {id: "MySQL", type: "custom", data: {label: "MySQL", shape: "cylinder", fill:"khaki"}, position: {x: 0, y: 150},},
    {id: "API", type: "custom", data: {label: "API", shape: "square", fill:"darkseagreen"}, position: {x: 0, y: 210},},

    {id: "RML-CSV", type: "custom", data: {label: "RML\nTranslator", shape: "8-star", fill:"dodgerblue"}, position: {x: 80, y: -30},},
    {id: "RML-JSON", type: "custom", data: {label: "RML\nTranslator", shape: "8-star", fill:"dodgerblue"}, position: {x: 80, y: 30},},
    {id: "RML-XML", type: "custom", data: {label: "RML\nTranslator", shape: "8-star", fill:"dodgerblue"}, position: {x: 80, y: 90},},
    {id: "RML-MySQL", type: "custom", data: {label: "RML\nTranslator", shape: "8-star", fill:"dodgerblue"}, position: {x: 80, y: 150},},
    {id: "RML-API", /*style: {backgroundColor: "white"},*/ type: "custom", data: {label: "RML\nTranslator", shape: "8-star", fill:"dodgerblue"}, position: {x: 80, y: 210},},

    {id: "RDF-CSV", type: "custom", data: {label: "RDF", shape: "cylinder", height: 30, fill:"lightgreen"}, position: {x: 130, y: -20},},
    {id: "RDF-JSON", type: "custom", data: {label: "RDF", shape: "cylinder", height: 30, fill:"lightgreen"}, position: {x: 130, y: 40},},
    {id: "RDF-XML", type: "custom", data: {label: "RDF", shape: "cylinder", height: 30, fill:"lightgreen"}, position: {x: 130, y: 100},},
    {id: "RDF-MySQL", type: "custom", data: {label: "RDF", shape: "cylinder", height: 30, fill:"lightgreen"}, position: {x: 130, y: 160},},
    {id: "RDF-API", type: "custom", data: {label: "RDF", shape: "cylinder", height: 30, fill:"lightgreen"}, position: {x: 130, y: 220},},

    {id: "rmlio", type: "custom", data: {label: "rml.io", shape: "note", fill:"steelblue"}, position: {x: 80, y: 280}},

    {id: 'comunica', type: 'custom', data: {label: '', shape: "comunica"}, position: {x: 600, y: 90},},
    {id: "SPARQL", type: "custom", data: {label: "SPARQL", shape: "note", fill:"steelblue"}, position: {x: 600, y: 180}},

    {id: "note1", type: "custom", data: {label:"RMLTranslator translates raw\ndata to RDF on-the-fly,\nbased on the sub-queries\nof comunica", shape: "note", width: 150, height: 150, fill:"lightyellow", strokeWidth:0.1, stroke:"khaki"}, position: {x: 200, y:-100}},
    {id: "note2", /*style: {backgroundColor: "red"},*/ type: "custom", data: {label:"Comunica queries multiple\nRDF datasets SPARQL\nsub-queries goes in,\nresults come out", shape: "note", width: 150, height: 150, fill:"lightyellow", strokeWidth:0.1, stroke:"khaki"}, position: {x: 450, y:-50}}


];


export const edgesData = [
    {
        id: "csv to rml",
        source: "CSV",
        target: "RML-CSV",
        type: "straight",
        markerEnd: {
            type: MarkerType.ArrowClosed
        }
    },
    {
        id: "json to rml",
        source: "JSON",
        target: "RML-JSON",
        type: "straight",
        markerEnd: {
            type: MarkerType.ArrowClosed
        }
    },
    {
        id: "xml to rml",
        source: "XML",
        target: "RML-XML",
        type: "straight",
        markerEnd: {
            type: MarkerType.ArrowClosed
        }
    },
    {
        id: "mysql to rml",
        source: "MySQL",
        target: "RML-MySQL",
        type: "straight",
        markerEnd: {
            type: MarkerType.ArrowClosed
        }
    },
    {
        id: "api to rml",
        source: "API",
        target: "RML-API",
        type: "straight",
        markerEnd: {
            type: MarkerType.ArrowClosed
        }
    },

    {
        id: "comunica to rml-csv",
        source: "comunica",
        target: "RML-CSV",
        type: "straight",
        targetHandle: "right-target",
        sourceHandle: "left-source",
        markerEnd: {
            type: MarkerType.ArrowClosed
        }
    },
    {
        id: "comunica to rml-json",
        source: "comunica",
        target: "RML-JSON",
        type: "straight",
        targetHandle: "right-target",
        sourceHandle: "left-source",
        markerEnd: {
            type: MarkerType.ArrowClosed
        }
    },
    {
        id: "comunica to rml-xml",
        source: "comunica",
        target: "RML-XML",
        type: "straight",
        targetHandle: "right-target",
        sourceHandle: "left-source",
        markerEnd: {
            type: MarkerType.ArrowClosed
        }
    },
    {
        id: "comunica to mysql",
        source: "comunica",
        target: "RML-MySQL",
        type: "straight",
        targetHandle: "right-target",
        sourceHandle: "left-source",
        markerEnd: {
            type: MarkerType.ArrowClosed
        }
    },
    {
        id: "comunica to rml-api",
        source: "comunica",
        target: "RML-API",
        type: "straight",
        targetHandle: "right-target",
        sourceHandle: "left-source",
        markerEnd: {
            type: MarkerType.ArrowClosed
        }
    },

    {
        id: "rml-csv to rmlio",
        source: "RML-CSV",
        target: "rmlio",
        type: "straight",
        sourceHandle: "bottom-source",
        targetHandle: "top-target",
        style: {strokeDasharray: "6 3"}
    },

    {
        id:"comunica to sparql",
        source: "comunica",
        target: "SPARQL",
        sourceHandle: "bottom-source",
        targetHandle: "top-target",
        style:{strokeDasharray: "6 3"}
    }

];
