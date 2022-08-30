import ReactFlow, {Controls, MiniMap} from "react-flow-renderer";
import Node from "./node/Node";

const nodeTypes = {
    custom: Node
}

const ReactFlowComponent = ({
                                nodes,
                                edges,
                                onNodesChange,
                                onEdgesChange,
                                onConnect,
                                snapToGrid,
                                showControls = true
                            }) => {

    return <>

        <div style={{
            height: window.innerHeight * 0.85,
            border: "solid 1px black", width: "98%"
        }}

            /*style={{
            width: window.innerWidth * 0.48,
            height: window.innerHeight * 0.96,
            border: "solid 1px black",
            margin: "10px auto 10px auto",
            display: "inline-block"
        }}*/>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                snapToGrid={snapToGrid}
                // edgeTypes={edgeTypes}
                nodeTypes={nodeTypes}
                fitView
                attributionPosition="top-right"
            >
                {showControls &&
                    <>
                        <Controls/>
                        <MiniMap/>
                    </>
                }
            </ReactFlow>
        </div>

    </>
}

export default ReactFlowComponent;
