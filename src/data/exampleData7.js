export const globalDefaultsJSON = {
    height: 80,
    width: 90,
    fontsize: 10,
    strokeWidth: 0.7
};

export const nodesJSON = [
    {
        // PARENTNODE 1
       // id: 'client 1',  // TODO: bij lack aan id ook kijken naar title
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
       // id: 'client 2',  // TODO: bij lack aan id ook kijken naar title
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
       // id: 'client 3',  // TODO: bij lack aan id ook kijken naar title
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
//  die marker end moet ook simpeler (en mss ook in globalDefault)
export const edgesJSON = [
    { source: 'hd-1', target: 'rml-1', type: "straight", zIndex:1, markerEnd: {type: "arrowclosed"} },
    { source: 'rml-rules-1', target: 'rml-1', type: "straight", zIndex:1, markerEnd: {type: "arrowclosed"} },
    { source: 'rml-1', target: 'rdf-1', type: "straight", zIndex:1, markerEnd: {type: "arrowclosed"} },
    { source: 'rdf-1', target: 'sparql-1', type: "straight", zIndex:1, markerEnd: {type: "arrowclosed"} },

    { source: 'hd-2', target: 'rml-2', type: "straight", zIndex:1, markerEnd: {type: "arrowclosed"} },
    { source: 'rml-rules-2', target: 'rml-2', type: "straight", zIndex:1, markerEnd: {type: "arrowclosed"} },
    { source: 'rml-2', target: 'rdf-2', type: "straight", zIndex:1, markerEnd: {type: "arrowclosed"} },
    { source: 'rdf-2', target: 'sparql-2', type: "straight", zIndex:1, markerEnd: {type: "arrowclosed"} },

    { source: 'hd-3', target: 'rml-3', type: "straight", zIndex:1, markerEnd: {type: "arrowclosed"} },
    { source: 'rml-rules-3', target: 'rml-3', type: "straight", zIndex:1, markerEnd: {type: "arrowclosed"} },
    { source: 'rml-3', target: 'rdf-3', type: "straight", zIndex:1, markerEnd: {type: "arrowclosed"} },
    { source: 'rdf-3', target: 'sparql-3', type: "straight", zIndex:1, markerEnd: {type: "arrowclosed"} },

    {source: "sparql-1", target: "sparql", style: {animation: "dashdraw .2s linear infinite", "strokeDasharray": "4 4"}, markerEnd: {type: "arrowclosed"}},
    {source: "sparql-2",  target: "sparql", style: {animation: "dashdraw .3s linear infinite", "strokeDasharray": "6 6"}, markerEnd: {type: "arrowclosed"}},
    {source: "sparql-3",  target: "sparql", animated: true, style: {animation: "dashdraw 1s linear infinite", "strokeDasharray": "9 3 1 3"}, markerEnd: {type: "arrowclosed"}},


];