import React, {useCallback, useState} from 'react';

import ReactFlow, {
    useNodesState,
    useEdgesState,
    addEdge,
    //MiniMap,
    Controls,
    //Background,
    // MarkerType,
} from 'react-flow-renderer';

import CodeEditor from '@uiw/react-textarea-code-editor';


// import CustomEdge from './CustomEdge';
import SvgNode from "./SvgNode";

// import {globalDefaults, nodesData, edgesData} from "./data"
// import {globalDefaults, nodesData, edgesData} from "./data/exampleData1";
// import {globalDefaults, nodesData, edgesData} from "./data/exampleData2";
// import {globalDefaults, nodesData, edgesData} from "./data/exampleData3";
// import {globalDefaults, nodesData, edgesData} from "./data/exampleData4";
import {globalDefaults, nodesData, edgesData} from "./data/exampleData5";

import {parseNodes, parseEdges, parseGlobalDefaults} from "./util";
import {Button, FloatingLabel, Form} from "react-bootstrap";

//const edgeTypes = {
//  custom: CustomEdge,
//};

const nodeTypes = {
    custom: SvgNode
}


//TODO: before parsing, check if all necessary keys are present, if not, do user friendly error handling
// TODO:  mss ook een regex test doen op de values (bv height moet een nummer zijn [0-9]+, orientation is "vertical|horizontal" ...

let defaults = parseGlobalDefaults(globalDefaults);
let parsedNodes = parseNodes(defaults, nodesData);
let parsedEdges = parseEdges(defaults, edgesData, nodesData);

const EdgesFlow = () => {

    const [nodes, setNodes , onNodesChange] = useNodesState(parsedNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(parsedEdges);

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);


    const [globalDefaults, setGlobalDefaults] = useState(JSON.stringify(defaults));
    const [nodesData, setNodesData] = useState(JSON.stringify(parsedNodes));
    const [edgesData, setEdgesData] = useState(JSON.stringify(parsedEdges));

    function handleConvert(e) {
        e.preventDefault();

        let de = parseGlobalDefaults(JSON.parse(globalDefaults));
        let no = parseNodes(de, JSON.parse(nodesData));
        let ed = parseEdges(de,JSON.parse(edgesData), no);

        setNodes(no);
        setEdges(ed);

    }

    return (
        <>
            <p>flow</p>


            <div className="edit-area">
                <div className="code-editor resizable">
                    <h5>Global defaults editor</h5>
                    <CodeEditor
                        value={globalDefaults}
                        language="json"
                        placeholder="Please enter global defaults in JSON."
                        onChange={(evn) => setGlobalDefaults(evn.target.value)}
                        padding={15}
                        style={{
                            fontSize: 15,
                            backgroundColor: "#f5f5f5",
                            width: "100%",
                            minHeight: "200px",
                            height: "100%",
                            margin: "auto",
                            color: "black",
                        }}
                    />
                </div>

                <div className="d-flex resizable code-editor" /*style={{width: "97%", margin: "auto"}}*/>

                    <div className="node-edge-editor">
                        <h5>Node editor</h5>
                        <CodeEditor
                            value={nodesData}
                            language="json"
                            placeholder="Please enter nodes in JSON."
                            onChange={(evn) => setNodesData(evn.target.value)}
                            padding={15}
                            style={{
                                fontSize: 15,
                                backgroundColor: "#f5f5f5",
                                width: "100%",
                                minHeight: "250px",
                                height: "100%",
                                margin: "auto",
                                color: "black"
                            }}
                        />
                    </div>

                    <div className="node-edge-editor">
                        <h5>Edge editor</h5>
                        <CodeEditor
                            value={edgesData}
                            language="json"
                            placeholder="Please enter edges in JSON."
                            onChange={(evn) => setEdgesData(evn.target.value)}
                            padding={15}
                            style={{
                                fontSize: 15,
                                backgroundColor: "#f5f5f5",
                                width: "100%",
                                height: "100%",
                                minHeight: "250px",
                                margin: "auto",
                                color: "black"
                            }}
                        />
                    </div>
                </div>

                <Button variant="primary" onClick={e => handleConvert(e)}>Convert</Button>

            </div>


            <div style={{width: window.innerWidth*0.95, height: window.innerHeight*0.95, border: "solid 1px black", margin: "10px auto 10px auto"}}>
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
    );
};

export default EdgesFlow;
