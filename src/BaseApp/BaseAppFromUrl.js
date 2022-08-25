import {useSearchParams} from "react-router-dom";
import ReactFlow, {addEdge, useEdgesState, useNodesState, Controls, MiniMap} from "react-flow-renderer";
import Node from "../components/node/Node";
import {useCallback, useEffect, useState} from "react";
import {setFlowData} from "../lib/setFlowData";


const nodeTypes = {
    custom: Node
}


const Base = ({raw}) => {

    const [searchParams] = useSearchParams();

    const [isError, setError] = useState(false);

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    //console.log(searchParams.get("nodes"))


    useEffect(() => {
        let globalDefaults2json;
        let nodes2json;
        let edges2json;

        // Why raw or custom data? -> return the shortest link, because links can get very long
        if (raw) {
            try {
                nodes2json = JSON.parse(searchParams.get("nodes"));
                edges2json = JSON.parse(searchParams.get("edges"));
            } catch (e) {
                console.warn(e);
                setError(true);
                return;
            }

            setNodes(nodes2json);
            setEdges(edges2json);
        } else {
            globalDefaults2json = JSON.parse(searchParams.get("globaldefaults"));
            nodes2json = JSON.parse(searchParams.get("nodes"));
            edges2json = JSON.parse(searchParams.get("edges"));

            setFlowData(globalDefaults2json, nodes2json, edges2json, setNodes, setEdges);
        }


    }, [raw, searchParams, setEdges, setNodes])


    return <>
        <div style={{
            width: window.innerWidth,
            height: window.innerHeight,
            display: "flex"
        }}>
            <div style={{
                height: window.innerHeight * 0.95,
                width: window.innerWidth * 0.95,
                justifyContent: "center",
                alignContent: "center",
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
                        <Controls />
                        <MiniMap />
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
        </div>
    </>
}

export default Base;
