import Ajv from "ajv";
//import {} from "ajv-errors";
import {GLOBAL_DEFAULT_KEY_VALUES} from "./editorUtil";

const ajv = new Ajv({allErrors: true});
require("ajv-errors")(ajv);

const arrowSchema = {
    type: "object",
    properties: {
        "type": {
            type: "string", pattern: "^(arrow)|(arrowclosed)$",
            errorMessage: createClearErrorMessage("object.type", "string", "^(arrow)|(arrowclosed)$")
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

const shapePattern = "^(8-star)|(big-star)|(circle)|(cylinder)|(diamond)|(hexagon)|(note)|(rectangle)|(square)|(star)|(triangle)|(comunica)|(rmlio)|(solid)$";

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
    // allOf: [
    //    {
    properties: {
        [GLOBAL_DEFAULT_KEY_VALUES.AUTO_LAYOUT.id]: {
            type: "boolean",
            errorMessage: {type: createClearErrorMessage(GLOBAL_DEFAULT_KEY_VALUES.AUTO_LAYOUT.id, "boolean")}
        },
        [GLOBAL_DEFAULT_KEY_VALUES.ORIENTATION.id]: {
            type: "string",
            pattern: "^(vertical)|(horizontal)$",
            errorMessage: {type: createClearErrorMessage(GLOBAL_DEFAULT_KEY_VALUES.ORIENTATION.id, "string", "^(vertical)|(horizontal)$")}
        },

        [GLOBAL_DEFAULT_KEY_VALUES.FILL.id]: {
            type: "string",
            errorMessage: {type: createClearErrorMessage(GLOBAL_DEFAULT_KEY_VALUES.FILL.id)}
        },
        [GLOBAL_DEFAULT_KEY_VALUES.FONTSIZE.id]: {
            type: "number",
            errorMessage: {type: createClearErrorMessage(GLOBAL_DEFAULT_KEY_VALUES.FONTSIZE.id, "number")}
        },
        [GLOBAL_DEFAULT_KEY_VALUES.SHAPE.id]: {
            type: "string",
            pattern: shapePattern,
            errorMessage: {type: createClearErrorMessage(GLOBAL_DEFAULT_KEY_VALUES.SHAPE.id, "string", shapePattern)}
        },
        [GLOBAL_DEFAULT_KEY_VALUES.STROKE.id]: {
            type: "string",
            errorMessage: {type: createClearErrorMessage(GLOBAL_DEFAULT_KEY_VALUES.STROKE.id, "string")}
        },
        [GLOBAL_DEFAULT_KEY_VALUES.STROKE_WIDTH.id]: {
            type: "number",
            errorMessage: {type: createClearErrorMessage(GLOBAL_DEFAULT_KEY_VALUES.STROKE_WIDTH.id, "number")}

        },
        [GLOBAL_DEFAULT_KEY_VALUES.WIDTH.id]: {
            type: "number",
            errorMessage: {type: createClearErrorMessage(GLOBAL_DEFAULT_KEY_VALUES.WIDTH.id, "number")}
        },
        [GLOBAL_DEFAULT_KEY_VALUES.HEIGHT.id]: {
            type: "number",
            errorMessage: {type: createClearErrorMessage(GLOBAL_DEFAULT_KEY_VALUES.HEIGHT.id, "number")}

        },

        [GLOBAL_DEFAULT_KEY_VALUES.ANIMATED.id]: {
            type: "boolean",
            errorMessage: {type: createClearErrorMessage(GLOBAL_DEFAULT_KEY_VALUES.ANIMATED.id, "boolean")}

        },
        [GLOBAL_DEFAULT_KEY_VALUES.ANIMATION.id]: {
            type: "string",
            errorMessage: {type: createClearErrorMessage(GLOBAL_DEFAULT_KEY_VALUES.ANIMATION.id, "string")}
        },
        [GLOBAL_DEFAULT_KEY_VALUES.EDGE_COLOR.id]: {
            type: "string",
            errorMessage: {type: createClearErrorMessage(GLOBAL_DEFAULT_KEY_VALUES.EDGE_COLOR.id, "string")}

        },
        [GLOBAL_DEFAULT_KEY_VALUES.EDGE_THICKNESS.id]: {
            type: "number",
            errorMessage: {type: createClearErrorMessage(GLOBAL_DEFAULT_KEY_VALUES.EDGE_THICKNESS.id, "number")}

        },
        [GLOBAL_DEFAULT_KEY_VALUES.STROKE_DASHARRAY.id]: {
            type: ["number", "string"],
            errorMessage: {type: createClearErrorMessage(GLOBAL_DEFAULT_KEY_VALUES.STROKE_DASHARRAY.id, "string")}

        },
        [GLOBAL_DEFAULT_KEY_VALUES.MARKER_END.id]: arrowSchema,
        [GLOBAL_DEFAULT_KEY_VALUES.MARKER_START.id]: arrowSchema,
        [GLOBAL_DEFAULT_KEY_VALUES.TYPE.id]: {
            type: "string",
            pattern: "^(default)|(step)|(smoothstep)|(straight)$",
            errorMessage: {type: createClearErrorMessage(GLOBAL_DEFAULT_KEY_VALUES.TYPE.id, "string", "^(default)|(step)|(smoothstep)|(straight)$")}

        },
    },
    //       additionalProperties: false
    //     }
    // ],


    /*errorMessage: {
        properties: {
            [GLOBAL_DEFAULT_KEY_VALUES.AUTO_LAYOUT.id]: createClearErrorMessage(GLOBAL_DEFAULT_KEY_VALUES.AUTO_LAYOUT.id),
            [GLOBAL_DEFAULT_KEY_VALUES.ORIENTATION.id]: createClearErrorMessage(GLOBAL_DEFAULT_KEY_VALUES.ORIENTATION.id),
            [GLOBAL_DEFAULT_KEY_VALUES.FILL.id] : createClearErrorMessage(GLOBAL_DEFAULT_KEY_VALUES.FILL.id),
            [GLOBAL_DEFAULT_KEY_VALUES.FONTSIZE.id]: createClearErrorMessage(GLOBAL_DEFAULT_KEY_VALUES.FONTSIZE.id)
        }
    }*/

}


export function validateJSON(data, schema, setError) {

    const validate = ajv.compile(schema);  // TODO: niet heel de tijd opnieuw doen, buiten deze functie zetten
    const valid = validate(data);
    if (!valid) {
        console.log("Schema is niet valid!!")
        setError(JSON.stringify(validate.errors, null, 2));
    }
}


let a = [{
    "instancePath": "/autoLayout",
    "schemaPath": "#/errorMessage",
    "keyword": "errorMessage",
    "params": {
        "errors": [{
            "instancePath": "/autoLayout",
            "schemaPath": "#/allOf/0/properties/autoLayout/type",
            "keyword": "type",
            "params": {"type": "boolean"},
            "message": "must be boolean",
            "emUsed": true
        }]
    },
    "message": "autoLayout moet een boolean zijn"
}]
