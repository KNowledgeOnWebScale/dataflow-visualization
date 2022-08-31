import ReactFlow, {Controls, MiniMap, ReactFlowProvider, useReactFlow, useStoreApi,} from "react-flow-renderer";
import Node from "./node/Node";
import {useEffect, useMemo} from "react";

// These resources helped me a lot:

// https://jsfiddle.net/u3xbhps6/https://jsfiddle.net/u3xbhps6/
// https://reactflow.dev/docs/guides/troubleshooting/#warning-seems-like-you-have-not-used-zustand-provider-as-an-ancestor
// https://medium.com/@christian_maehler/implementing-a-scrollbar-for-react-flow-29653c2562fd
//     --> Note when reading: the example uses an older version of ReactFlow (e.g. useZoomPanHelper does not exist anymore: https://reactflow.dev/docs/guides/migrate-to-v10/#6-usezoompanhelper-transform---unified-in-usereactflow)


const ReactFlowComponent = ({
                                nodes,
                                edges,
                                onNodesChange,
                                onEdgesChange,
                                onConnect,
                                snapToGrid,
                                showControls = true
                            }) => {

    const nodeTypes = useMemo(
        () => ({
            custom: Node
        }), []
    );

    const store = useStoreApi();

    const {setCenter} = useReactFlow();
    const {zoomTo} = useReactFlow();
    const [tx, , ts] = store.getState().transform;


    useEffect(() => {

        function printposition(e) {
            const rect = e.target.getBoundingClientRect();
            //  const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;


            if (nodes.length > 0) {

                // First sort on y, then on x
                const sortedNodes = nodes.sort((a, b) => {
                    if (a.position.y === b.position.y) return a.position.x - b.position.x;
                    return a.position.y - b.position.y;
                })

                const nodeIndex = Math.round(y / (rect.bottom - rect.top) * nodes.length);
                setCenter(tx/*sortedNodes[nodeIndex].position.x*/, sortedNodes[nodeIndex].position.y, ts);
                zoomTo(ts);
            }
        }

        document.getElementById("navigation-bar").addEventListener("click", printposition);
    })

    return <>

        <div style={{height: window.innerHeight * 0.85, display: "flex"}}>

            <div id={"navigation-bar"} style={{width: "10px", height: "100%", backgroundColor: "gray"}}></div>


            <div id={"flow-diagram"} style={{
                height: "100%",
                border: "solid 1px black", width: "98%"
            }}>

                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    snapToGrid={snapToGrid}
                    nodeTypes={nodeTypes}
                    fitView
                    attributionPosition="top-right"

                    // Uncomment this and you'll have scrollbars in the window of the flow. But sadly, it does not work very well.
                    // Maybe it will work better in a future release of ReactFlow, who knows.

                    //style={{
                    //    height: "100%",
                    //    width: "100%",
                    //    overflow: "scroll",
                    //}}

                >
                    {showControls &&
                        <>
                            <Controls/>
                            <MiniMap/>
                        </>
                    }
                </ReactFlow>
            </div>
        </div>

    </>
}

function ReactFlowComponentWithProvider(props) {
    return (
        <ReactFlowProvider>
            <ReactFlowComponent {...props} />
        </ReactFlowProvider>
    )
}

export default ReactFlowComponentWithProvider;
