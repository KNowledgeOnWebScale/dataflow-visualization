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
import Editor, {DiffEditor, useMonaco, loader} from "@monaco-editor/react";


// import CustomEdge from './CustomEdge';
import SvgNode from "./custom_node/SvgNode";

// import {globalDefaultsJSON, nodesJSON, edgesJSON} from "./data"
import {
    globalDefaultsJSON as globalDefaultsJSON1,
    nodesJSON as nodesJSON1,
    edgesJSON as edgesJSON1
} from "./data/exampleData1";
import {
    globalDefaultsJSON as globalDefaultsJSON2,
    nodesJSON as nodesJSON2,
    edgesJSON as edgesJSON2
} from "./data/exampleData2";
import {
    globalDefaultsJSON as globalDefaultsJSON3,
    nodesJSON as nodesJSON3,
    edgesJSON as edgesJSON3
} from "./data/exampleData3";
import {
    globalDefaultsJSON as globalDefaultsJSON4,
    nodesJSON as nodesJSON4,
    edgesJSON as edgesJSON4
} from "./data/exampleData4";
import {
    globalDefaultsJSON as globalDefaultsJSON5,
    nodesJSON as nodesJSON5,
    edgesJSON as edgesJSON5
} from "./data/exampleData5";
import {
    globalDefaultsJSON as globalDefaultsJSON6,
    nodesJSON as nodesJSON6,
    edgesJSON as edgesJSON6
} from "./data/exampleData6";

import {parseNodes, parseEdges, parseGlobalDefaults} from "./util";
import {Button} from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';

import YAML from "js-yaml";


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


    const [language, setLanguage] = useState("json");

    const [globalDefaults, setGlobalDefaults] = useState(JSON.stringify({}));
    const [nodesData, setNodesData] = useState(JSON.stringify([]));
    const [edgesData, setEdgesData] = useState(JSON.stringify([]));


    function json2yaml(jsonData) {
        let yamlValue;
        try {
            yamlValue = YAML.dump(JSON.parse(jsonData));
            return yamlValue;
        } catch (e) {
            return e;
        }
    }

    function yaml2json(yamlData) {

        let jsonValue;
        try {
            jsonValue = JSON.stringify(YAML.load(yamlData.toString()), null, "\t");
            return jsonValue;
        } catch (e) {
            return e;
        }
    }

    function changeLanguage(e) {

        let newLang = e;

        if (newLang === "yaml" && language === "json") {
            setGlobalDefaults(json2yaml(globalDefaults));
            setNodesData(json2yaml(nodesData));
            setEdgesData(json2yaml(edgesData));
            setLanguage(e);
        } else if (newLang === "json" && language === "yaml") {
            setGlobalDefaults(yaml2json(globalDefaults));
            setNodesData(yaml2json(nodesData));
            setEdgesData(yaml2json(edgesData));
            setLanguage(e);
        }

    }

    // Convert what's inside the editors to a graph
    function handleConvert(e) {
        e.preventDefault();

        let gd = globalDefaults;
        let nd = nodesData;
        let ed = edgesData;

        if (language === "yaml") {
            gd = yaml2json(globalDefaults);
            nd = yaml2json(nodesData);
            ed = yaml2json(edgesData);
        }

        let defaults = parseGlobalDefaults(JSON.parse(gd));
        let nodes = parseNodes(defaults, JSON.parse(nd));
        let edges = parseEdges(defaults, JSON.parse(ed), nodes);

        setNodes(nodes);
        setEdges(edges);

    }

    const examples = [
        [globalDefaultsJSON1, nodesJSON1, edgesJSON1], [globalDefaultsJSON2, nodesJSON2, edgesJSON2],
        [globalDefaultsJSON3, nodesJSON3, edgesJSON3], [globalDefaultsJSON4, nodesJSON4, edgesJSON4],
        [globalDefaultsJSON5, nodesJSON5, edgesJSON5], [globalDefaultsJSON6, nodesJSON6, edgesJSON6]
    ];

    function loadExample(e, number) {
        e.preventDefault();

        let example = examples[number - 1];

        let defaults = JSON.stringify(example[0], null, "\t");
        let nodes = JSON.stringify(example[1], null, "\t");
        let edges = JSON.stringify(example[2], null, "\t");

        if (language === "yaml") {
            defaults = json2yaml(defaults);
            nodes = json2yaml(nodes);
            edges = json2yaml(edges);
        }

        setGlobalDefaults(defaults);
        setNodesData(nodes);
        setEdgesData(edges);
    }

    return (
        <>
            <div className="d-flex">
                {
                    examples.map((_, i) => (
                            <Button className="primary" onClick={e => loadExample(e, i + 1)}>example {i+1}</Button>
                        )
                    )
                }
            </div>

            <Dropdown onSelect={changeLanguage}>
                <Dropdown.Toggle variant="warning" id="dropdown-basic">
                    Language: {language.toUpperCase()}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item eventKey="json" active>JSON</Dropdown.Item>
                    <Dropdown.Item eventKey="yaml">YAML</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <div className="edit-area">
                <div className="code-editor resizable" style={{height: "200px"}}>
                    <h5>Global defaults editor</h5>
                    <Editor
                        language={language}
                        value={globalDefaults}
                        onChange={content => setGlobalDefaults(content)}
                        theme="vs-dark"
                        style={{
                            width: "100%",
                            height: "100%",
                            minHeight: "250px",
                            margin: "auto"
                        }}
                    />
                </div>

                <div className="d-flex resizable code-editor"
                     style={{height: "350px"}}/*style={{width: "97%", margin: "auto"}}*/>

                    <div className="node-edge-editor">
                        <h5>Node editor</h5>
                        <Editor
                            language={language}
                            value={nodesData}
                            onChange={content => setNodesData(content)}
                            theme="vs-dark"
                            style={{
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
                            language={language}
                            value={edgesData}
                            onChange={content => setEdgesData(content)}
                            theme="vs-dark"
                            style={{
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
