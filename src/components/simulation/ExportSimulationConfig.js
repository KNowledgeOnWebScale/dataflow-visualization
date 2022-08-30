import {Button} from "react-bootstrap";
import {downloadJSONFile} from "../../lib/downloadFileUtil";

const ExportSimulationConfig = ({language, globalDefaultsDataList, nodesDataList, edgesDataList}) => {

    function handleExport(e) {
        e.preventDefault();

        console.log(globalDefaultsDataList)

        const gdAsJSON = globalDefaultsDataList.map(config => JSON.parse(config));
        const nodesAsJSON = nodesDataList.map(config => JSON.parse(config));
        const edgesAsJSON = edgesDataList.map(config => JSON.parse(config));

        console.log(JSON.stringify(gdAsJSON))


        let globalDefaultsConfig = gdAsJSON //JSON.parse(language === "json" ? gdAsJSON : yaml2json(gdAsJSON));
        let nodesConfig = nodesAsJSON //JSON.parse(language === "json" ? nodesAsJSON : yaml2json(nodesAsJSON));
        let edgesConfig = edgesAsJSON //JSON.parse(language === "json" ? edgesAsJSON : yaml2json(edgesAsJSON));

        const out = {
            "globalDefaultsConfigs": globalDefaultsConfig,
            "nodesConfigs": nodesConfig,
            "edgesConfigs": edgesConfig
        };

        downloadJSONFile("simulationConfig.json", out);

    }

    return <>
        <Button variant={"warning"} onClick={handleExport}>Export</Button>
    </>

}

export default ExportSimulationConfig;
