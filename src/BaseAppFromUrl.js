import {useSearchParams} from "react-router-dom";
import ReactFlow, {addEdge, Controls, useEdgesState, useNodesState} from "react-flow-renderer";
import Node from "./components/node/Node";
import {useCallback} from "react";


const nodeTypes = {
    custom: Node
}


const Base = () => {
    // use search params
    // https://github.ugent.be/tistroo/webdev-project2-react/blob/main/project-react/src/components/genre/GenreDetail.js

    const [searchParams] = useSearchParams();

    const [nodes, setNodes, onNodesChange] = useNodesState(JSON.parse(searchParams.get("nodes")));
    const [edges, setEdges, onEdgesChange] = useEdgesState(JSON.parse(searchParams.get("edges")));

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    console.log(JSON.parse(searchParams.get("nodes")))


    return <>
        <div style={{
            height: window.innerHeight*0.9,
            width: window.innerWidth*0.9,
            margin: "auto",
        }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                snapToGrid={true}
                nodeTypes={nodeTypes}
                fitView
                attributionPosition="top-right"
            >
                <Controls/></ReactFlow>
        </div>
    </>
}

export default Base;
