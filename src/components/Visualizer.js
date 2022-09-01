import {addEdge, useEdgesState, useNodesState} from "react-flow-renderer";
import EditorArea from "./editors/EditorArea";
import {useCallback, useEffect, useState} from "react";
import ExampleComponent from "./ExamplesComponent";
import ControlsComponent from "./controls/ControlsComponent";
import ReactFlowComponent from "./ReactFlowComponent";
import {yaml2json} from "../lib/jsonYamlConversionUtil";
import {edgeSchema, globalDefaultSchema, nodeSchema, validateJSON} from "../lib/schemaValidation";
import {setFlowData} from "../lib/setFlowData";

const Visualizer = () => {

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    const [language, setLanguage] = useState("json");
    const [snapToGrid, setSnapToGrid] = useState(true);
    const [autoSync, setAutoSync] = useState(true);

    const [globalDefaults, setGlobalDefaults] = useState(JSON.stringify({"graph": {}, "node": {}, "edge": {}}));
    const [nodesData, setNodesData] = useState(JSON.stringify([]));
    const [edgesData, setEdgesData] = useState(JSON.stringify([]));

    function changeSnapToGrid() {
        setSnapToGrid(!snapToGrid);
    }

    function changeAutoSync() {
        setAutoSync(!autoSync);
    }

    function setData(newGlobalDefaults, newNodes, newEdges) {
        setGlobalDefaults(newGlobalDefaults);
        setNodesData(newNodes);
        setEdgesData(newEdges);
    }

    const autoSyncFlow = useCallback(() => {
        let gd = globalDefaults;
        let nd = nodesData;
        let ed = edgesData

        if (language === "yaml") {
            gd = yaml2json(gd);
            nd = yaml2json(nd);
            ed = yaml2json(ed);
        }

        let parsedGd;
        let parsedNd;
        let parsedEd;
        try {
            parsedGd = JSON.parse(gd);
            parsedNd = JSON.parse(nd);
            parsedEd = JSON.parse(ed);
        } catch (e) {
            return;
        }

        let error = "";

        validateJSON(parsedGd, globalDefaultSchema, e => error = e);
        validateJSON(parsedNd, nodeSchema, e => error = e)
        validateJSON(parsedEd, edgeSchema, e => error = e);

        if (error === "") {
            setFlowData(parsedGd, parsedNd, parsedEd, setNodes, setEdges);
        }
    }, [globalDefaults, nodesData, edgesData, language, setNodes, setEdges]);


    useEffect(() => {
        if (autoSync) {
            autoSyncFlow();
        }
    }, [globalDefaults, nodesData, edgesData, autoSync, autoSyncFlow])


    //TODO die 100000 argumenten meegeven is niet echt scalable
    return <>

        <ExampleComponent language={language} setData={setData}/>
        <ControlsComponent language={language} setLanguage={setLanguage} changeSnapToGrid={changeSnapToGrid}
                           changeAutoSync={changeAutoSync} globalDefaults={globalDefaults}
                           nodesData={nodesData} setNodesData={setNodesData} edgesData={edgesData} setData={setData}
                           nodes={nodes} setNodes={setNodes} edges={edges} setEdges={setEdges}/>

        <table style={{width: "100%", marginLeft: "5px", marginRight: "5px"}}>
            <tbody>
            <tr>
                <td style={{width: "30%"/*border: "5px solid green"*/}}>
                    <EditorArea setNodes={setNodes} setEdges={setEdges} language={language} setLanguage={setLanguage}
                                setData={setData} globalDefaults={globalDefaults} setGlobalDefaults={setGlobalDefaults}
                                edgesData={edgesData} setEdgesData={setEdgesData} nodesData={nodesData}
                                setNodesData={setNodesData} convertButtonEnabled={!autoSync}/>
                </td>
                <td style={{width: "3%"}}></td>
                <td>
                    <ReactFlowComponent nodes={nodes} edges={edges} onNodesChange={onNodesChange}
                                        onEdgesChange={onEdgesChange}
                                        onConnect={onConnect} snapToGrid={snapToGrid}/>
                </td>
            </tr>
            </tbody>
        </table>

    </>

}

export default Visualizer;
