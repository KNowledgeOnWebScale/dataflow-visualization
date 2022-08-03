import Ajv from "ajv";
//import {} from "ajv-errors";
import {GLOBAL_DEFAULT_KEY_VALUES} from "./editorUtil";

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
        out.push(`. With pattern: ${pattern}`);
    }

    return out.join(" ");
}

// Custom error messages -->  https://github.com/ajv-validator/ajv-errors


// TODO: this is very very VERY bad code
//  FIX IT


export const globalDefaultSchema = {
    type: "object",
    properties: {}
}

export const nodeSchema = {

}


export const edgeSchema = {

}

initGlobalDefaultSchema();

function initGlobalDefaultSchema() {
    for (let value of Object.values(GLOBAL_DEFAULT_KEY_VALUES)) {

        if (value.type === "object") {
            continue;
        }

        globalDefaultSchema.properties[value.id] = {
            type: value.type,
            pattern: value.pattern,
            errorMessage: {
                type: createClearErrorMessage(value.id, value.type, value.pattern)
            }
        }

    }

    globalDefaultSchema.properties[GLOBAL_DEFAULT_KEY_VALUES.MARKER_START.id] = arrowSchema;
    globalDefaultSchema.properties[GLOBAL_DEFAULT_KEY_VALUES.MARKER_END.id] = arrowSchema;
}


function stripQuotationMarks(string) {
    return string.replace(/^"+|"+$/)
}

export function validateJSON(data, schema, setError) {

    const validate = ajv.compile(schema);  // TODO: niet heel de tijd opnieuw doen, buiten deze functie zetten
    const valid = validate(data);
    if (!valid) {
        console.log(validate.errors)

        let errMsg = validate.errors.map(e => e["message"] || JSON.stringify(e, null, 2))

        //let errMessage =validate.errors[0]["message"] || JSON.stringify(validate.errors, null, 2);
        //setError(errMsg.join("\n   ; {\n} <br>  \n"));  // somehow, newline does not work
        setError(errMsg)
    }
}

