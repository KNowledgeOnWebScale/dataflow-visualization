import {Button} from "react-bootstrap";
import {yaml2json} from "./jsonYamlUtil";
import {useRef} from "react";

const ControlsComponent = ({language, setLanguage, globalDefaults, nodesData, edgesData, setData}) => {

    const inputFile = useRef(null)

    const globalDefaultsID = "globalDefaults";
    const nodesId = "nodes";
    const edgesId = "edges"

    function handleExport(e) {
        e.preventDefault();

        //TODO: check syntax first


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
            const fileAsJson = JSON.parse(reader.result);

            console.log(fileAsJson)
            setData(
                JSON.stringify(fileAsJson[globalDefaultsID], null, 4),
                JSON.stringify(fileAsJson[nodesId], null, 4),
                JSON.stringify(fileAsJson[edgesId], null, 4)
            )
            setLanguage("json");
        }


        reader.onerror = () => {
            // TODO: mss werken met errorModal
            // OOk checken of het wel correct kan geparsed worden als json, indien niet correcte error message tonen

            console.warn("Error while reading the imported file.");
        }
        // Reset file input
        e.target.value = null;

    }

    return <>
        <Button variant={"success"} onClick={handleExport}>Export config</Button>
        <Button variant={"success"} onClick={handleImport}>Import config</Button>
        <input type='file' id='file' ref={inputFile} onChange={handleFileChange} style={{display: 'none'}}/>
    </>
}

export default ControlsComponent;
