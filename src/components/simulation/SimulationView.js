import {useCallback, useEffect, useState} from "react";
import {Button, ButtonGroup, Col, Form, Row} from "react-bootstrap";
import {useLocation} from "react-router-dom";
import {addEdge, useEdgesState, useNodesState} from "react-flow-renderer";
import {setFlowData} from "../../lib/setFlowData";
import ReactFlowComponent from "../ReactFlowComponent";
import SnapToGridSwitchButton from "../controls/children/toggleButtons/SnapToGridSwitchButton";
import ExportSimulationConfig from "./ExportSimulationConfig";
import ImportSimulationConfig from "./ImportSimulationConfig";
import {FaPlay} from "react-icons/fa";
import {edgeSchema, globalDefaultSchema, nodeSchema, validateJSON} from "../../lib/schemaValidation";

const SimulationView = (/*{
                            globalDefaultsList,
                            nodesDataList,
                            edgesDataList
                        }*/) => {

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    const [snapToGrid, setSnapToGrid] = useState(true);

    const [loadingMessage, setLoadingMessage] = useState("")

    const [delay, setDelay] = useState(3000);

    const location = useLocation();

    useEffect(() => {

        if (!location) {
            setLoadingMessage("Loading...");
        } else if (!location.state || !location.state.globalDefaultsList || !location.state.nodesDataList || !location.state.edgesDataList) {
            setLoadingMessage("There is no data to show (invalid props).");
        } else if (!(location.state.globalDefaultsList.length === location.state.nodesDataList.length && location.state.nodesDataList.length === location.state.edgesDataList.length)) {
            setLoadingMessage("Unable to show data, because the data is incorrect.");
        }

        // TODO: Nog kijken of de schema's juist zijn

        else {
            setLoadingMessage("");
        }
    }, [location]);


    function loadInConfig(e, step) {
        e.preventDefault();

        let error = "";

        let parsedGlobalDefaults = JSON.parse(location.state.globalDefaultsList[step]);
        let parsedNodes = JSON.parse(location.state.nodesDataList[step]);
        let parsedEdges = JSON.parse(location.state.edgesDataList[step]);

        validateJSON(parsedEdges, edgeSchema, e => error = e);
        validateJSON(parsedNodes, nodeSchema, e => error = e)
        validateJSON(parsedGlobalDefaults, globalDefaultSchema, e => error = e);

        if (error === "") {
            setFlowData(parsedGlobalDefaults, parsedNodes, parsedEdges, setNodes, setEdges);
        } else {
            alert("step " + step + ": " + error)
        }

        e.target.style.opacity = 0.9;
        setTimeout(() => {
            e.target.style.opacity = 1;
        }, 80)
    }

    function setData(globalDefaultsConfigs, nodesConfigs, edgesConfigs) {
        location.state.globalDefaultsList = globalDefaultsConfigs.map(config => JSON.stringify(config));
        location.state.nodesDataList = nodesConfigs.map(config => JSON.stringify(config));
        location.state.edgesDataList = edgesConfigs.map(config => JSON.stringify(config));
    }


    function playAnimation(e) {
        e.preventDefault();

        for (let i = 0; i < location.state.globalDefaultsList.length; i++) {
            setTimeout(function () {
                // console.log('count ', i);
                document.getElementById("button-" + i).click();
            }, delay * (i));
        }

    }

    return <>

        {loadingMessage &&
            <h3>{loadingMessage}</h3>
        }

        {!loadingMessage && location && location.state &&
            <>

                <div style={{display: "flex", justifyContent: "end"}}>

                    <div style={{marginRight: "auto", display: "flex"}}>
                        <ExportSimulationConfig language={"json"}
                                                globalDefaultsDataList={location.state.globalDefaultsList}
                                                nodesDataList={location.state.nodesDataList}
                                                edgesDataList={location.state.edgesDataList}/>

                        <ImportSimulationConfig setData={setData} setLanguage={() => undefined /*TODO*/}/>

                        &nbsp;
                        &nbsp;
                        <SnapToGridSwitchButton changeSnapToGrid={() => setSnapToGrid(!snapToGrid)}/>
                    </div>

                    <div style={{display: "flex"}}>
                        <Form onSubmit={playAnimation}>
                            <Form.Group as={Row} className={"justify-content-end"}>
                                <Form.Label column sm={2}>Delay</Form.Label>
                                <Col sm={5}>
                                    <Form.Control type={"number"} step={1} min={100} value={delay}
                                                  onChange={e => setDelay(parseInt(e.target.value))}
                                    />
                                </Col>
                            </Form.Group>
                        </Form>
                        <Button className={"rounded-circle"} style={{width: 60, height: 60}} onClick={playAnimation}>
                            <FaPlay style={{width: 30, height: 30}}/>
                        </Button>
                    </div>
                </div>

                <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
                    {location && location.state && location.state.globalDefaultsList.length &&
                        <ButtonGroup size="lg" className="mb-2">
                            {
                                [...Array(location.state.globalDefaultsList.length).keys()].map(s => {
                                        return <Button id={"button-" + s}
                                                       onClick={e => loadInConfig(e, s)}>{"Step " + s}</Button>
                                    }
                                )
                            }
                        </ButtonGroup>
                    }
                </div>

                <ReactFlowComponent nodes={nodes} edges={edges} onNodesChange={onNodesChange}
                                    onEdgesChange={onEdgesChange}
                                    onConnect={onConnect} snapToGrid={snapToGrid} showControls={true}/>

            </>
        }

    </>

}

export default SimulationView;
