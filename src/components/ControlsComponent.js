import {Button} from "react-bootstrap";
import {yaml2json} from "../lib/jsonYamlConversionUtil";
import {useRef, useState} from "react";
import ErrorModal from "./ErrorModal";

const ControlsComponent = ({language, setLanguage, globalDefaults, nodesData, edgesData, setData}) => {

    const inputFile = useRef(null)

    const [errorTitle, setErrorTitle] = useState("");
    const [errorMessages, setErrorMessages] = useState([]);  // TODO: mss fixen dat dit ook een string kan zijn
    const [errorModalVisible, setErrorModalVisible] = useState(false);

    const globalDefaultsID = "globalDefaults";
    const nodesId = "nodes";
    const edgesId = "edges"

    function handleExport(e) {
        e.preventDefault();

        //TODO: check syntax first
        // If invalid, pop up the errorModal
        // Do this when issue 30 is implemented

        let globalDefaultsConfig = JSON.parse(language === "json" ? globalDefaults : yaml2json(globalDefaults));
        let nodesConfig = JSON.parse(language === "json" ? nodesData : yaml2json(nodesData));
        let edgesConfig = JSON.parse(language === "json" ? edgesData : yaml2json(edgesData));


        const out = {[globalDefaultsID]: globalDefaultsConfig, [nodesId]: nodesConfig, [edgesId]: edgesConfig};


        const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(out)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "config.json";

        link.click();
    }

    function handleImport(e) {
        e.preventDefault();
        inputFile.current.click();

        //console.log(inputFile)

    }

    function handleFileChange(e) {
        const fileObject = e.target.files && e.target.files[0];
        if (!fileObject) {
            return;
        }

        const reader = new FileReader();
        reader.readAsText(fileObject);

        reader.onload = () => {
            let fileAsJson;
            try {
                fileAsJson = JSON.parse(reader.result);
            } catch (e) {
                setErrorTitle("Error while parsing content of file as JSON.");
                setErrorMessages([`Make sure the file is valid JSON, with keys '${globalDefaultsID}', '${nodesId}' and '${edgesId}'.`])
                setErrorModalVisible(true);
                console.warn(e);
                return;
            }
            console.log(fileAsJson);

            setData(
                JSON.stringify(fileAsJson[globalDefaultsID], null, 4),
                JSON.stringify(fileAsJson[nodesId], null, 4),
                JSON.stringify(fileAsJson[edgesId], null, 4)
            )
            setLanguage("json");
        }


        reader.onerror = () => {

            setErrorTitle("Could not open file.");
            setErrorModalVisible(true);

            console.warn("Error while reading the imported file.");
        }

        // Reset file input
        e.target.value = null;

    }

    return <>
        <ErrorModal errorModalVisible={errorModalVisible} errorMessageTitle={errorTitle} errorMessages={errorMessages}
                    handleErrorPopUpClose={() => setErrorModalVisible(false)}/>

        <Button variant={"success"} onClick={handleExport}>Export config</Button>
        <Button variant={"success"} onClick={handleImport}>Import config</Button>
        <input type='file' id='file' ref={inputFile} onChange={handleFileChange} style={{display: 'none'}}/>
    </>
}

export default ControlsComponent;
