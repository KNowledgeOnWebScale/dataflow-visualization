import {MarkerType} from "react-flow-renderer";

export const nodesData = [
    {
        id: 'comunica',
        type: 'custom',
        data: {shape:"comunica" },
        position: { x: 80, y: 90 },
    },
    {
        // PARENTNODE
        id: 'solid',
        type:"custom",
        data: { title: 'Solid Pod', shape:"rectangle", strokeWidth: 2, stroke:"#8370fb", fill:"lightgray", width:300, height: 100 },
        position: { x: 0, y: 200 },
       // style: { backgroundColor: 'rgba(255, 0, 0, 0.2)', width: 300, height: 300 },
    },
    {
        id: 'RDF-1',
        data: { label: 'RDF' },
        type: "custom",
        position: { x: 25, y: 25 },
        parentNode: 'solid',
        extent: 'parent',
    },
    {
        id: 'RDF-2',
        data: { label: 'RDF' },
        type: "custom",
        position: { x: 80, y: 25 },
        parentNode: 'solid',
        extent: 'parent',
    },
    {
        id: 'RDF-3',
        data: { label: 'RDF' },
        type: "custom",
        position: { x: 145, y: 25 },
        parentNode: 'solid',
        extent: 'parent',
    },

    {
        id: 'RDF-4',
        data: { label: 'RDF' },
        type: "custom",
        position: { x: 230, y: 25 },
        parentNode: 'solid',
        extent: 'parent',
    },
    {
        id:"rmlio",
        type:"custom",
        data: {label: "rmlio"},
        position: {x: 80, y: 350}
    },
    {
        id:"flickr",
        type:"custom",
        data: {label: "flickr"},
        position: {x: 20, y: 450}
    },
    {
        id:"imgur",
        type:"custom",
        data: {label: "imgur"},
        position: {x: 80, y: 450}
    },
    {
        id:"google",
        type:"custom",
        data: {label: "google"},
        position: {x: 140, y: 450}
    }

];

export const edgesData = [
    { source: 'comunica', target: 'RDF-1', animated: true, sourceHandle: "bottom-source", targetHandle: "top-target", type: "straight", zIndex:1 },
    { source: 'comunica', target: 'RDF-2', animated:true, sourceHandle: "bottom-source", targetHandle: "top-target", type: "straight", zIndex:1 },
    { source: 'comunica', target: 'RDF-3', animated:true, sourceHandle: "bottom-source", targetHandle: "top-target", type: "straight", zIndex:1 },
    { source: 'comunica', target: 'RDF-4', animated:true, sourceHandle: "right-source", targetHandle: "top-target", type: "step", markerEnd: {type: "arrowclosed"}, zIndex:1 },

    { source: 'RDF-1', target: 'rmlio', animated: true, sourceHandle: "bottom-source", targetHandle: "top-target", type: "straight", zIndex:1 },
    { source: 'RDF-2', target: 'rmlio', animated:true, sourceHandle: "bottom-source", targetHandle: "top-target", type: "straight", zIndex:1 },
    { source: 'RDF-3', target: 'rmlio', animated:true, sourceHandle: "bottom-source", targetHandle: "top-target", type: "straight", zIndex:1 },

    { source: 'flickr', target: 'rmlio', animated: false, sourceHandle: "top-source", targetHandle: "bottom-target", type: "straight", style:{strokeDasharray: "5 3"} },
    { source: 'imgur', target: 'rmlio', animated:false, sourceHandle: "top-source", targetHandle: "bottom-target", type: "straight", style:{strokeDasharray: "5 3" }},
    { source: 'google', target: 'rmlio', animated:false, sourceHandle: "top-source", targetHandle: "bottom-target", type: "straight", style:{strokeDasharray: "5 3" }},


];