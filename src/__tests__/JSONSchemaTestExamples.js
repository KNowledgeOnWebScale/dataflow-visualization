import {edgeSchema, globalDefaultSchema, initSchemas, nodeSchema} from "../lib/schemaValidation";
import {examples as individualExamples} from "../data/single-flow/examples";
import {examples as simulationExamples} from "../data/simulation-flow/examples";

import Ajv from "ajv";

const ajv = new Ajv({allErrors: true});
require("ajv-errors")(ajv, /*{keepErrors: false}*/);


it('The individual examples are correct according to JSON schemas', () => {
    initSchemas();

    const validateGlobalDefault = ajv.compile(globalDefaultSchema);
    const validateNodes = ajv.compile(nodeSchema);
    const validateEdges = ajv.compile(edgeSchema);

    for (let example of individualExamples) {

        const globalDefaultExample = example[0];
        const nodesExample = example[1];
        const edgesExample = example[2];

        expect(validateGlobalDefault(globalDefaultExample)).toEqual(true)
        expect(validateNodes(nodesExample)).toEqual(true)
        expect(validateEdges(edgesExample)).toEqual(true)
    }

});

it('The simulation examples are correct according to JSON schemas', () => {
    initSchemas();

    const validateGlobalDefault = ajv.compile(globalDefaultSchema);
    const validateNodes = ajv.compile(nodeSchema);
    const validateEdges = ajv.compile(edgeSchema);

    for (let example of Object.keys(simulationExamples)) {

        for (let i = 0; i < Object.keys(simulationExamples[example]).length; i += 1) {
            let key = "step" + i;

            const globalDefaultExample = simulationExamples[example][key][0];
            const nodesExample = simulationExamples[example][key][1];
            const edgesExample = simulationExamples[example][key][2];

            expect(validateGlobalDefault(globalDefaultExample)).toEqual(true)
            expect(validateNodes(nodesExample)).toEqual(true)
            expect(validateEdges(edgesExample)).toEqual(true)
        }

    }

});
