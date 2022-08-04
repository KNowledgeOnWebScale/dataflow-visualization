import {Button, Modal} from "react-bootstrap";
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
import {edgeSchema, globalDefaultSchema, nodeSchema, validateJSON} from "./schemaValidation";
import MyEditor from "./MyEditor";


const EditorArea = ({setNodes, setEdges}) => {

    const [globalDefaults, setGlobalDefaults] = useState(JSON.stringify({}));
    const [nodesData, setNodesData] = useState(JSON.stringify([]));
    const [edgesData, setEdgesData] = useState(JSON.stringify([]));

    const [language, setLanguage] = useState("json");

    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessageTitle, setErrorMessageTitle] = useState("");
    const [errorMessages, setErrorMessages] = useState([]);


    const examples = [
        [globalDefaultsJSON1, nodesJSON1, edgesJSON1], [globalDefaultsJSON2, nodesJSON2, edgesJSON2],
        [globalDefaultsJSON3, nodesJSON3, edgesJSON3], [globalDefaultsJSON4, nodesJSON4, edgesJSON4],
        [globalDefaultsJSON5, nodesJSON5, edgesJSON5], [globalDefaultsJSON6, nodesJSON6, edgesJSON6],
    ];

    function handleErrorPopUpClose() {
        setErrorMessageTitle("")
        setErrorMessages([])
        setErrorModalVisible(false)
    }

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


        const parsedGd = JSON.parse(gd);
        const parsedNd = JSON.parse(nd);
        const parsedEd = JSON.parse(ed);

        let error = false;

        function setError(e) {
            setErrorMessages(e);
            error = true;
            setErrorModalVisible(true);
        }


        setErrorMessageTitle("Error while validating global defaults");
        validateJSON(parsedGd, globalDefaultSchema, setError /*setError*/);
        if (error) {
            return;
        }

        setErrorMessageTitle("Error while validating nodes");
        validateJSON(parsedNd, nodeSchema, setError)
        if (error) {
            setErrorModalVisible(true);
            return;
        }

        setErrorMessageTitle("Error while validating edges");
        validateJSON(parsedEd, edgeSchema, setError);
        if (error) {
            setErrorModalVisible(true);
            return;
        }

        // TODO: ookal is syntaxis alles juist, ook nog eens checken op de semantische correctheid
        //  bv als naar een id verwezen wordt, bestaat die ID wel


        let defaults = parseGlobalDefaults(parsedGd);
        let nodes = parseNodes(defaults, parsedNd);
        let edges = parseEdges(defaults, parsedEd, nodes);


        if (defaults["autoLayout"]) {
            const dagreGraph = new dagre.graphlib.Graph();
            dagreGraph.setDefaultEdgeLabel(() => ({}));
            [nodes, edges] = getLayoutedElementsDagre(dagreGraph, nodes, edges, defaults);
        }

        setNodes(nodes);
        setEdges(edges);

    }


    return <>

        <Modal show={errorModalVisible} onHide={handleErrorPopUpClose}
               scrollable={true}>
            <Modal.Header closeButton>
                <Modal.Title>{errorMessageTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errorMessages.map(e => <p>{e}</p>)}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => handleErrorPopUpClose()}>
                    OK
                </Button>
            </Modal.Footer>
        </Modal>

        <div className="d-flex">
            {
                examples.map((_, i) => <Button className="primary" onClick={e => loadExample(e, i + 1)}
                                               key={i}>example {i + 1}</Button>
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


        <div className="edit-area" id="global-default-editor">
            <div className="code-editor resizable" style={{height: "200px"}}>
                <h5>Global defaults editor</h5>

                <MyEditor language={language} data={globalDefaults} setData={setGlobalDefaults}
                          modelName={"global-defaults-model"} schema={globalDefaultSchema}/>

            </div>

            <div className="d-flex resizable code-editor"
                 style={{height: "350px"}}>

                <div className="node-edge-editor">
                    <h5>Node editor</h5>
                    <MyEditor language={language} data={nodesData} setData={setNodesData} modelName={"nodes-model"}
                              schema={nodeSchema}/>
                </div>

                <div className="node-edge-editor">
                    <h5>Edge editor</h5>
                    <MyEditor language={language} data={edgesData} setData={setEdgesData} modelName={"edges-model"}
                              schema={edgeSchema}/>
                </div>
            </div>

            <Button variant="primary" onClick={e => handleConvert(e)}>Convert</Button>

        </div>
    </>

}

export default EditorArea;
