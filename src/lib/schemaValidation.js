import Ajv from "ajv";
//import {} from "ajv-errors";
import {EDGE, KEY_VALUES, NODE} from "./configParsing";

const ajv = new Ajv({allErrors: true});
require("ajv-errors")(ajv, /*{keepErrors: false}*/);

const arrowSchema = {
    type: "object",
    title: "Arrowhead schema",
    /*$id: "arrowSchema",*/
    properties: {
        "type": {
            type: "string", enum: ["arrow", "arrowclosed"],
            description: "Set the type of the arrowhead.",
            errorMessage: createClearErrorMessage("Type of arrow", "string", ["arrow", "arrowclosed"])
        },
        "orient": {
            type: ["string", "number"],
            description: "Set the orient of the arrowhead. See [the MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/orient) for more information.",
            errorMessage: createClearErrorMessage("Orient of arrow", ["number", "string"])
        },
        "color": {
            type: "string",
            description: "Set the color of the arrowhead. If you do not specify a color, the color of the arrowhead will be the same as the color of the edge.",
            errorMessage: createClearErrorMessage("Color of arrow", "string")
        },
        "size": {
            type: "number",
            description: "Set the size of the arrowhead.",
            errorMessage: createClearErrorMessage("Width of arrow", "integer")
        }
    }
}

const positionSchema = {
    type: "object",
    title: "Position schema",
    $id: "positionSchema",
    properties: {
        "x": {
            type: "number",
            errorMessage: createClearErrorMessage("object.x", "number")
        },
        "y": {
            type: ["number"],
            errorMessage: createClearErrorMessage("object.y", "number")
        }
    }
}

function createClearErrorMessage(id, type, patternEnum) {
    let out = [id, "must be"];

    if (Array.isArray(type) && type.length > 0) {
        out.push(type[0]);
        for (let i = 1; i < type.length; i += 1) {
            out.push(`or ${type[i]}`);
        }
    } else {
        out.push(type);
    }

    if (patternEnum) {
        out.push(`with possible values: ${patternEnum[0]}`);

        for (let i = 1; i < patternEnum.length - 1; i += 1) {
            out.push(`, ${patternEnum[i]}`)
        }

        if (patternEnum.length > 1) {
            out.push(` or ${patternEnum.slice(-1)}`);
        }
    }

    return out.join(" ");
}

// Custom error messages -->  https://github.com/ajv-validator/ajv-errors


export const globalDefaultSchema = {
    type: "object",
    title: "Global defaults",
    description: "This schema is to define the properties inside the global defaults config.",
    $id: "globalDefaultSchema",
    properties: {},
    errorMessage: {
        properties: {},
        type: "Global settings are expected to be initialized in an object"
    }
}


export const nodeSchema = {
    type: "array",
    title: "Array of nodes",
    $id: "nodeSchema",
    items:
        {
            type: "object",
            title: "Node",
            required: [],
            properties: {},
            errorMessage: {
                type: "Each node should be an object",
                properties: {}
            }
        },
    errorMessage: {
        type: "Nodes are expected to be objects in an array"
    },
}


export const edgeSchema = {
    type: "array",
    title: "Array of edges",
    $id: "edgeSchema",
    items:
        {
            type: "object",
            title: "Edge",
            required: [],
            properties: {},
            errorMessage: {
                type: "Each edge should be an object", properties: {}
            }
        },
    errorMessage: {
        type: "Edges are expected to be objects in an array"//, properties:{}
    },
}


// This function is called once, in index.js
export function initSchemas() {

    initGlobalDefaultsSchema();
    initNodesSchema();
    initEdgesSchema();
}


/*export function getMonacoSchemas(models, uris) {
    if ("GLOBAL_DEFAULT" in models && "GLOBAL_DEFAULT" in uris && "NODES" in models && "NODES" in uris && "EDGES" in models && "EDGES" in uris) {
        console.warn("Necessary are not present!!!")
    }

    return [
        {
            uri: uris["GLOBAL_DEFAULT"],
            fileMatch: [models["GLOBAL_DEFAULT"].toString()],
            schema: globalDefaultSchema
        },
        {
            uri: uris["NODES"],
            fileMatch: [models["NODES"].toString()],
            schema: globalDefaultSchema
        },
        {
            uri: uris["EDGES"],
            fileMatch: [models["EDGES"].toString()],
            schema: globalDefaultSchema
        }
    ]

}*/


function globalDefaultNestedKey(key) {
    const nestedObj = {
        type: "object",
        title: key,
        description: key + " in global defaults",
        $id: "globalDefaults" + key.charAt(0).toUpperCase() + key.toLowerCase().slice(1),
        properties: {}
    }

    for (let value of Object.values(KEY_VALUES[key])) {

        if (value.type === "object" || !value.canBeGlobal) {
            continue;
        }

        nestedObj["properties"][value.id] = {
            type: value.type,
            enum: value.enum,
            examples: value.examples,
            description: value.description,
            default: value.value,
            errorMessage: {
                type: createClearErrorMessage(value.id, value.type, value.enum)
            }
        }
    }

    globalDefaultSchema.properties[key] = nestedObj;
}


function initGlobalDefaultsSchema() {

    for (let key in KEY_VALUES) {
        globalDefaultNestedKey(key)
    }

    const nestedNodesSchema = JSON.parse(JSON.stringify(globalDefaultSchema.properties[NODE]));
    nestedNodesSchema["$id"] = "presetNestedNode"

    //console.log(nestedNodesSchema)

    globalDefaultSchema.properties[NODE].properties[KEY_VALUES[NODE].PRESETS.id] = {
        type: "object",
        description: KEY_VALUES[NODE].PRESETS.description,
        additionalProperties: nestedNodesSchema
    }

    //console.log(globalDefaultSchema)

    globalDefaultSchema.properties[EDGE]["properties"][KEY_VALUES[EDGE].MARKER_START.id] = arrowSchema
    globalDefaultSchema.properties[EDGE]["properties"][KEY_VALUES[EDGE].MARKER_END.id] = arrowSchema


    const nestedEdgesSchema = JSON.parse(JSON.stringify(globalDefaultSchema.properties[EDGE]));
    nestedEdgesSchema["$id"] = "presetNestedEdge"
    globalDefaultSchema.properties[EDGE].properties[KEY_VALUES[EDGE].PRESETS.id] = {
        type: "object",
        description: KEY_VALUES[EDGE].PRESETS.description,
        additionalProperties: nestedEdgesSchema
    }


}


function setSchemaEntryNodesEdges(schema, values) {

    for (let value of values) {

        if (value.type === "object") {
            continue;
        }

        if (value.required) {
            schema.items.required.push(value.id);
        }

        if (value.type === "array") {

            schema.items.properties[value.id] = {
                type: "array",
                items: {
                    type: value["arrayType"] || "string",
                    enum: value.enum,
                    examples: value.examples,
                },
                description: value.description,
                default: value.default
            }

        } else {
            schema.items.properties[value.id] = {
                type: value.type,
                enum: value.enum,
                examples: value.examples,
                description: value.description,
                default: value.value,

                // In global defaults, the errorMessages are not put inside properties
                // But here it must be inside properties in order to work

                errorMessage: {
                    type: createClearErrorMessage(value.id, value.type, value.enum)
                }
            }
        }
    }
}


function initNodesSchema() {
    const NODE_KEYS = KEY_VALUES[NODE];

    setSchemaEntryNodesEdges(nodeSchema, Object.values(NODE_KEYS));

    nodeSchema.items.properties[NODE_KEYS.POSITION.id] = positionSchema;

}


function initEdgesSchema() {
    const EDGE_KEYS = KEY_VALUES[EDGE];

    setSchemaEntryNodesEdges(edgeSchema, Object.values(EDGE_KEYS));

    edgeSchema.items.properties[KEY_VALUES[EDGE].MARKER_START.id] = arrowSchema;
    edgeSchema.items.properties[KEY_VALUES[EDGE].MARKER_END.id] = arrowSchema;

}


export function validateJSON(data, schema, setError) {

    const validate = ajv.compile(schema);
    const valid = validate(data);
    if (!valid) {
        console.log(validate.errors)
        let errMsg = validate.errors.map(e => e["message"] || JSON.stringify(e, null, 2))
        if (errMsg) {
            setError(errMsg);
        }
    }
}

