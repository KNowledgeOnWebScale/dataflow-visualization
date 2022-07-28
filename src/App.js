import React, {useCallback} from 'react';

import ReactFlow, {
    useNodesState,
    useEdgesState,
    addEdge,
    MiniMap,
    Controls,
    Background,
    // MarkerType,
} from 'react-flow-renderer';

// import CustomEdge from './CustomEdge';
import SvgNode from "./SvgNode";

// import {globalDefaults, nodesData, edgesData} from "./data"
// import {globalDefaults, nodesData, edgesData} from "./data/exampleData1";
// import {globalDefaults, nodesData, edgesData} from "./data/exampleData2";
// import {globalDefaults, nodesData, edgesData} from "./data/exampleData3";
// import {globalDefaults, nodesData, edgesData} from "./data/exampleData4";
 import {globalDefaults, nodesData, edgesData} from "./data/exampleData5";

import {parseNodes, parseEdges, parseGlobalDefaults} from "./util";

//const edgeTypes = {
//  custom: CustomEdge,
//};

const nodeTypes = {
    custom: SvgNode
}


//TODO: before parsing, check if all necessary keys are present, if not, do user friendly error handling
// TODO:  mss ook een regex test doen op de values (bv height moet een nummer zijn [0-9]+, orientation is "vertical|horizontal" ...

let defaults = parseGlobalDefaults(globalDefaults);
let parsedNodes = parseNodes(defaults, nodesData);
let parsedEdges = parseEdges(defaults, edgesData, nodesData);

const EdgesFlow = () => {

    const [nodes, , onNodesChange] = useNodesState(parsedNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(parsedEdges);

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

    return (
        <>
            <p>flow</p>
            <div style={{height: window.innerHeight}}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    snapToGrid={true}
                    // edgeTypes={edgeTypes}
                    nodeTypes={nodeTypes}
                    fitView
                    attributionPosition="top-right"
                >
                    {/*<MiniMap/>*/}
                    <Controls/>
                    {/*<Background/>*/}
                </ReactFlow>
            </div>
        </>
    );
};

export default EdgesFlow;
