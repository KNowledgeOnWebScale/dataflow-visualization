import ReactFlow, {Controls, MiniMap} from "react-flow-renderer";
import Node from "../components/node/Node";

const nodeTypes = {
    custom: Node
}


const BaseAppUrlFLowComponent = ({isError, nodes, edges, onNodesChange, onEdgesChange, onConnect}) => {

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

export default BaseAppUrlFLowComponent;
