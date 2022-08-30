export const title = "autoLayout example"

export const globalDefaultsJSON = {
    graph: {
        autoLayout: true,
        orientation: "vertical",
        spacing: 1.9
    },
    node: {
        fill: "maroon",
        shape: "icon",
        iconName: "FaDatabase",
        topText: "#LD",
        height: 65,
        width: 45
    },
    edge: {
        color: "darkgray",
        markerEnd: {type: "arrowclosed"},
        markerStart: {type: "arrowclosed"}
    }
};

export const nodesJSON = [
    {id: "LD1"},
    {id: "LD2"},
    {id: "LD3"},
    {id: "LD4"},
    {id: "LD5"},
    {shape: "comunica", topText: ""}
];


export const edgesJSON = [
    {source: "comunica", target: "LD1", label: "LD1"},
    {source: "comunica", target: "LD2", label: "LD2"},
    {source: "comunica", target: "LD3", label: "LD3"},
    {source: "comunica", target: "LD4", label: "LD4"},
    {source: "comunica", target: "LD5", label: "LD5"},
];
