import YAML from "js-yaml";

export function json2yaml(jsonData) {
    let yamlValue;
    try {
        yamlValue = YAML.dump(JSON.parse(jsonData));
        return yamlValue;
    } catch (e) {
        return e;
    }
}

export function yaml2json(yamlData) {

    let jsonValue;
    try {
        jsonValue = JSON.stringify(YAML.load(yamlData.toString()), null, "\t");
        return jsonValue;
    } catch (e) {
        return e;
    }
}
