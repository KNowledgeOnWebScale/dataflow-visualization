import {useSearchParams} from "react-router-dom";
import ReactFlow, {addEdge, Controls, useEdgesState, useNodesState} from "react-flow-renderer";
import Node from "./components/node/Node";
import {useCallback, useEffect, useState} from "react";


const nodeTypes = {
    custom: Node
}


const Base = () => {

    const [searchParams] = useSearchParams();

    const [isError, setError] = useState(false);

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    console.log(searchParams.get("nodes"))


    useEffect(() => {
        let nodes2json;
        let edges2json;

        try {
            nodes2json = JSON.parse(searchParams.get("nodes"));
            edges2json = JSON.parse(searchParams.get("edges"));
        } catch (e) {
            console.warn(e);
            setError(true);
            return;
        }

        setNodes(nodes2json);
        setEdges(edges2json)


    }, [searchParams, setEdges, setNodes])


    return <>
        <div style={{
            height: window.innerHeight * 0.9,
            width: window.innerWidth * 0.9,
            margin: "auto",
        }}>
            {!isError && Array.isArray(nodes) && nodes.length > 0
                ? <ReactFlow
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
                    <Controls/>
                </ReactFlow>
                : <div style={{
                    width: "fit-content",
                    height: "fit-content",
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    margin: "auto",
                    textAlign: "center",
                    fontSize: "1.5em"
                }}>ERROR: Could not load diagram</div>
            }
        </div>

    </>
}

export default Base;
