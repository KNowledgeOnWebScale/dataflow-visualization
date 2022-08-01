import {MarkerType} from "react-flow-renderer";

export const globalDefaultsJSON = {
    autoLayout: true,
    orientation: "vertical",
    fill: "royalblue"
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
    {source: "comunica", target:"LD1", markerEnd: {type: "arrowclosed"}},
    {source: "comunica", target:"LD2" , markerEnd: {type: "arrowclosed"}},
    {source: "comunica", target:"LD3", markerEnd: {type: "arrowclosed"}},
    {source: "comunica", target:"LD4", markerEnd: {type: "arrowclosed"}},
    {source: "comunica", target:"LD5", markerEnd: {type: "arrowclosed"}},
];
