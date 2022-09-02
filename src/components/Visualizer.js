import {addEdge, useEdgesState, useNodesState} from "react-flow-renderer";
import EditorArea from "./editors/EditorArea";
import {useCallback, useEffect, useState} from "react";
import ExampleComponent from "./ExamplesComponent";
import ControlsComponent from "./controls/ControlsComponent";
import ReactFlowComponent from "./ReactFlowComponent";
import {yaml2json} from "../lib/jsonYamlConversionUtil";
import {edgeSchema, globalDefaultSchema, nodeSchema, validateJSON} from "../lib/schemaValidation";
import {setFlowData} from "../lib/setFlowData";
import UndoRedoModel from "./controls/children/UndoRedoModel";
import useDebounce from "../lib/customHooks/useDebounce";


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

    const [undoRedoModel, setUndoRedoModel] = useState(null);
    const [saveInUndoRedo, setSaveInUndoRedo] = useState(true)

    useEffect(() => {
        setUndoRedoModel(new UndoRedoModel());
    }, [])


    function performAutoSaveInUndoRedo() {
        // saveInUndoRedo is used, because if you click redo with autosync on, you don't want that config to be saved again
        if (!autoSync || !saveInUndoRedo) return

        let globalDefaultsAsJSON;
        let nodesAsJSON;
        let edgesAsJSON;
        try {
            globalDefaultsAsJSON = JSON.parse(language === "yaml" ? yaml2json(globalDefaults) : globalDefaults);
            nodesAsJSON = JSON.parse(language === "yaml" ? yaml2json(nodesData) : nodesData);
            edgesAsJSON = JSON.parse(language === "yaml" ? yaml2json(edgesData) : edgesData);
        } catch (e) {
            console.warn("No auto save because invalid data")
            return;
        }

        if (undoRedoModel) {
            undoRedoModel.addConfigs(globalDefaultsAsJSON, nodesAsJSON, edgesAsJSON);
        }

    }

    useDebounce(performAutoSaveInUndoRedo, [globalDefaults, nodesData, edgesData], 2000);


    function changeSnapToGrid() {
        setSnapToGrid(!snapToGrid);
    }

    function changeAutoSync() {
        setAutoSync(!autoSync);
    }

    function setGlobalDefaultsConfig(globalDefaultsConfig, saveInUndoRedo = true) {
        setSaveInUndoRedo(saveInUndoRedo);
        setGlobalDefaults(globalDefaultsConfig)
    }

    function setNodesConfig(nodesConfig, saveInUndoRedo = true) {
        setSaveInUndoRedo(saveInUndoRedo);
        setNodesData(nodesConfig);
    }

    function setEdgesConfig(edgesConfig, saveInUndoRedo = true) {
        setSaveInUndoRedo(saveInUndoRedo);
        setEdgesData(edgesConfig);
    }

    function setData(newGlobalDefaults, newNodes, newEdges, saveInUndoRedo = true) {
        setSaveInUndoRedo(saveInUndoRedo);

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
                           nodes={nodes} setNodes={setNodes} edges={edges} setEdges={setEdges}
                           undoRedoModel={undoRedoModel}/>

        <table style={{width: "100%", marginLeft: "5px", marginRight: "5px"}}>
            <tbody>
            <tr>
                <td style={{width: "30%"/*border: "5px solid green"*/}}>
                    <EditorArea setNodes={setNodes} setEdges={setEdges} language={language} setLanguage={setLanguage}
                                setData={setData} globalDefaults={globalDefaults}
                                setGlobalDefaults={setGlobalDefaultsConfig}
                                edgesData={edgesData} setEdgesData={setEdgesConfig} nodesData={nodesData}
                                setNodesData={setNodesConfig} convertButtonEnabled={!autoSync}
                                undoRedoModel={undoRedoModel}/>
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
