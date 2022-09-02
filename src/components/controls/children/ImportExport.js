import {Button} from "react-bootstrap";
import {downloadJSONFile} from "../../../lib/downloadFileUtil";
import {yaml2json} from "../../../lib/jsonYamlConversionUtil";
import {useRef} from "react";

const ImportExport = ({
                          nodes,
                          edges,
                          globalDefaults,
                          nodesData,
                          edgesData,
                          language,
                          setLanguage,
                          setData,
                          setErrorTitle,
                          setErrorMessages,
                          setErrorModalVisible
                      }) => {

    const globalDefaultsID = "globalDefaults";
    const nodesId = "nodes";
    const edgesId = "edges"

    const inputFile = useRef(null)

    function handleRawExport(e) {
        e.preventDefault();

        const out = {"rawNodesConfig": nodes, "rawEdgesConfig": edges};

        downloadJSONFile("rawconfig.json", out);

    }

    function handleExport(e) {
        e.preventDefault();

        //TODO: check syntax first
        // If invalid, pop up the errorModal

        let globalDefaultsConfig = JSON.parse(language === "json" ? globalDefaults : yaml2json(globalDefaults));
        let nodesConfig = JSON.parse(language === "json" ? nodesData : yaml2json(nodesData));
        let edgesConfig = JSON.parse(language === "json" ? edgesData : yaml2json(edgesData));

        const out = {[globalDefaultsID]: globalDefaultsConfig, [nodesId]: nodesConfig, [edgesId]: edgesConfig};

        downloadJSONFile("config.json", out);

    }

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
                setErrorTitle("Error while parsing content of file as JSON.");
                setErrorMessages([`Make sure the file is valid JSON, with keys '${globalDefaultsID}', '${nodesId}' and '${edgesId}'.`])
                setErrorModalVisible(true);
                console.warn(e);
                return;
            }

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
        <Button variant={"danger"} onClick={handleRawExport}>Export raw config</Button>
        <Button variant={"success"} onClick={handleExport}>Export config</Button>
        <Button variant={"success"} onClick={handleImport}>Import config</Button>
        <input type='file' id='file' ref={inputFile} onChange={handleFileChange} style={{display: 'none'}}/>
    </>
}

export default ImportExport;
