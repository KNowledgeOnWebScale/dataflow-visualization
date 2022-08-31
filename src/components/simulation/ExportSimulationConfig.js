import {Button} from "react-bootstrap";
import {downloadJSONFile} from "../../lib/downloadFileUtil";
import {yaml2json} from "../../lib/jsonYamlConversionUtil";

const ExportSimulationConfig = ({globalDefaultsDataList, nodesDataList, edgesDataList, language = "json"}) => {

    function handleExport(e) {
        e.preventDefault();

        const gdAsJSON = globalDefaultsDataList.map(config => language === "yaml" ? JSON.parse(yaml2json(config)) : JSON.parse(config));
        const nodesAsJSON = nodesDataList.map(config => language === "yaml" ? JSON.parse(yaml2json(config)) : JSON.parse(config));
        const edgesAsJSON = edgesDataList.map(config => language === "yaml" ? JSON.parse(yaml2json(config)) : JSON.parse(config));


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
