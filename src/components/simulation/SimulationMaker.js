import {Button, OverlayTrigger, Tooltip} from "react-bootstrap";
import {BsPlusLg} from "react-icons/bs";
import {useState} from "react";
import CodeEditor from "../editors/CodeEditor";
import {edgeSchema, globalDefaultSchema, nodeSchema} from "../../lib/schemaValidation";
import {useNavigate} from "react-router-dom";
import ExportSimulationConfig from "./ExportSimulationConfig";
import ImportSimulationConfig from "./ImportSimulationConfig";
import IndividualImport from "./IndividualImport";
import SimulationExamplesComponent from "./SimulationExamplesComponent";


function addConfig(globalDefaults, setGlobalDefaults, nodesData, setNodesData, edgesData, setEdgesData) {
    let newGlobalDefaultsData = [...globalDefaults];
    newGlobalDefaultsData.push(JSON.stringify({"graph": {}, "node": {}, "edge": {}}));
    setGlobalDefaults(newGlobalDefaultsData);

    let newNodesData = [...nodesData];
    newNodesData.push(JSON.stringify([]));
    setNodesData(newNodesData);

    let newEdgesData = [...edgesData];
    newEdgesData.push(JSON.stringify([]));
    setEdgesData(newEdgesData);
}

function createEditorArea(count, language, globalDefaults, setGlobalDefaults, nodesData, setNodesData, edgesData, setEdgesData) {

    function setGlobalDefaultsDataFunction(newData) {
        let newGlobalDefaultsData = [...globalDefaults];
        newGlobalDefaultsData[count] = newData;
        setGlobalDefaults(newGlobalDefaultsData);
    }

    function setNodesDataFunction(newData) {
        let newNodesData = [...nodesData];
        newNodesData[count] = newData;
        setNodesData(newNodesData);
    }

    function setEdgesDataFunction(newData) {
        let newEdgesData = [...edgesData];
        newEdgesData[count] = newData;
        setEdgesData(newEdgesData);
    }

    return <>
        <div style={{
            width: "42%",
            float: "left",
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 20,
            paddingRight: 20,
            margin: 5,
            border: "1px solid black"
        }}>
            <div className="edit-area">
                <h4>{`Editor #${count}`}</h4>
                <div className="small-editor-div">
                    <h6>Global defaults editor</h6>
                    <CodeEditor language={language} data={globalDefaults[count]} setData={setGlobalDefaultsDataFunction}
                                modelName={"global-defaults-model-" + count}
                                schema={globalDefaultSchema}/>
                </div>

                <div className="editor-div">
                    <h6>Node editor</h6>
                    <CodeEditor language={language} data={nodesData[count]} setData={setNodesDataFunction}
                                modelName={"nodes-model-" + count}
                                schema={nodeSchema}/>
                </div>
                <div className="editor-div">
                    <h6>Edge editor</h6>
                    <CodeEditor language={language} data={edgesData[count]} setData={setEdgesDataFunction}
                                modelName={"edges-model-" + count}
                                schema={edgeSchema}/>
                </div>
            </div>
        </div>

    </>
}


const SimulationMaker = () => {

    let navigate = useNavigate();

    const [count, setCount] = useState(1);

    const [language, setLanguage] = useState("json");


    // nu moet dat allemaal in een array zitten, cuz meerdere editors --> meerdere configs
    const [globalDefaults, setGlobalDefaults] = useState([JSON.stringify({"graph": {}, "node": {}, "edge": {}})]);
    const [nodesData, setNodesData] = useState([JSON.stringify([])]);
    const [edgesData, setEdgesData] = useState([JSON.stringify([])]);


    function setIndividualData(index, globalDefaultsConfig, nodesConfig, edgesConfig) {
        let newGlobalDefaults = JSON.parse(JSON.stringify(globalDefaults)); // Change reference
        let newNodes = JSON.parse(JSON.stringify(nodesData));
        let newEdges = JSON.parse(JSON.stringify(edgesData));

        newGlobalDefaults[index] = JSON.stringify(globalDefaultsConfig, null, 4);
        newNodes[index] = JSON.stringify(nodesConfig, null, 4);
        newEdges[index] = JSON.stringify(edgesConfig, null, 4);

        setGlobalDefaults(newGlobalDefaults);
        setNodesData(newNodes);
        setEdgesData(newEdges);
    }


    function setData(globalDefaultsConfigs, nodesConfigs, edgesConfigs) {

        let newGlobalDefaults = JSON.parse(JSON.stringify(globalDefaults)); // Change reference
        let newNodes = JSON.parse(JSON.stringify(nodesData));
        let newEdges = JSON.parse(JSON.stringify(edgesData));

        setCount(globalDefaultsConfigs.length);

        for (let i = 0; i < globalDefaultsConfigs.length; i++) {
            newGlobalDefaults[i] = JSON.stringify(globalDefaultsConfigs[i], null, 4);
            newNodes[i] = JSON.stringify(nodesConfigs[i], null, 4);
            newEdges[i] = JSON.stringify(edgesConfigs[i], null, 4);

        }

        setGlobalDefaults(newGlobalDefaults);
        setNodesData(newNodes);
        setEdgesData(newEdges);
    }

    return <>

        {/* Button to add an editor area  */}
        <div style={{
            marginLeft: "93%",
            marginRight: "15px",
            position: "fixed",
            top: "15px",
            display: "flex",
            flexDirection: "column"
        }}>
            <OverlayTrigger
                placement="left"
                delay={{show: 250, hide: 400}}
                overlay={<Tooltip> Click this button to add a new editor area.</Tooltip>}
            >
                <Button variant={"success"} className={"rounded-circle"}
                        style={{width: 80, height: 80}}
                        onClick={
                            e => {
                                e.preventDefault();
                                addConfig(globalDefaults, setGlobalDefaults, nodesData, setNodesData, edgesData, setEdgesData);
                                setCount(count + 1);
                                createEditorArea(count, language, globalDefaults, setGlobalDefaults, nodesData, setNodesData, edgesData, setEdgesData);
                            }

                        }>
                    <BsPlusLg style={{width: 40, height: 40}}/>
                </Button>
            </OverlayTrigger>

            <Button variant={"warning"} style={{marginTop: "15px", fontSize: "1.2em"}} onClick={e => {
                e.preventDefault();
                navigate("/simulation-view", {
                    state: {
                        globalDefaultsList: globalDefaults,
                        nodesDataList: nodesData,
                        edgesDataList: edgesData
                    }
                })
            }}>Convert</Button>
        </div>

        <SimulationExamplesComponent setData={setData}/>

        <div style={{display: "flex"}}>
            <ExportSimulationConfig language={language} globalDefaultsDataList={globalDefaults}
                                    nodesDataList={nodesData} edgesDataList={edgesData}/>
            <ImportSimulationConfig setData={setData} setLanguage={setLanguage}/>
        </div>

        <div>
            <IndividualImport maxNumber={count} setData={setIndividualData} setLanguage={setLanguage}/>
        </div>

        {/* Editors */}
        {
            [...Array(count).keys()].map(n => {
                return createEditorArea(n, language, globalDefaults, setGlobalDefaults, nodesData, setNodesData, edgesData, setEdgesData);
            })
        }

    </>
}

export default SimulationMaker;
