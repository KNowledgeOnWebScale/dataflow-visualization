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

        <div className="disable-scroll" id={"flow-diagram"} style={{
            height: window.innerHeight * 0.85,
            border: "solid 1px black", width: "98%"
        }}>
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


                style={{
                    height: "100%",
                    width: "100%",
                    overflow: "scroll",
                    //overflow: "auto",
                    //overscrollBehavior: "none"
                }}

                /*paneMoveable={false}
                panOnScroll={true}

                onlyRenderVisibleElements={false}
                zoomOnDoubleClick={false}
                zoomOnScroll={false}
                preventScrolling={false}
                zoomOnPinch={false}*/

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
