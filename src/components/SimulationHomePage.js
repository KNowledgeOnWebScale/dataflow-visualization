import {Button, OverlayTrigger, Tooltip} from "react-bootstrap";
import {BsPlusLg} from "react-icons/bs";
import {useState} from "react";
import CodeEditor from "./editors/CodeEditor";
import {edgeSchema, globalDefaultSchema, nodeSchema} from "../lib/schemaValidation";


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
    // Andere functie
    /* let newGlobalDefaultsData = [...globalDefaults];
     newGlobalDefaultsData.push(JSON.stringify({"graph": {}, "node": {}, "edge": {}}));
     setGlobalDefaults(newGlobalDefaultsData);

     let newNodesData = [...nodesData];
     newNodesData.push(JSON.stringify([]));
     setNodesData(newNodesData);

     let newEdgesData = [...edgesData];
     newEdgesData.push(JSON.stringify([]));
     setEdgesData(newEdgesData);*/

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
            <div className="edit-area" /*style={{width: "49%", display: "inline-block"}}*/>
                <h4>{`Editor #${count}`}</h4>
                <div className="small-editor-div"/*className="node-edge-editor"*/>
                    <h6>Global defaults editor</h6>
                    <CodeEditor language={language} data={globalDefaults[count]} setData={setGlobalDefaultsDataFunction}
                                modelName={"global-defaults-model-" + count}
                                schema={globalDefaultSchema}/>
                </div>

                <div className="editor-div"/*className="node-edge-editor"*/>
                    <h6>Node editor</h6>
                    <CodeEditor language={language} data={nodesData[count]} setData={setNodesDataFunction}
                                modelName={"nodes-model-" + count}
                                schema={nodeSchema}/>
                </div>
                <div className="editor-div" /*className="node-edge-editor"*/>
                    <h6>Edge editor</h6>
                    <CodeEditor language={language} data={edgesData[count]} setData={setEdgesDataFunction}
                                modelName={"edges-model-" + count}
                                schema={edgeSchema}/>
                </div>
            </div>
        </div>

    </>
}


const SimulationHomePage = () => {

    // const [nodes, setNodes, onNodesChange] = useNodesState([]);
    // const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    // const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    const [count, setCount] = useState(1);

    //TODO al die controls is voor later
    const [language/*, setLanguage*/] = useState("json");
    //const [snapToGrid, setSnapToGrid] = useState(true);
    //const [autoSync, setAutoSync] = useState(true);

    // nu moet dat allemaal in een array zitten, cuz meerdere editors --> meerdere configs
    const [globalDefaults, setGlobalDefaults] = useState([JSON.stringify({"graph": {}, "node": {}, "edge": {}})]);
    const [nodesData, setNodesData] = useState([JSON.stringify([])]);
    const [edgesData, setEdgesData] = useState([JSON.stringify([])]);


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

            <Button variant={"warning"} style={{marginTop: "15px", fontSize: "1.2em"}} onClick={e => alert("does not work yet")}>Convert</Button>
        </div>

        {/* Editors */}
        {
            [...Array(count).keys()].map(n => {
                return createEditorArea(n, language, globalDefaults, setGlobalDefaults, nodesData, setNodesData, edgesData, setEdgesData);
            })
        }

    </>
}

export default SimulationHomePage;
