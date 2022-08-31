import {Button, OverlayTrigger, Tooltip} from "react-bootstrap";
import {BsPlusLg} from "react-icons/bs";
import {useEffect, useState} from "react";
import CodeEditor from "../editors/CodeEditor";
import {edgeSchema, globalDefaultSchema, nodeSchema} from "../../lib/schemaValidation";
import {useNavigate} from "react-router-dom";
import ExportSimulationConfig from "./ExportSimulationConfig";
import ImportSimulationConfig from "./ImportSimulationConfig";
import IndividualImport from "./IndividualImport";
import SimulationExamplesComponent from "./SimulationExamplesComponent";
import LanguageSwitcher from "../LanguageSwitcher";
import {json2yaml, yaml2json} from "../../lib/jsonYamlConversionUtil";


function addConfig(language, globalDefaults, setGlobalDefaults, nodesData, setNodesData, edgesData, setEdgesData) {
    const globalDefaultsInitJSON = JSON.stringify({"graph": {}, "node": {}, "edge": {}}, null, 4)
    const nodesInitJSON = JSON.stringify([]);
    const edgesInitJSON = JSON.stringify([]);

    let newGlobalDefaultsData = [...globalDefaults];
    newGlobalDefaultsData.push(language === "yaml" ? json2yaml(globalDefaultsInitJSON) : globalDefaultsInitJSON);
    setGlobalDefaults(newGlobalDefaultsData);

    let newNodesData = [...nodesData];
    newNodesData.push(language === "yaml" ? json2yaml(nodesInitJSON) : nodesInitJSON);
    setNodesData(newNodesData);

    let newEdgesData = [...edgesData];
    newEdgesData.push(language === "yaml" ? json2yaml(edgesInitJSON) : edgesInitJSON);
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
                                modelName={"global-defaults-simulation-model-" + count}
                                schema={globalDefaultSchema}/>
                </div>

                <div className="editor-div">
                    <h6>Node editor</h6>
                    <CodeEditor language={language} data={nodesData[count]} setData={setNodesDataFunction}
                                modelName={"nodes-simulation-model-" + count}
                                schema={nodeSchema}/>
                </div>
                <div className="editor-div">
                    <h6>Edge editor</h6>
                    <CodeEditor language={language} data={edgesData[count]} setData={setEdgesDataFunction}
                                modelName={"edges-simulation-model-" + count}
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


    useEffect(() => {
        switchLanguage();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [language])


    const switchLanguage = () => {

        let newGlobalDefaults = [];
        let newNodes = [];
        let newEdges = [];

        if (language === "json") {
            for (let i = 0; i < globalDefaults.length; i += 1) {
                newGlobalDefaults.push(yaml2json(globalDefaults[i]));
                newNodes.push(yaml2json(nodesData[i]));
                newEdges.push(yaml2json(edgesData[i]));
            }
            setGlobalDefaults(newGlobalDefaults);
            setNodesData(newNodes);
            setEdgesData(newEdges);

        } else if (language === "yaml") {
            for (let i = 0; i < globalDefaults.length; i += 1) {
                newGlobalDefaults.push(json2yaml(globalDefaults[i]));
                newNodes.push(json2yaml(nodesData[i]));
                newEdges.push(json2yaml(edgesData[i]));
            }
            setGlobalDefaults(newGlobalDefaults);
            setNodesData(newNodes);
            setEdgesData(newEdges);
        }
    }


    function setIndividualData(index, globalDefaultsConfig, nodesConfig, edgesConfig) {
        // Gets called when importing JSON file, so input is JSON

        let newGlobalDefaults = [];
        let newNodes = [];
        let newEdges = [];

        const globalDefaultsJSON = JSON.stringify(globalDefaultsConfig, null, 4);
        const nodesJSON = JSON.stringify(nodesConfig, null, 4);
        const edgesJSON = JSON.stringify(edgesConfig, null, 4);

        newGlobalDefaults.push(language === "yaml" ? json2yaml(globalDefaultsJSON) : globalDefaultsJSON);
        newNodes.push(language === "yaml" ? json2yaml(nodesJSON) : nodesJSON);
        newEdges.push(language === "yaml" ? json2yaml(edgesJSON) : edgesJSON);

        setGlobalDefaults(newGlobalDefaults);
        setNodesData(newNodes);
        setEdgesData(newEdges);
    }


    function setData(globalDefaultsConfigs, nodesConfigs, edgesConfigs) {
        // Input is JSON

        let newGlobalDefaults = []; // Change reference needed, so created new array
        let newNodes = [];
        let newEdges = [];

        setCount(globalDefaultsConfigs.length);

        for (let i = 0; i < globalDefaultsConfigs.length; i++) {
            let globalDefaultsJSON = JSON.stringify(globalDefaultsConfigs[i], null, 4);
            let nodesJSON = JSON.stringify(nodesConfigs[i], null, 4);
            let edgesJSON = JSON.stringify(edgesConfigs[i], null, 4)

            newGlobalDefaults.push(language === "yaml" ? json2yaml(globalDefaultsJSON) : globalDefaultsJSON);
            newNodes.push(language === "yaml" ? json2yaml(nodesJSON) : nodesJSON);
            newEdges.push(language === "yaml" ? json2yaml(edgesJSON) : edgesJSON);

        }

        setGlobalDefaults(newGlobalDefaults);
        setNodesData(newNodes);
        setEdgesData(newEdges);
    }

    function toJSON(arr) {
        if (language === "yaml") {
            let newArr = [];
            for (let el of arr) {
                newArr.push(yaml2json(el));
            }
            return newArr;
        }
        return arr;
    }

    return <>

        {/* Button to add an editor area  */}
        <div style={{
            marginLeft: "93%",
            marginRight: "15px",
            position: "fixed",
            top: "15px",
            display: "flex",
            flexDirection: "column",
            zIndex: 1
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
                                addConfig(language, globalDefaults, setGlobalDefaults, nodesData, setNodesData, edgesData, setEdgesData);
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
                        globalDefaultsList: toJSON(globalDefaults),
                        nodesDataList: toJSON(nodesData),
                        edgesDataList: toJSON(edgesData)
                    }
                })
            }}>Convert</Button>
        </div>

        {/*Other buttons*/}
        <SimulationExamplesComponent setData={setData}/>

        <div style={{display: "flex"}}>
            <ExportSimulationConfig language={language} globalDefaultsDataList={globalDefaults}
                                    nodesDataList={nodesData} edgesDataList={edgesData}/>
            <ImportSimulationConfig setData={setData} setLanguage={setLanguage}/>
        </div>

        <div>
            <IndividualImport maxNumber={count} setData={setIndividualData} setLanguage={setLanguage}/>
        </div>

        <LanguageSwitcher language={language} setLanguage={setLanguage} setData={() => undefined}
                          globalDefaults={globalDefaults} nodesData={nodesData} edgesData={edgesData}/>

        {/* Editors */}
        {
            [...Array(count).keys()].map(n => {
                return createEditorArea(n, language, globalDefaults, setGlobalDefaults, nodesData, setNodesData, edgesData, setEdgesData);
            })
        }

    </>
}

export default SimulationMaker;
