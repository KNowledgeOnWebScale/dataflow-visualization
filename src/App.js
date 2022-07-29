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

//import CodeEditor from '@uiw/react-textarea-code-editor';
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";


// import CustomEdge from './CustomEdge';
import SvgNode from "./SvgNode";

// import {globalDefaultsJSON, nodesJSON, edgesJSON} from "./data"
import {globalDefaultsJSON as globalDefaultsJSON1, nodesJSON as nodesJSON1 , edgesJSON as edgesJSON1} from "./data/exampleData1";
import {globalDefaultsJSON as globalDefaultsJSON2, nodesJSON as nodesJSON2, edgesJSON as edgesJSON2} from "./data/exampleData2";
import {globalDefaultsJSON as globalDefaultsJSON3, nodesJSON as nodesJSON3, edgesJSON as edgesJSON3} from "./data/exampleData3";
import {globalDefaultsJSON as globalDefaultsJSON4, nodesJSON as nodesJSON4, edgesJSON as edgesJSON4} from "./data/exampleData4";
import {globalDefaultsJSON as globalDefaultsJSON5, nodesJSON as nodesJSON5, edgesJSON as edgesJSON5} from "./data/exampleData5";

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

//let defaults = parseGlobalDefaults(globalDefaults);
//let parsedNodes = parseNodes(defaults, nodesData);
//let parsedEdges = parseEdges(defaults, edgesData, nodesData);

const EdgesFlow = () => {

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);


    const [globalDefaults, setGlobalDefaults] = useState(JSON.stringify({}));
    const [nodesData, setNodesData] = useState(JSON.stringify([]));
    const [edgesData, setEdgesData] = useState(JSON.stringify([]));

    function handleConvert(e) {
        e.preventDefault();

        let de = parseGlobalDefaults(JSON.parse(globalDefaults));
        let no = parseNodes(de, JSON.parse(nodesData));
        let ed = parseEdges(de, JSON.parse(edgesData), no);

        setNodes(no);
        setEdges(ed);

    }

    const examples = [
        [globalDefaultsJSON1, nodesJSON1, edgesJSON1], [globalDefaultsJSON2, nodesJSON2, edgesJSON2],
        [globalDefaultsJSON3, nodesJSON3, edgesJSON3], [globalDefaultsJSON4, nodesJSON4, edgesJSON4],
        [globalDefaultsJSON5, nodesJSON5, edgesJSON5]
    ];

    function loadExample(e, number) {
        e.preventDefault();

        let example = examples[number-1];

        setGlobalDefaults(JSON.stringify(example[0]));
        setNodesData(JSON.stringify(example[1]));
        setEdgesData(JSON.stringify(example[2]));
    }

    return (
        <>

            <div className="d-flex">
                <Button className="primary" onClick={e => loadExample(e, 1)}>example 1</Button>
                <Button className="primary" onClick={e => loadExample(e, 2)}>example 2</Button>
                <Button className="primary" onClick={e => loadExample(e, 3)}>example 3</Button>
                <Button className="primary" onClick={e => loadExample(e, 4)}>example 4</Button>
                <Button className="primary" onClick={e => loadExample(e, 5)}>example 5</Button>
            </div>

            <div className="edit-area">
                <div className="code-editor resizable" style={{height: "200px"}}>
                    <h5>Global defaults editor</h5>
                    <Editor
                        defaultLanguage="json"
                        value={globalDefaults}
                        onChange={content => setGlobalDefaults(content)}
                        theme="vs-dark"
                        style = {{
                            width: "100%",
                            height: "100%",
                            minHeight: "250px",
                            margin: "auto"
                        }}
                    />
                </div>

                <div className="d-flex resizable code-editor" style={{height: "260px"}}/*style={{width: "97%", margin: "auto"}}*/>

                    <div className="node-edge-editor" >
                        <h5>Node editor</h5>
                        <Editor
                            defaultLanguage="json"
                            value={nodesData}
                            onChange={content=>setNodesData(content)}
                            theme="vs-dark"
                            style = {{
                                width: "100%",
                                height: "100%",
                                minHeight: "250px",
                                margin: "auto"
                            }}
                        />
                    </div>

                    <div className="node-edge-editor">
                        <h5>Edge editor</h5>
                        <Editor
                            defaultLanguage="json"
                            value={edgesData}
                            onChange={content => setEdgesData(content)}
                            theme="vs-dark"
                            style = {{
                                width: "100%",
                                height: "100%",
                                minHeight: "250px",
                                margin: "auto"
                            }}
                        />


                    </div>
                </div>

                <Button variant="primary" onClick={e => handleConvert(e)}>Convert</Button>

            </div>


            <div style={{
                width: window.innerWidth * 0.96,
                height: window.innerHeight * 0.96,
                border: "solid 1px black",
                margin: "10px auto 10px auto"
            }}>
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
