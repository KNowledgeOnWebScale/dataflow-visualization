import Ajv from "ajv";
//import {} from "ajv-errors";
import {
    EDGE_KEYS_NO_CSS_PROPERTY,
    EDGE_KEYS_WITH_CSS_PROPERTY,
    GLOBAL_DEFAULT_KEY_VALUES,
    NODE_KEYS
} from "./editorUtil";

const ajv = new Ajv({allErrors: true});
require("ajv-errors")(ajv);

const arrowSchema = {
    type: "object",
    properties: {
        "type": {
            type: "string", pattern: "^(arrow)$|^(arrowclosed)$",
            errorMessage: createClearErrorMessage("object.type", "string", "^(arrow)$|^(arrowclosed)$")
        },
        "orient": {
            type: ["string", "number"],
            errorMessage: createClearErrorMessage("object.orient", ["number", "string"])
        },
        "color": {
            type: "string",
            errorMessage: createClearErrorMessage("object.color", "string")
        }
    }
}

const positionSchema = {
    type: "object",
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

function createClearErrorMessage(id, type, pattern) {
    let out = [id, "must be"];

    //  let type = globalDefaultSchema.properties.id.type;  //
    //  let pattern = globalDefaultSchema.properties.id.pattern;

    if (Array.isArray(type) && type.length > 0) {
        out.push(type[0]);
        for (let i = 1; i < type.length; i += 1) {
            out.push(`or ${type[i]}`);
        }
    } else {
        out.push(type);
    }

    if (pattern) {
        out.push(`with pattern: ${pattern}`);
    }

    return out.join(" ");
}

// Custom error messages -->  https://github.com/ajv-validator/ajv-errors


export const globalDefaultSchema = {
    type: "object",
    properties: {},
    errorMessage: {
        properties: {},
        type: "Global settings are expected to be initialized in an object"
    }
}


export const nodeSchema = {
    type: "array",
    items:
        {
            type: "object",
            properties: {},
            errorMessage: {
                type: "Each node should be an object",
            }
        },
    errorMessage: {
        type: "Nodes are expected to be objects in an array"
    },
}


export const edgeSchema = {
    type: "array",
    items:
        {
            type: "object",
            required: [],
            properties: {},
            errorMessage: {
                type: "Each edge should be an object",
            }
        },
    errorMessage: {
        type: "Edges are expected to be objects in an array"
    },
}


initGlobalDefaultsSchema();
initNodesSchema();
initEdgesSchema();


function initGlobalDefaultsSchema() {
    for (let value of Object.values(GLOBAL_DEFAULT_KEY_VALUES)) {

        if (value.type === "object") {
            continue;
        }

        globalDefaultSchema.properties[value.id] = {
            type: value.type,
            pattern: value.pattern,
            //errorMessage: {
            //   type: createClearErrorMessage(value.id, value.type, value.pattern)
            //}
        }

        globalDefaultSchema.errorMessage.properties[value.id] = createClearErrorMessage(value.id, value.type, value.pattern);

    }

    //TODO: moet beter
    globalDefaultSchema.properties[GLOBAL_DEFAULT_KEY_VALUES.MARKER_START.id] = arrowSchema;
    globalDefaultSchema.properties[GLOBAL_DEFAULT_KEY_VALUES.MARKER_END.id] = arrowSchema;
}

function initNodesSchema() {
    for (let value of Object.values(NODE_KEYS)) {

        if (value.type === "object") {
            continue;
        }

        nodeSchema.items.properties[value.id] = {
            type: value.type,
            pattern: value.pattern,
            // In global defaults, the errorMessages are not put inside properties
            // But here it must be inside properties in order to work
            errorMessage: {
                type: createClearErrorMessage(value.id, value.type, value.pattern)
            }
        }

        // TODO
        //  BUG: can't control error message for an invalid pattern for shape
        //  In global defaults, that was fixed by not putting errorMessage inside properties, but for some reason that doesn't seem to work here
        // nodeSchema.items.errorMessage[value.id] = createClearErrorMessage(value.id, value.type, value.pattern);
        // nodeSchema.errorMessage[value.id] = createClearErrorMessage(value.id, value.type, value.pattern);
    }
    nodeSchema.items.properties[NODE_KEYS.POSITION.id] = positionSchema;

}

function initEdgesSchema() {
    for (let value of [...Object.values(EDGE_KEYS_NO_CSS_PROPERTY), ...Object.values(EDGE_KEYS_WITH_CSS_PROPERTY)]) {

        if (value.required) {
            edgeSchema.items.required.push(value.id);
        }


        if (value.type === "object") {
            continue;
        }

        edgeSchema.items.properties[value.id] = {
            type: value.type,
            pattern: value.pattern,
            // In global defaults, the errorMessages are not put inside properties
            // But here it must be inside properties in order to work
            errorMessage: {
                type: createClearErrorMessage(value.id, value.type, value.pattern)
            }
        }

        // TODO
        //  BUG: can't control error message for an invalid pattern for edges with a pattern
        //  In global defaults, that was fixed by not putting errorMessage inside properties, but for some reason that doesn't seem to work here
        // edgeSchema.items.errorMessage[value.id] = createClearErrorMessage(value.id, value.type, value.pattern);
        // edgeSchema.errorMessage[value.id] = createClearErrorMessage(value.id, value.type, value.pattern);
    }
    nodeSchema.items.properties[NODE_KEYS.POSITION.id] = positionSchema;
}


export function validateJSON(data, schema, setError) {

    const validate = ajv.compile(schema);  // TODO: niet heel de tijd opnieuw doen, buiten deze functie zetten
    const valid = validate(data);
    if (!valid) {
        let errMsg = validate.errors.map(e => e["message"] || JSON.stringify(e, null, 2))
        if (errMsg) {
            setError(errMsg);
        }
    }
}

