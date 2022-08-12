import {Button, Form} from "react-bootstrap";
import {json2yaml, yaml2json} from "../lib/jsonYamlConversionUtil";
import {useRef, useState} from "react";
import ErrorModal from "./ErrorModal";
import {downloadJSONFile} from "../lib/downloadFileUtil";

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
                               edges
                           }) => {

    const inputFile = useRef(null)

    const [errorTitle, setErrorTitle] = useState("");
    const [errorMessages, setErrorMessages] = useState([]);  // TODO: mss fixen dat dit ook een string kan zijn
    const [errorModalVisible, setErrorModalVisible] = useState(false);

    const [isCopied, setIsCopied] = useState(false);

    const globalDefaultsID = "globalDefaults";
    const nodesId = "nodes";
    const edgesId = "edges"


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

    function setPositions(e) {
        e.preventDefault();

        if (!nodes || !nodes.length) {
            console.log("geen nodes")

            setErrorTitle("No data available to update positions in the editor.");
            setErrorMessages(["Make sure there is a flow diagram visible first."]);
            setErrorModalVisible(true);
            return;
        }

        let newNodesData = JSON.parse(language === "yaml" ? yaml2json(nodesData) : nodesData);


        function nodesReactFlowNotSameAsNodesEditor() {
            setErrorTitle("Error while updating config of nodes.");
            setErrorMessages(["Make sure the flow visualization is the visualization of the configs.", "Make sure to click 'convert' first."]);
            setErrorModalVisible(true);
        }

        if (nodes.length !== newNodesData.length) {
            nodesReactFlowNotSameAsNodesEditor();
            return;
        }


        for (let i = 0; i < newNodesData.length; i += 1) {
            newNodesData[i]["position"] = nodes[i]["position"];

            if (newNodesData[i].shape !== nodes[i].data.shape && newNodesData[i].image !== nodes[i].data.image) {
                nodesReactFlowNotSameAsNodesEditor();
                return;
            }

        }

        const newNodesDataJSONStringify = JSON.stringify(newNodesData, null, 4);
        setNodesData(language === "yaml" ? json2yaml(newNodesDataJSONStringify) : newNodesDataJSONStringify);

    }

    function getPermaLink() {
        let rawLink = [window.location.href]

        if (nodes.length > 0) {
            if (rawLink[0].slice(-1) !== "/") {
                rawLink.push("/")
            }
            rawLink.push("#/rawdata?nodes=");
            rawLink.push(encodeURIComponent(JSON.stringify(nodes)));
            rawLink.push("&edges=");
            rawLink.push(encodeURIComponent(JSON.stringify(edges)));

            rawLink = rawLink.join("");
        }

        let customLink = [window.location.href]

        if (customLink[0].slice(-1) !== "/") {
            customLink.push("/")
        }
        customLink.push("#/customdata?globaldefaults=");
        customLink.push(encodeURIComponent(language === "yaml" ? JSON.stringify(JSON.parse(yaml2json(globalDefaults))) : JSON.stringify(JSON.parse(globalDefaults))));
        customLink.push("&nodes=");
        customLink.push(encodeURIComponent(language === "yaml" ? JSON.stringify(JSON.parse(yaml2json(nodesData))) : JSON.stringify(JSON.parse(nodesData))));
        customLink.push("&edges=");
        customLink.push(encodeURIComponent(language === "yaml" ? JSON.stringify(JSON.parse(yaml2json(edgesData))) : JSON.stringify(JSON.parse(edgesData))));

        customLink = customLink.join("")

        if ((customLink.length < rawLink.length) || rawLink.length === 1) {
            return customLink;
        }
        return rawLink;

    }

    async function copyTextToClipboard(text) {
        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(text);
        } else {
            return document.execCommand('copy', true, text);
        }
    }

    function handleCopyPermaLink(e) {
        // https://blog.logrocket.com/implementing-copy-clipboard-react-clipboard-api/
        e.preventDefault();

        copyTextToClipboard(getPermaLink())
            .then(() => {
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 1500);
            })
            .catch(e => {
                console.error("Error while copying to clipboard:", e)
            })

    }

    return <>
        <ErrorModal errorModalVisible={errorModalVisible} errorMessageTitle={errorTitle} errorMessages={errorMessages}
                    handleErrorPopUpClose={() => setErrorModalVisible(false)}/>

        <Button variant={"danger"} onClick={handleRawExport}>Export raw config</Button>
        <Button variant={"success"} onClick={handleExport}>Export config</Button>
        <Button variant={"success"} onClick={handleImport}>Import config</Button>
        <input type='file' id='file' ref={inputFile} onChange={handleFileChange} style={{display: 'none'}}/>

        <Button variant={"info"} onClick={setPositions}>Fill in positions into node config</Button>

        <Button variant={"secondary"} onClick={handleCopyPermaLink}>{isCopied ? "Copied!" : "Copy permalink"}</Button>

        <Form style={{margin: "10px 5px"}}>
            <Form.Check
                type="switch"
                id="auto-sync-switch"
                label="Autosync"
                defaultChecked={true}
                inline={true}
                onChange={changeAutoSync}
            />
            <Form.Check
                type="switch"
                id="snap-to-grid-switch"
                label="Snap to grid"
                defaultChecked={true}
                inline={true}
                onChange={changeSnapToGrid}
            />
        </Form>
    </>
}

export default ControlsComponent;
