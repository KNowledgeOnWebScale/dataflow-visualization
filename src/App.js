import React, {useCallback} from 'react';

import ReactFlow, {addEdge, Controls, useEdgesState, useNodesState,} from 'react-flow-renderer';

import SvgNode from "./custom/node/SvgNode";

import EditorArea from "./custom/editors/EditorArea";


//const edgeTypes = {
//  custom: CustomEdge,
//};


const nodeTypes = {
    custom: SvgNode
}


//TODO: before parsing, check if all necessary keys are present, if not, do user friendly error handling
// TODO:  mss ook een regex test doen op de values (bv height moet een nummer zijn [0-9]+, orientation is "vertical|horizontal" ...

//let defaults = parseGlobalDefaults(globalDefaults);
//let parsedNodes = parseNodes(defaults, nodesData);
//let parsedEdges = parseEdges(defaults, edgesData, nodesData);

const EdgesFlow = () => {

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

    return (
        <>

            <EditorArea setNodes={setNodes} setEdges={setEdges}/>


            <div style={{
                width: window.innerWidth * 0.96,
                height: window.innerHeight * 0.96,
                border: "solid 1px black",
                margin: "10px auto 10px auto"
            }}>
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
                    <Controls/>
                    {/*<Background/>*/}
                </ReactFlow>
            </div>
        </>
    );
};

export default EdgesFlow;
