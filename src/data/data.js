import {MarkerType} from "react-flow-renderer";

// TODO I don't think this file is still being used
export const nodesData = [
    {
        id: 'edges-1',
        type: "custom",
        //type: 'input',
        data: { label: 'Input 1', shape: "cylinder" },
        position: { x: 250, y: 0 },
    },
    { id: 'edges-2', data: { label: 'Node 2' }, position: { x: 150, y: 100 }, style: {"backgroundColor": "red"}, width: 30, height: 30, color: "red", shape: "circle"/*, shape:{type:"image", source: "https://cdnuploads.aa.com.tr/uploads/Contents/2020/04/02/thumbs_b_c_85523f47f4fe985f91c1749dd22ad424.jpg?v=094735", scale: "None"}*/ },
    { id: 'edges-2a', data: { label: 'Node 2a' }, position: { x: 0, y: 180 } },
    { id: 'edges-3', data: { label: 'Node 3' }, position: { x: 250, y: 200 } },
    { id: 'edges-4', data: { label: 'Node 4' }, position: { x: 400, y: 300 } },
    { id: 'edges-3a', data: { label: 'Node 3a' }, position: { x: 150, y: 300 } },
    { id: 'edges-5', data: { label: 'Node 5' }, position: { x: 250, y: 400 } },
    {
        id: 'edges-6',
        type: 'output',
        data: { label: 'Output 6' },
        position: { x: 50, y: 550 },
    },
    {
        id: 'edges-7',
        type: 'output',
        data: { label: 'Output 7' },
        position: { x: 250, y: 550 },
    },
    {
        id: 'edges-8',
        type: 'custom',
        data: { label: '', shape: "comunica" },
        position: { x: 525, y: 600 },

    },
    {
        id: 'edges-9',
        type: 'custom',
        data: { label: '', shape: "rmlio" },
        position: { x: 560, y: 600 },

    },
];


export const edgesData = [
    {
        id: 'edges-e1-2',
        source: 'edges-1',
        target: 'edges-2',
        label: 'bezier edge (default)',
        className: 'normal-edge',
        markerStart: {
            type: MarkerType.ArrowClosed,
            color: "blue",
            orient: "auto-start-reverse"
            // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/orient
        },
        markerEnd: {
            type: MarkerType.ArrowClosed,
            color: "green",
        },
        style: {strokeWidth: 10}
    },
    {
        id: 'edges-e2-2a',
        source: 'edges-2',
        target: 'edges-2a',
        type: 'smoothstep',
        label: 'smoothstep edge',
       // markerEnd: {
        //    type: MarkerType.ArrowClosed,
        //},
        //markerStart: {
         //   type: MarkerType.ArrowClosed,
         //   color: "green"
       // }
    },
    {
        id: 'edges-e2-3',
        source: 'edges-2',
        target: 'edges-3',
        type: 'step',
        label: 'step edge',
    },
    {
        id: 'edges-e3-4',
        source: 'edges-3',
        target: 'edges-4',
        type: 'straight',
        label: 'straight edge',
    },
    {
        id: 'edges-e3-3a',
        source: 'edges-3',
        target: 'edges-3a',
        type: 'straight',
        label: 'label only edge',
        style: { stroke: 'none' },
    },
    {
        id: 'edges-e3-5',
        source: 'edges-4',
        target: 'edges-5',
        animated: true,
        label: 'animated styled edge',
        style: { stroke: 'red', strokeWidth: 30 },
    },
    {
        id: 'edges-e5-6',
        source: 'edges-5',
        target: 'edges-6',
        label: 'styled label',
        labelStyle: { fill: 'red', fontWeight: 700 },
       // markerEnd: {
        //    type: MarkerType.Arrow,
        //},
    },
    {
        id: 'edges-e5-7',
        source: 'edges-5',
        target: 'edges-7',
        label: 'label with styled bg',
        labelBgPadding: [8, 4],
        labelBgBorderRadius: 4,
        labelBgStyle: { fill: '#FFCC00', color: '#fff', fillOpacity: 0.7},
        style: { stroke: "red", strokeWidth: 10 },
        markerEnd: {
            type: MarkerType.ArrowClosed,
            color: "red"
        },
    },
    {
        id: 'edges-e5-8',
        source: 'edges-5',
        target: 'edges-8',

        label: "customm",
        //type: 'custom',
        data: { text: 'custom edge' },

        markerEnd: {
            type: MarkerType.ArrowClosed,
        },
    },
];
