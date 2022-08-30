// Imports from example1/
import {
    edgesJSON as edgesJSON_step0_ex1,
    globalDefaultsJSON as globalDefaultsJSON_step0_ex1,
    nodesJSON as nodesJSON_step0_ex1
} from "./examples/example1/step0"

import {
    edgesJSON as edgesJSON_step1_ex1,
    globalDefaultsJSON as globalDefaultsJSON_step1_ex1,
    nodesJSON as nodesJSON_step1_ex1
} from "./examples/example1/step1"

import {
    edgesJSON as edgesJSON_step2_ex1,
    globalDefaultsJSON as globalDefaultsJSON_step2_ex1,
    nodesJSON as nodesJSON_step2_ex1
} from "./examples/example1/step2"

import {
    edgesJSON as edgesJSON_step3_ex1,
    globalDefaultsJSON as globalDefaultsJSON_step3_ex1,
    nodesJSON as nodesJSON_step3_ex1
} from "./examples/example1/step3"

import {
    edgesJSON as edgesJSON_step4_ex1,
    globalDefaultsJSON as globalDefaultsJSON_step4_ex1,
    nodesJSON as nodesJSON_step4_ex1
} from "./examples/example1/step4"


export const examples = {
    "example 1": {
        step0: [globalDefaultsJSON_step0_ex1, nodesJSON_step0_ex1, edgesJSON_step0_ex1],
        step1: [globalDefaultsJSON_step1_ex1, nodesJSON_step1_ex1, edgesJSON_step1_ex1],
        step2: [globalDefaultsJSON_step2_ex1, nodesJSON_step2_ex1, edgesJSON_step2_ex1],
        step3: [globalDefaultsJSON_step3_ex1, nodesJSON_step3_ex1, edgesJSON_step3_ex1],
        step4: [globalDefaultsJSON_step4_ex1, nodesJSON_step4_ex1, edgesJSON_step4_ex1]
    }
}

