import Editor from "@monaco-editor/react";
import {Button} from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import dagre from "dagre";
import YAML from "js-yaml";
import {useState} from "react";

import {
    edgesJSON as edgesJSON1,
    globalDefaultsJSON as globalDefaultsJSON1,
    nodesJSON as nodesJSON1
} from "../../data/exampleData1";
import {
    edgesJSON as edgesJSON2,
    globalDefaultsJSON as globalDefaultsJSON2,
    nodesJSON as nodesJSON2
} from "../../data/exampleData2";
import {
    edgesJSON as edgesJSON3,
    globalDefaultsJSON as globalDefaultsJSON3,
    nodesJSON as nodesJSON3
} from "../../data/exampleData3";
import {
    edgesJSON as edgesJSON4,
    globalDefaultsJSON as globalDefaultsJSON4,
    nodesJSON as nodesJSON4
} from "../../data/exampleData4";
import {
    edgesJSON as edgesJSON5,
    globalDefaultsJSON as globalDefaultsJSON5,
    nodesJSON as nodesJSON5
} from "../../data/exampleData5";
import {
    edgesJSON as edgesJSON6,
    globalDefaultsJSON as globalDefaultsJSON6,
    nodesJSON as nodesJSON6
} from "../../data/exampleData6";


import {parseEdges, parseGlobalDefaults, parseNodes} from "./editorUtil";
import {getLayoutedElementsDagre} from "./editorUtilPositioning";


const EditorArea = ({setNodes, setEdges}) => {

    const [globalDefaults, setGlobalDefaults] = useState(JSON.stringify({}));
    const [nodesData, setNodesData] = useState(JSON.stringify([]));
    const [edgesData, setEdgesData] = useState(JSON.stringify([]));

    const [language, setLanguage] = useState("json");


    const examples = [
        [globalDefaultsJSON1, nodesJSON1, edgesJSON1], [globalDefaultsJSON2, nodesJSON2, edgesJSON2],
        [globalDefaultsJSON3, nodesJSON3, edgesJSON3], [globalDefaultsJSON4, nodesJSON4, edgesJSON4],
        [globalDefaultsJSON5, nodesJSON5, edgesJSON5], [globalDefaultsJSON6, nodesJSON6, edgesJSON6],
    ];


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


        const dagreGraph = new dagre.graphlib.Graph();
        dagreGraph.setDefaultEdgeLabel(() => ({}));

        if (defaults["autoLayout"]) {
            [nodes, edges] = getLayoutedElementsDagre(dagreGraph, nodes, edges, defaults);
        }

        setNodes(nodes);
        setEdges(edges);

    }


    return (
        <>

            <div className="d-flex">
                {
                    examples.map((_, i) => (
                            <Button className="primary" onClick={e => loadExample(e, i + 1)} key={i}>example {i + 1}</Button>
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
                            //height: "100%",
                            // minHeight: "250px",
                            //margin: "auto"
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
                                // height: "100%",
                                //minHeight: "250px",
                                //margin: "auto"
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
                                //height: "100%",
                                //minHeight: "250px",
                                //margin: "auto"
                            }}
                        />


                    </div>
                </div>

                <Button variant="primary" onClick={e => handleConvert(e)}>Convert</Button>

            </div>
        </>
    )

}

export default EditorArea;
