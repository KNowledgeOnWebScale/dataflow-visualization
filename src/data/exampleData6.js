export const globalDefaultsJSON = {
    height: 80,
    width: 90,
    fontsize: 10,
    strokeWidth: 0.7,
    markerEnd: {type: "arrowclosed"},
    type: "straight"
};

export const nodesJSON = [
    {
        // PARENTNODE 1
        title: 'Client 1',
        shape:"rectangle",
        stroke:"royalblue",
        strokeWidth:3,
        width:455,
        height: 190,
        position: { x: -5, y: 0 },
    },
    {
        // PARENTNODE 1
        title: 'Client 2',
        shape:"rectangle",
        stroke:"royalblue",
        strokeWidth:3,
        width:455,
        height: 190,
        position: { x: -5, y: 200 },
    },
    {
        // PARENTNODE 1
        title: 'Client 3',
        shape:"rectangle",
        stroke:"royalblue",
        strokeWidth:3,
        width:455,
        height: 190,
        position: { x: -5, y: 400 },
    },
    {id: "hd-1", parentNode: "Client 1", shape: "cylinder", "label": "Heterogeneous\ndata sources", position: {x:0, y:10}},
    { id: "rml-rules-1", parentNode: "Client 1", shape: "hexagon", label: "RML mapping\nrules", position: {x: 0, y:100}},
    {id: "rml-1", parentNode: "Client 1", shape: "rectangle", height: 60, "label": "RML mapper", position:{x: 120, y:60}},
    {id: "rdf-1", parentNode: "Client 1", shape: "cylinder", label: "RDF data", position: {x:240, y: 50}},
    {id: "sparql-1", parentNode: "Client 1", shape: "rectangle", height: 60, label: "SPARQL\nEndpoint", position: {x:360, y: 60}},

    {id: "hd-2", parentNode: "Client 2", shape: "cylinder", "label": "Heterogeneous\ndata sources", position: {x:0, y:10}},
    { id: "rml-rules-2", parentNode: "Client 2", shape: "hexagon", label: "RML mapping\nrules", position: {x: 0, y:100}},
    {id: "rml-2", parentNode: "Client 2", shape: "rectangle", height: 60, "label": "RML mapper", position:{x: 120, y:60}},
    {id: "rdf-2", parentNode: "Client 2", shape: "cylinder", label: "RDF data", position: {x:240, y: 50}},
    {id: "sparql-2", parentNode: "Client 2", shape: "rectangle", height: 60, label: "SPARQL\nEndpoint", position: {x:360, y: 60}},

    {id: "hd-3", parentNode: "Client 3", shape: "cylinder", "label": "Heterogeneous\ndata sources", position: {x:0, y:10}},
    { id: "rml-rules-3", parentNode: "Client 3", shape: "hexagon", label: "RML mapping\nrules", position: {x: 0, y:100}},
    {id: "rml-3", parentNode: "Client 3", shape: "rectangle", height: 60, "label": "RML mapper", position:{x: 120, y:60}},
    {id: "rdf-3", parentNode: "Client 3", shape: "cylinder", label: "RDF data", position: {x:240, y: 50}},
    {id: "sparql-3", parentNode: "Client 3", shape: "rectangle", height: 60, label: "SPARQL\nEndpoint", position: {x:360, y: 60}},

    {id: "sparql", shape: "rectangle", height: 60, label: "SPARQL\nqueries to\nComunica", position: {x: 550, y: 260}}
];

//TODO: zIndex als het in een parent zit moet automatisch aangepast worden
export const edgesJSON = [
    { source: 'hd-1', target: 'rml-1' , zIndex:1 },
    { source: 'rml-rules-1', target: 'rml-1', zIndex:1},
    { source: 'rml-1', target: 'rdf-1', zIndex:1 },
    { source: 'rdf-1', target: 'sparql-1', zIndex:1 },

    { source: 'hd-2', target: 'rml-2', zIndex:1 },
    { source: 'rml-rules-2', target: 'rml-2', zIndex:1 },
    { source: 'rml-2', target: 'rdf-2', zIndex:1},
    { source: 'rdf-2', target: 'sparql-2', zIndex:1 },

    { source: 'hd-3', target: 'rml-3', zIndex:1 },
    { source: 'rml-rules-3', target: 'rml-3', zIndex:1 },
    { source: 'rml-3', target: 'rdf-3', zIndex:1 },
    { source: 'rdf-3', target: 'sparql-3', zIndex:1 },

    {source: "sparql-1", target: "sparql", type: 'default', style: {animation: "dashdraw .2s linear infinite", "strokeDasharray": "4 4"}},
    {source: "sparql-2",  target: "sparql", type: 'default', style: {animation: "dashdraw .3s linear infinite", "strokeDasharray": "6 6"}},
    {source: "sparql-3",  target: "sparql", type: 'default', style: {animation: "dashdraw 1s linear infinite", "strokeDasharray": "9 3 1 3"}},


];