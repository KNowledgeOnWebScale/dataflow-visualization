
export const globalDefaultsJSON = {
    graph: {
        autoLayout: true,
        orientation: "vertical",
    },
    node: {
        fill: "royalblue",
    },
    edge: {
        edgeColor: "darkgray",
        markerEnd: {type: "arrowclosed"},
        markerStart: {type: "arrowclosed"}
    }
};

export const nodesJSON = [
    {id: "LD1", label: '#LD', shape: "cylinder"},
    {id: "LD2", label: '#LD', shape: "cylinder"},
    {id: "LD3", label: '#LD', shape: "cylinder"},
    {id: "LD4", label: '#LD', shape: "cylinder"},
    {id: "LD5", label: '#LD', shape: "cylinder"},
    {shape: "comunica"}
];


export const edgesJSON = [
    {source: "comunica", target:"LD1", label: "LD1"},
    {source: "comunica", target:"LD2", label:"LD2" },
    {source: "comunica", target:"LD3", label: "LD3"},
    {source: "comunica", target:"LD4", label: "LD4"},
    {source: "comunica", target:"LD5", label: "LD5"},
];
