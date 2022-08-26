import {edgeSchema, globalDefaultSchema, initSchemas, nodeSchema} from "../lib/schemaValidation";
import {examples} from "../data/examples";

import Ajv from "ajv";

const ajv = new Ajv({allErrors: true});
require("ajv-errors")(ajv, /*{keepErrors: false}*/);


it('The examples are correct according to JSON schemas', () => {
    initSchemas();

    const validateGlobalDefault = ajv.compile(globalDefaultSchema);
    const validateNodes = ajv.compile(nodeSchema);
    const validateEdges = ajv.compile(edgeSchema);

    for (let example of examples) {

        const globalDefaultExample = example[0];
        const nodesExample = example[1];
        const edgesExample = example[2];

        expect(validateGlobalDefault(globalDefaultExample)).toEqual(true)
        expect(validateNodes(nodesExample)).toEqual(true)
        expect(validateEdges(edgesExample)).toEqual(true)
    }

});
