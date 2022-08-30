import {useCallback, useEffect, useState} from "react";
import {Button, ButtonGroup} from "react-bootstrap";
import {useLocation} from "react-router-dom";
import {addEdge, useEdgesState, useNodesState} from "react-flow-renderer";
import {setFlowData} from "../../lib/setFlowData";
import ReactFlowComponent from "../ReactFlowComponent";
import SnapToGridSwitchButton from "../controls/children/toggleButtons/SnapToGridSwitchButton";
import ExportSimulationConfig from "./ExportSimulationConfig";

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
        setFlowData(JSON.parse(location.state.globalDefaultsList[step]), JSON.parse(location.state.nodesDataList[step]), JSON.parse(location.state.edgesDataList[step]), setNodes, setEdges);
    }

    return <>

        {loadingMessage &&
            <h3>{loadingMessage}</h3>
        }

        {!loadingMessage &&
            <>

                <div style={{width: "100%", display: "flex"}}>
                    <ExportSimulationConfig language={"json"} globalDefaultsDataList={location.state.globalDefaultsList}
                                            nodesDataList={location.state.nodesDataList}
                                            edgesDataList={location.state.edgesDataList}/>
                    &nbsp;
                    &nbsp;
                    <SnapToGridSwitchButton changeSnapToGrid={() => setSnapToGrid(!snapToGrid)}/>
                </div>
                <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
                    {location && location.state && location.state.globalDefaultsList.length &&
                        <ButtonGroup size="lg" className="mb-2">
                            {
                                [...Array(location.state.globalDefaultsList.length).keys()].map(s => {
                                        return <Button onClick={e => loadInConfig(e, s)}>{"Step " + s}</Button>
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
