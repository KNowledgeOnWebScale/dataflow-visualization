import Dropdown from "react-bootstrap/Dropdown";
import {json2yaml, yaml2json} from "./jsonYamlUtil";

const LanguageSwitcher = ({language, setLanguage, setData, globalDefaults, nodesData, edgesData}) => {

    function changeLanguage(eventKey) {
        const newLang = eventKey;


        if (newLang === "yaml" && language === "json") {
            setData(
                json2yaml(globalDefaults),
                json2yaml(nodesData),
                json2yaml(edgesData)
            );
            setLanguage(eventKey);
        } else if (newLang === "json" && language === "yaml") {
            setData(
                yaml2json(globalDefaults),
                yaml2json(nodesData),
                yaml2json(edgesData)
            );
            setLanguage(eventKey);
        }

    }

    return <>
        <Dropdown onSelect={changeLanguage}>
            <Dropdown.Toggle variant="warning" id="dropdown-basic">
                Language: {language.toUpperCase()}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item eventKey="json" active>JSON</Dropdown.Item>
                <Dropdown.Item eventKey="yaml">YAML</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    </>

}

export default LanguageSwitcher;
