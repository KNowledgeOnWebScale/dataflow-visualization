import {MarkerType} from "react-flow-renderer";

export const globalDefaultsJSON = {
};

export const nodesJSON = [
    { label: 'CSV', shape: "cylinder", fill:"indianred", position: {x: 0, y: -30}, vgroup: "vgroup1" },
    { label: "JSON", shape: "cylinder", fill:"lightcoral",vgroup: "vgroup1",},
    {label: "XML", shape: "cylinder", fill:"sandybrown", vgroup: "vgroup1"},
    {label: "MySQL", shape: "cylinder", fill:"khaki",vgroup: "vgroup1"},
    {label: "API", shape: "square", fill:"darkseagreen",vgroup: "vgroup1"},

    {id: "RML-CSV", type: "custom", label: "RML\nTranslator", shape: "8-star", fill:"dodgerblue", position: {x: 80, y: -30}, width: 60, vgroup: "vgroup2", hgroup:"RDF-CSV"},
    {id: "RML-JSON", type: "custom", label: "RML\nTranslator", shape: "8-star", fill:"dodgerblue", vgroup: "vgroup2", width: 60, hgroup: "RDF-JSON"},
    {id: "RML-XML", type: "custom", label: "RML\nTranslator", shape: "8-star", fill:"dodgerblue", vgroup: "vgroup2", width: 60, hgroup: "RDF-XML"},
    {id: "RML-MySQL", type: "custom", label: "RML\nTranslator", shape: "8-star", fill:"dodgerblue", vgroup: "vgroup2", width: 60, hgroup: "RDF-MySQL"},
    {id: "RML-API", /*style: {backgroundColor: "white"},*/ type: "custom", label: "RML\nTranslator", shape: "8-star", fill:"dodgerblue", vgroup: "vgroup2",hgroup:"RDF-API", width: 60},

    {id: "RDF-CSV", type: "custom", label: "RDF", shape: "cylinder", height: 30, fill:"lightgreen", hgroup:"RDF-CSV",},
    {id: "RDF-JSON", type: "custom", label: "RDF", shape: "cylinder", height: 30, fill:"lightgreen", hgroup:"RDF-JSON"},
    {id: "RDF-XML", type: "custom", label: "RDF", shape: "cylinder", height: 30, fill:"lightgreen", hgroup:"RDF-XML"},
    {id: "RDF-MySQL", type: "custom", label: "RDF", shape: "cylinder", height: 30, fill:"lightgreen", hgroup:"RDF-MySQL"},
    {id: "RDF-API", type: "custom", label: "RDF", shape: "cylinder", height: 30, fill:"lightgreen", hgroup:"RDF-API",},

    { shape: "rmlio", fill:"steelblue", position: {x: 85, y: 350}},

    {shape: "comunica", position: {x: 600, y: 90},},
    {label: "SPARQL", shape: "note", fill:"steelblue", position: {x: 600, y: 180}},

    {id: "note1", type: "custom", label:"RMLTranslator translates\n raw data to RDF on-the-fly,\nbased on the sub-queries\nof comunica", shape: "note", width: 150, height: 150, fill:"lightyellow", strokeWidth:0.1, stroke:"khaki", position: {x: 200, y:-100}},
    {id: "note2", /*style: {backgroundColor: "red"},*/ type: "custom", label:"Comunica queries\nmultiple RDF\ndatasets.\nSPARQL sub-queries go in,\nresults come out", shape: "note", width: 150, height: 150, fill:"lightyellow", strokeWidth:0.1, stroke:"khaki", position: {x: 450, y:-50}}


];


export const edgesJSON = [
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
        //targetHandle: "right-target",
        //sourceHandle: "left-source",
        markerEnd: {
            type: MarkerType.ArrowClosed
        }
    },
    {
        id: "comunica to rml-json",
        source: "comunica",
        target: "RML-JSON",
        type: "straight",
        //targetHandle: "right-target",
        //sourceHandle: "left-source",
        markerEnd: {
            type: MarkerType.ArrowClosed
        }
    },
    {
        id: "comunica to rml-xml",
        source: "comunica",
        target: "RML-XML",
        type: "straight",
        //targetHandle: "right-target",
        //sourceHandle: "left-source",
        markerEnd: {
            type: MarkerType.ArrowClosed
        }
    },
    {
        id: "comunica to mysql",
        source: "comunica",
        target: "RML-MySQL",
        type: "straight",
        //targetHandle: "right-target",
       // sourceHandle: "left-source",
        markerEnd: {
            type: MarkerType.ArrowClosed
        }
    },
    {
        id: "comunica to rml-api",
        source: "comunica",
        target: "RML-API",
        type: "straight",
        //targetHandle: "right-target",
        //sourceHandle: "left-source",
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
