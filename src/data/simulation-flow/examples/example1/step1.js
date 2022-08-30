export const globalDefaultsJSON = {
    "graph": {},
    "node": {
        "presets": {
            "cylinder-1": {
                "shape": "cylinder",
                "vgroup": "vgroup1"
            },
            "RML-Translator-preset": {
                "label": "RML\nTranslator",
                "shape": "8-star",
                "fill": "dodgerblue",
                "width": 60,
                "vgroup": "vgroup2"
            }
        }
    },
    "edge": {
        "type": "straight",
        "markerEnd": {
            "type": "arrowclosed"
        }
    }
}


export const nodesJSON = [
    {
        "label": "CSV",
        "preset": "cylinder-1",
        "fill": "indianred",
        "position": {
            "x": 0,
            "y": -30
        }
    },
    {
        "label": "JSON",
        "preset": "cylinder-1",
        "fill": "lightcoral"
    },
    {
        "label": "XML",
        "preset": "cylinder-1",
        "fill": "sandybrown"
    },
    {
        "label": "MySQL",
        "preset": "cylinder-1",
        "fill": "khaki"
    },
    {
        "label": "API",
        "preset": "cylinder-1",
        "fill": "darkseagreen"
    },
    {
        "id": "RML-CSV",
        "preset": "RML-Translator-preset",
        "position": {
            "x": 80,
            "y": -30
        },
        "hgroup": "RDF-CSV"
    },
    {
        "id": "RML-JSON",
        "preset": "RML-Translator-preset",
        "hgroup": "RDF-JSON"
    },
    {
        "id": "RML-XML",
        "preset": "RML-Translator-preset",
        "hgroup": "RDF-XML"
    },
    {
        "id": "RML-MySQL",
        "preset": "RML-Translator-preset",
        "hgroup": "RDF-MySQL"
    },
    {
        "id": "RML-API",
        "preset": "RML-Translator-preset",
        "hgroup": "RDF-API"
    },
    {
        "shape": "rmlio",
        "fill": "steelblue",
        "position": {
            "x": 85,
            "y": 350
        }
    },
    {
        "shape": "comunica",
        "position": {
            "x": 600,
            "y": 90
        }
    },
    {
        "label": "SPARQL",
        "shape": "note",
        "fill": "steelblue",
        "position": {
            "x": 600,
            "y": 180
        }
    }
]

export const edgesJSON = [
    {
        "source": "CSV",
        "target": "RML-CSV"
    },
    {
        "source": "JSON",
        "target": "RML-JSON"
    },
    {
        "source": "XML",
        "target": "RML-XML"
    },
    {
        "source": "MySQL",
        "target": "RML-MySQL"
    },
    {
        "source": "API",
        "target": "RML-API"
    },
    {
        "source": "comunica",
        "target": "RML-CSV"
    },
    {
        "source": "comunica",
        "target": "RML-JSON",
        "type": "straight"
    },
    {
        "source": "comunica",
        "target": "RML-XML"
    },
    {
        "source": "comunica",
        "target": "RML-MySQL"
    },
    {
        "source": "comunica",
        "target": "RML-API"
    },
    {
        "source": "RML-CSV",
        "target": "rmlio",
        "sourceHandle": "bottom",
        "targetHandle": "top",
        "strokeDasharray": "6 3",
        "markerEnd": {}
    },
    {
        "source": "comunica",
        "target": "SPARQL",
        "sourceHandle": "bottom",
        "targetHandle": "top",
        "strokeDasharray": "6 3",
        "markerEnd": {}
    }
]

