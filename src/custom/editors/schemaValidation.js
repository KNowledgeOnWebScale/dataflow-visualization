import Ajv from "ajv";
//import {} from "ajv-errors";
import {
    EDGE_KEYS_NO_CSS_PROPERTY,
    EDGE_KEYS_WITH_CSS_PROPERTY,
    GLOBAL_DEFAULT_KEY_VALUES,
    NODE_KEYS
} from "./editorUtil";

const ajv = new Ajv({allErrors: true});
require("ajv-errors")(ajv, /*{keepErrors: false}*/);

const arrowSchema = {
    type: "object",
    properties: {
        "type": {
            type: "string", enum: ["arrow", "arrowclosed"],
            errorMessage: createClearErrorMessage("Type of arrow", "string", ["arrow", "arrowclosed"])
        },
        "orient": {
            type: ["string", "number"],
            errorMessage: createClearErrorMessage("Orient of arrow", ["number", "string"])
        },
        "color": {
            type: "string",
            errorMessage: createClearErrorMessage("Color of arrow", "string")
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

        for (let i = 1; i < patternEnum.length-1; i+=1) {
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
                properties: {}
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
                type: "Each edge should be an object",properties: {}
            }
        },
    errorMessage: {
        type: "Edges are expected to be objects in an array"//, properties:{}
    },
}


initGlobalDefaultsSchema();
initNodesSchema();
initEdgesSchema();

//console.log(nodeSchema)




function initGlobalDefaultsSchema() {
    for (let value of Object.values(GLOBAL_DEFAULT_KEY_VALUES)) {

        if (value.type === "object") {
            continue;
        }

        globalDefaultSchema.properties[value.id] = {
            type: value.type,
            enum: value.enum,

            //errorMessage: {
              // type: createClearErrorMessage(value.id, value.type, value.pattern)
            //}
        }

        globalDefaultSchema.errorMessage.properties[value.id] = createClearErrorMessage(value.id, value.type, value.enum);

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

            enum: value.enum,

            // In global defaults, the errorMessages are not put inside properties
            // But here it must be inside properties in order to work

            errorMessage: {
                type: createClearErrorMessage(value.id, value.type, value.enum)
            }
        }

        // TODO
        //  BUG: can't control error message for an invalid pattern for shape
        //  In global defaults, that was fixed by not putting errorMessage inside properties, but for some reason that doesn't seem to work here

         //nodeSchema.items.errorMessage.properties[value.id] = createClearErrorMessage(value.id, value.type, value.pattern);
         //nodeSchema.errorMessage.properties[value.id] = createClearErrorMessage(value.id, value.type, value.pattern);
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

            enum: value.enum,

            // In global defaults, the errorMessages are not put inside properties
            // But here it must be inside properties in order to work
            errorMessage: {
                type: createClearErrorMessage(value.id, value.type, value.enum)
            }
        }

        // TODO
        //  BUG: can't control error message for an invalid pattern for edges with a pattern
        //  In global defaults, that was fixed by not putting errorMessage inside properties, but for some reason that doesn't seem to work here
        // edgeSchema.items.errorMessage.properties[value.id] = createClearErrorMessage(value.id, value.type, value.pattern);
        // edgeSchema.errorMessage.properties[value.id] = createClearErrorMessage(value.id, value.type, value.pattern);
    }
    nodeSchema.items.properties[NODE_KEYS.POSITION.id] = positionSchema;
}


export function validateJSON(data, schema, setError) {

    const validate = ajv.compile(schema);  // TODO: niet heel de tijd opnieuw doen, buiten deze functie zetten, mss in hashmap
    const valid = validate(data);
    if (!valid) {
        console.log(validate.errors)
        let errMsg = validate.errors.map(e => e["message"] || JSON.stringify(e, null, 2))
        if (errMsg) {
            setError(errMsg);
        }
    }
}

