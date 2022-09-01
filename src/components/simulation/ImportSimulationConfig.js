import {Button} from "react-bootstrap";
import {useRef} from "react";

const ImportSimulationConfig = ({setData}) => {

    const inputFile = useRef(null)


    // Fill in in all the editors
    function handleImport(e) {
        e.preventDefault();
        inputFile.current.click();
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
                alert("Error when loading in JSON file. Could not parse as JSON.")
                console.warn(e);
                return;
            }

            if (!fileAsJson.hasOwnProperty("globalDefaultsConfigs") || !fileAsJson.hasOwnProperty("nodesConfigs") || !fileAsJson.hasOwnProperty("edgesConfigs")) {
                alert("The file you import needs to be in JSON format with keys: 'globalDefaultsConfigs', 'nodesConfigs' and 'edgesConfigs'.");
            }

            setData(fileAsJson["globalDefaultsConfigs"], fileAsJson["nodesConfigs"], fileAsJson["edgesConfigs"]);

        }


        reader.onerror = () => {

            alert("Could not open file.");
            console.warn("Error while reading the imported file.");
        }

        // Reset file input
        e.target.value = null;

    }

    return <>
        <Button variant={"success"} onClick={handleImport}>Import</Button>
        <input type='file' id='file' ref={inputFile} onChange={handleFileChange} style={{display: 'none'}}/>
    </>

}

export default ImportSimulationConfig;
