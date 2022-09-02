import {useState} from "react";
import ErrorModal from "../ErrorModal";
import ImportExport from "./children/ImportExport";
import FillInPositions from "./children/FillInPositions";
import CopyPermalink from "./children/CopyPermalink";
import ToggleButtons from "./children/toggleButtons/ToggleButtons";
import ImportLink from "./children/ImportLink";
import UndoRedo from "./children/UndoRedo";

const ControlsComponent = ({
                               language,
                               setLanguage,
                               changeSnapToGrid,
                               changeAutoSync,
                               globalDefaults,
                               nodesData,
                               setNodesData,
                               edgesData,
                               setData,
                               nodes,
                               setNodes,
                               edges,
                               setEdges,
                               undoRedoModel
                           }) => {

    const [errorTitle, setErrorTitle] = useState("");
    const [errorMessages, setErrorMessages] = useState([]);
    const [errorModalVisible, setErrorModalVisible] = useState(false);

    function setError(title, message, visible) {
        setErrorTitle(title);
        setErrorMessages([message]);
        setErrorModalVisible(visible);
    }

    return <>
        <ErrorModal errorModalVisible={errorModalVisible} errorMessageTitle={errorTitle} errorMessages={errorMessages}
                    handleErrorPopUpClose={() => setErrorModalVisible(false)}/>


        <ImportExport nodes={nodes} edges={edges} globalDefaults={globalDefaults} nodesData={nodesData}
                      edgesData={edgesData} language={language} setLanguage={setLanguage} setData={setData}
                      setErrorTitle={setErrorTitle} setErrorMessages={setErrorMessages}
                      setErrorModalVisible={setErrorModalVisible}/>


        <FillInPositions nodes={nodes} globalDefaultsData={globalDefaults} nodesData={nodesData}
                         setNodesData={setNodesData} language={language}
                         setError={setError}/>


        <CopyPermalink nodes={nodes} edges={edges} globalDefaults={globalDefaults} nodesData={nodesData}
                       edgesData={edgesData} language={language}/>

        <UndoRedo UndoRedoModel={undoRedoModel} setData={setData} language={language}/>

        <ImportLink language={language} setData={setData} setNodes={setNodes} setEdges={setEdges}
                    changeAutoSync={changeAutoSync}/>

        <ToggleButtons changeAutoSync={changeAutoSync}
                       changeSnapToGrid={changeSnapToGrid}/>
    </>
}

export default ControlsComponent;
