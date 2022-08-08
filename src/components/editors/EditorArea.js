import {Button} from "react-bootstrap";
import dagre from "dagre";
import {useState} from "react";

import {GRAPH, parseEdges, parseGlobalDefaults, parseNodes} from "../../lib/configParsing";
import {getLayoutedElementsDagre} from "../../lib/nodeAutoPositioning";
import {edgeSchema, globalDefaultSchema, nodeSchema, validateJSON} from "../../lib/schemaValidation";
import CodeEditor from "./CodeEditor";
import ErrorModal from "../ErrorModal";
import LanguageSwitcher from "../LanguageSwitcher";
import {yaml2json} from "../../lib/jsonYamlConversionUtil";


const EditorArea = ({
                        setNodes,
                        setEdges,
                        language,
                        setLanguage,
                        setData,
                        globalDefaults,
                        setGlobalDefaults,
                        nodesData,
                        setNodesData,
                        edgesData,
                        setEdgesData
                    }) => {


    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessageTitle, setErrorMessageTitle] = useState("");
    const [errorMessages, setErrorMessages] = useState([]);

//TODO: before parsing, check if all necessary keys are present, if not, do user friendly error handling

// Convert what's inside the editors to a graph
    function handleConvert(e) {
        e.preventDefault();

        let gd = globalDefaults;
        let nd = nodesData;
        let ed = edgesData

        if (language === "yaml") {
            gd = yaml2json(gd);
            nd = yaml2json(nd);
            ed = yaml2json(ed);
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

        //TODO met keys uit hashmap werken
        if (defaults[GRAPH]["autoLayout"]) {
            const dagreGraph = new dagre.graphlib.Graph();
            dagreGraph.setDefaultEdgeLabel(() => ({}));
            [nodes, edges] = getLayoutedElementsDagre(dagreGraph, nodes, edges, defaults);
        }

        setNodes(nodes);
        setEdges(edges);
    }


    function handleErrorPopUpClose() {
        setErrorMessageTitle("")
        setErrorMessages([])
        setErrorModalVisible(false)
    }

    return <>
        <ErrorModal errorModalVisible={errorModalVisible}
                    errorMessageTitle={errorMessageTitle}
                    errorMessages={errorMessages}
                    handleErrorPopUpClose={handleErrorPopUpClose}
        />

        <LanguageSwitcher language={language} setLanguage={setLanguage} setData={setData}
                          globalDefaults={globalDefaults} nodesData={nodesData} edgesData={edgesData}/>

        <div className="edit-area" /*style={{width: "49%", display: "inline-block"}}*/>

            <div className="small-editor-div"/*className="node-edge-editor"*/>
                <h5>Global defaults editor</h5>
                <CodeEditor language={language} data={globalDefaults} setData={setGlobalDefaults}
                            modelName={"global-defaults-model"}
                            schema={globalDefaultSchema}/>
            </div>

            <div className="editor-div"/*className="node-edge-editor"*/>
                <h5>Node editor</h5>
                <CodeEditor language={language} data={nodesData} setData={setNodesData} modelName={"nodes-model"}
                            schema={nodeSchema}/>
            </div>
            <div className="editor-div" /*className="node-edge-editor"*/>
                <h5>Edge editor</h5>
                <CodeEditor language={language} data={edgesData} setData={setEdgesData} modelName={"edges-model"}
                            schema={edgeSchema}/>
            </div>

            <Button variant="primary" onClick={e => handleConvert(e)}>Convert</Button>

        </div>
    </>

}

export default EditorArea;
