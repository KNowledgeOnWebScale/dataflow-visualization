import {addEdge, useEdgesState, useNodesState} from "react-flow-renderer";
import EditorArea from "./editors/EditorArea";
import {useCallback, useState} from "react";
import ExampleComponent from "./ExampleComponent";
import ControlsComponent from "./ControlsComponent";
import ReactFlowComponent from "./ReactFlowComponent";

const Visualizer = () => {

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    const [language, setLanguage] = useState("json");

    const [globalDefaults, setGlobalDefaults] = useState(JSON.stringify({"graph": {}, "node": {}, "edge": {}}));
    const [nodesData, setNodesData] = useState(JSON.stringify([]));
    const [edgesData, setEdgesData] = useState(JSON.stringify([]));


    function setData(newGlobalDefaults, newNodes, newEdges) {
        setGlobalDefaults(newGlobalDefaults);
        setNodesData(newNodes);
        setEdgesData(newEdges);
    }


    //TODO die 100000 argumenten meegeven is niet echt scalable
    return <>

        <ExampleComponent language={language} setData={setData}/>
        <ControlsComponent/> {/* TODO: bv exporting enz*/}

        <table style={{width: "100%", marginLeft: "5px", marginRight: "5px"}}>
            <tr>
                <td style={{width: "30%"/*border: "5px solid green"*/}}>
                    <EditorArea setNodes={setNodes} setEdges={setEdges} language={language} setLanguage={setLanguage}
                                setData={setData} globalDefaults={globalDefaults} setGlobalDefaults={setGlobalDefaults}
                                edgesData={edgesData} setEdgesData={setEdgesData} nodesData={nodesData} setNodesData={setNodesData}/>
                </td>
                <td style={{width: "3%"}}></td>
                <td>
                    <ReactFlowComponent nodes={nodes} edges={edges} onNodesChange={onNodesChange}
                                        onEdgesChange={onEdgesChange}
                                        onConnect={onConnect}/>
                </td>
            </tr>
        </table>

    </>

}

export default Visualizer;
