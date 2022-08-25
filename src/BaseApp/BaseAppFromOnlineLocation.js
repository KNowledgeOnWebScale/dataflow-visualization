import {useSearchParams} from "react-router-dom";
import {useCallback, useEffect} from "react";
import {setFlowData} from "../lib/setFlowData";
import ReactFlow, {addEdge, Controls, MiniMap, useEdgesState, useNodesState} from "react-flow-renderer";
import Node from "../components/node/Node";


// http://localhost:3000/dataflow-visualization/#/online?location=https%3A%2F%2Fgist.githubusercontent.com%2FTiboStr%2F05db9a41779f71267a7315836d1e59ee%2Fraw%2F7aeb5a3f20de368ebd848728092f93844ca5e2e8%2Fflow-config.json

const nodeTypes = {
    custom: Node
}

const BaseAppFromOnlineLocation = () => {

    const [searchParams] = useSearchParams();

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);


    useEffect(() => {
        const location = searchParams.get("location");

        if (!location) return;

        fetch(location).then(res => res.json()).then(res => {
            //TODO: eerst nog checken of syntax wel goed is van de json!!!

            let gd = res["globalDefaults"];
            let nd = res["nodes"];
            let ed = res["edges"];

            setFlowData(gd, nd, ed, setNodes, setEdges);

        });

    }, [searchParams, setEdges, setNodes])


//TODO: zelfde als BaseAppFromUrl, dus werken met aparte component
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
                {/*!isError && Array.isArray(nodes) &&*/ nodes.length > 0
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
                        <MiniMap/>
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

export default BaseAppFromOnlineLocation;
