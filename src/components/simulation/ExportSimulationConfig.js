import {Button} from "react-bootstrap";
import {downloadJSONFile} from "../../lib/downloadFileUtil";
import {yaml2json} from "../../lib/jsonYamlConversionUtil";

const ExportSimulationConfig = ({globalDefaultsDataList, nodesDataList, edgesDataList, language = "json"}) => {

    function handleExport(e) {
        e.preventDefault();

        let gdAsJSON;
        let nodesAsJSON;
        let edgesAsJSON;

        try {
            gdAsJSON = globalDefaultsDataList.map(config => language === "yaml" ? JSON.parse(yaml2json(config)) : JSON.parse(config));
            nodesAsJSON = nodesDataList.map(config => language === "yaml" ? JSON.parse(yaml2json(config)) : JSON.parse(config));
            edgesAsJSON = edgesDataList.map(config => language === "yaml" ? JSON.parse(yaml2json(config)) : JSON.parse(config));
        } catch (e) {
            console.warn(e);
            alert("Could not parse contents of editors as JSON.");
            return;
        }

        const out = {
            "globalDefaultsConfigs": gdAsJSON,
            "nodesConfigs": nodesAsJSON,
            "edgesConfigs": edgesAsJSON
        };

        downloadJSONFile("simulationConfig.json", out);

    }

    return <>
        <Button variant={"warning"} onClick={handleExport}>Export</Button>
    </>

}

export default ExportSimulationConfig;
