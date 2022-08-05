import ReactFlow, {Controls} from "react-flow-renderer";
import Node from "./node/Node";

const nodeTypes = {
    custom: Node
}

const ReactFlowComponent = ({nodes, edges, onNodesChange, onEdgesChange, onConnect}) => {

    return <>

        <div style={{height: window.innerHeight * 0.95,
                    border: "solid 1px black", width: "97%"
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
}

export default ReactFlowComponent;
