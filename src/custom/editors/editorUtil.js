// These are the keys that can be used in globalDefaults
// These keys are not standard supported by the library, that's why they are in a dict
// The values of this dict should be used in the JSON representation
import {fixNodeGroups} from "./editorUtilPositioning";

// TODO I have the feeling you should either have a 'constants.js' file, or rename this 'editorUtil.js' to 'configParsing.js' or smth
export const GLOBAL_DEFAULT_KEY_VALUES = {
    "ANIMATED": {id: "animated", value: false, type: "boolean"},              // Standard animation supported by React Flow
    "ANIMATION": {id: "animation", type: "string"},          // Custom animation
    "TYPE": {id: "type", value: "default", type: "string", enum: ["default", "step", "smoothstep", "straight"]},                 // Type of edge (default, step, smoothstep, straight)
    "EDGE_COLOR": {id: "edgeColor", value: "black", type: "string"},        // Color of edge
    "EDGE_THICKNESS": {id: "edgeThickness", value: 1.2, type: "number"},    // Thickness of edge
    "MARKER_END": {id: "markerEnd", value: {}, type: "object"},             // Marker at end of the edge
    "MARKER_START": {id: "markerStart", value: {}, type: "object"}, //TODO  hoe object fixen?       // Marker at beginning of the edge
    "STROKE_DASHARRAY": {id: "strokeDasharray", value: 0, type: ["number", "string"]},  // The stroke dasharray of the edges


    "FILL": {id: "fill", value: "white", type: "string"},                 // Color of node
    "FONTSIZE": {id: "fontsize", value: 12, type: "number"},              // Fontsize of text in nodes TODO: fontsize op edges???

    //TODO in readme uitleggen dat je ook het pattern moet aanpassen
    "SHAPE": {
        id: "shape",
        value: "square",
        type: "string",
        enum: ["8-star", "big-star", "circle", "cylinder", "diamond", "hexagon", "note", "rectangle", "square", "star", "triangle", "comunica", "rmlio", "solid"],
    },              // Shape of node
    "STROKE": {id: "stroke", value: "black", type: "string"},             // Color of stroke of node
    "STROKE_WIDTH": {id: "strokeWidth", value: 1, type: "number"},        // Width of stroke of node
    "HEIGHT": {id: "height", value: 50, type: "number"},                  // Height of node
    "WIDTH": {id: "width", value: 50, type: "number"},                    // Width of node

    "AUTO_LAYOUT": {id: "autoLayout", value: false, type: "boolean"},
    "ORIENTATION": {id: "orientation", value: "horizontal", type: "string",
        enum: ["vertical", "horizontal"]}


};

// Keys, not supported by the library, that can be used in the JSON representation of nodes
export const NODE_KEYS = {
    ID: {id: "id", type: "string"},
    POSITION: {id: "position", type: "object"},
    Z_INDEX: {id: "zIndex", type: "number"},

    // TODO: eignl ook regex (comunica, solid, rmlio),
    //  mss een aparte map maken voor images en dan de content van die dir opvragen om niet meer namen te moeten hardcoden
    IMAGE: {id: "image", type: "string"},
    LABEL: {id: "label", type: "string"},
    TITLE: {id: "title", type: "string"},

    PARENT: {id: "parentNode", type: "string"},  // TODO nog fixen of dat dit wel een bestaande id is

    //TODO: vgroup, hgroup

    "FILL": {"id": GLOBAL_DEFAULT_KEY_VALUES.FILL.id, "type": GLOBAL_DEFAULT_KEY_VALUES.FILL.type},
    "FONTSIZE": {"id": GLOBAL_DEFAULT_KEY_VALUES.FONTSIZE.id, "type": GLOBAL_DEFAULT_KEY_VALUES.FONTSIZE.type},
    "SHAPE": {
        "id": GLOBAL_DEFAULT_KEY_VALUES.SHAPE.id,
        "type": GLOBAL_DEFAULT_KEY_VALUES.SHAPE.type,
        "enum":  GLOBAL_DEFAULT_KEY_VALUES.SHAPE.enum
    },
    "STROKE": {"id": GLOBAL_DEFAULT_KEY_VALUES.STROKE.id, "type": GLOBAL_DEFAULT_KEY_VALUES.STROKE.type},
    "STROKE_WIDTH": {
        "id": GLOBAL_DEFAULT_KEY_VALUES.STROKE_WIDTH.id,
        "type": GLOBAL_DEFAULT_KEY_VALUES.STROKE_WIDTH.type
    },
    "HEIGHT": {"id": GLOBAL_DEFAULT_KEY_VALUES.HEIGHT.id, "type": GLOBAL_DEFAULT_KEY_VALUES.HEIGHT.type},
    "WIDTH": {"id": GLOBAL_DEFAULT_KEY_VALUES.WIDTH.id, "type": GLOBAL_DEFAULT_KEY_VALUES.WIDTH.type},
};

// Keys, not supported by the library, that can be used in the JSON representation of edges
// Some things can also be done with css, that is why there are two hashmaps
export const EDGE_KEYS_WITH_CSS_PROPERTY = {
    "ANIMATION": {
        "id": GLOBAL_DEFAULT_KEY_VALUES.ANIMATION.id,
        "type": GLOBAL_DEFAULT_KEY_VALUES.ANIMATION.type,
        "cssProperty": "animation"
    },
    "EDGE_COLOR": {
        "id": GLOBAL_DEFAULT_KEY_VALUES.EDGE_COLOR.id,
        "type": GLOBAL_DEFAULT_KEY_VALUES.EDGE_COLOR.type,
        "cssProperty": "stroke"
    },
    "EDGE_THICKNESS": {
        "id": GLOBAL_DEFAULT_KEY_VALUES.EDGE_THICKNESS.id,
        "type": GLOBAL_DEFAULT_KEY_VALUES.EDGE_THICKNESS.type,
        "cssProperty": "strokeWidth"
    },
    "STROKE_DASHARRAY": {
        "id": GLOBAL_DEFAULT_KEY_VALUES.STROKE_DASHARRAY.id,
        "type": GLOBAL_DEFAULT_KEY_VALUES.STROKE_DASHARRAY.type,
        "cssProperty": "strokeDasharray"
    }
};

export const EDGE_KEYS_NO_CSS_PROPERTY = {
    "SOURCE": {id: "source", type: "string", required: true},
    "TARGET": {id: "target", type: "string", required: true},
    "Z_INDEX": {id: "zIndex", type: "number"},
    "LABEL": {id: "label", type: "string"},
    "SOURCE_HANDLE": {
        id: "sourceHandle",
        type: "string",
        enum: ["left-source", "right-source", "top-source", "bottom-source"]
    },
    "TARGET_HANDLE": {
        id: "targetHandle",
        type: "string",
        enum: ["left-target", "right-target", "top-target", "bottom-target"]
    },

    "ANIMATED": {
        "id": GLOBAL_DEFAULT_KEY_VALUES.ANIMATED.id,
        "type": GLOBAL_DEFAULT_KEY_VALUES.ANIMATED.TYPE,
        "canBeGlobal": true
    },
    "TYPE": {
        "id": GLOBAL_DEFAULT_KEY_VALUES.TYPE.id,
        "type": GLOBAL_DEFAULT_KEY_VALUES.TYPE.type,
        "enum": GLOBAL_DEFAULT_KEY_VALUES.TYPE.enum,
        "canBeGlobal": true
    },
    "MARKER_END": {
        "id": GLOBAL_DEFAULT_KEY_VALUES.MARKER_END.id,
        "type": GLOBAL_DEFAULT_KEY_VALUES.MARKER_END.type,
        "canBeGlobal": true
    },
    "MARKER_START": {
        "id": GLOBAL_DEFAULT_KEY_VALUES.MARKER_START.id,
        "type": GLOBAL_DEFAULT_KEY_VALUES.MARKER_START.type,
        "canBeGlobal": true
    }
}


export function parseGlobalDefaults(globalDefaults) {

    for (let key in GLOBAL_DEFAULT_KEY_VALUES) {
        let valueObject = GLOBAL_DEFAULT_KEY_VALUES[key];
        if (!globalDefaults.hasOwnProperty(valueObject.id)) {
            globalDefaults[valueObject.id] = valueObject.value;
        }
    }

    return globalDefaults;
}


export function parseNodes(globalDefaults, nodes) {


    for (let node of nodes) {

        // Each node needs to have an id
        if (!node.hasOwnProperty('id')) {
            // If the node is the only one with its title that does not have an ID, the title becomes the id
            // If the node is the only one with its label that does not have an ID, the label becomes the id
            // If the node does not have a label and the shape is unique among the nodes with no id's, the shape becomes the id
            // If the node does not have an id, label or shape, we look if the image is unique

            const titleId = NODE_KEYS.TITLE.id;
            const labelId = NODE_KEYS.LABEL.id;
            const shapeId = NODE_KEYS.SHAPE.id;
            const imageId = NODE_KEYS.IMAGE.id;

            function checkForPossibleId(key) {
                if (node.hasOwnProperty(key)) {
                    //let hits = nodes.filter(n => !(n.hasOwnProperty("id") || n["id"] !== key) && n.hasOwnProperty(key) && n[key] === node[key]);
                    let hits = nodes.filter(n => (n.hasOwnProperty("id") && n["id"] === node[key]) || (n.hasOwnProperty(key) && n[key] === node[key]));


                    if (hits.length === 1) {
                        node["id"] = node[key];
                        return true;
                    }

                }
                return false;
            }

            if (!checkForPossibleId(titleId)) {
                if (!checkForPossibleId(labelId)) {
                    if (!checkForPossibleId(shapeId)) {
                        if (!checkForPossibleId(imageId)) {
                            node["id"] = "" + Math.random();
                        }
                    }
                }
            }

        }

        node.type = "custom";

        // The values of NODE_KEYS should come in a data object, which will be passed to SvgNode
        let data = {};

        if (node.hasOwnProperty(NODE_KEYS.IMAGE.id) && !node.hasOwnProperty(GLOBAL_DEFAULT_KEY_VALUES.STROKE.id)) {
            // Standard behaviour is no border around image
            node[GLOBAL_DEFAULT_KEY_VALUES.STROKE.id] = "none";
        }


        for (let key in NODE_KEYS) {
            let value = NODE_KEYS[key]["id"]
            data[value] = node[value];
            if (!node.hasOwnProperty(value) && globalDefaults.hasOwnProperty(value)) {
                data[value] = globalDefaults[value];
            }
        }

        node["data"] = data;

        // There must be a position with keys x and y
        if (node.hasOwnProperty('position') && !node["position"].hasOwnProperty('x')) {
            node["position"]["x"] = 0;
        }
        if (node.hasOwnProperty('position') && !node["position"].hasOwnProperty('y')) {
            node["position"]["y"] = 0;
        } else if (!node.hasOwnProperty('position')) {
            node["position"] = {x: 0, y: 0};
        }

    }
    fixNodeGroups(nodes);

    return nodes;
}


export function parseEdges(globalDefaults, edges, nodes) {


    for (let edge of edges) {

        if (!edge.hasOwnProperty("style")) {
            edge["style"] = {};
        }

        for (let key in EDGE_KEYS_WITH_CSS_PROPERTY) {
            let value = EDGE_KEYS_WITH_CSS_PROPERTY[key];

            // Reason for if statement:
            //  you can also set edgeColor via css with stroke, let's not overwrite that when that happens
            if (!edge["style"].hasOwnProperty(value.cssProperty)) {
                edge["style"][value.cssProperty] = edge[value.id] || globalDefaults[value.id];
            }
        }

        for (let key in EDGE_KEYS_NO_CSS_PROPERTY) {
            if (!EDGE_KEYS_NO_CSS_PROPERTY[key]["canBeGlobal"]) {
                continue;
            }

            let value = EDGE_KEYS_NO_CSS_PROPERTY[key]["id"];

            if (!edge.hasOwnProperty(value)) {
                if (typeof globalDefaults[value] === 'object') {
                    edge[value] = {...globalDefaults[value]};  // Deep copy, because e.g. markerStart does not have to be the same everywhere
                } else {
                    edge[value] = globalDefaults[value];
                }
            }

        }

        // markerStart will not be oriented correctly
        if (!edge[EDGE_KEYS_NO_CSS_PROPERTY.MARKER_START.id].hasOwnProperty("orient")) {
            edge[EDGE_KEYS_NO_CSS_PROPERTY.MARKER_START.id]["orient"] = "auto-start-reverse";
        }

        // If edge has markerEnd and/or markerStart with no color set, set the color to the color of the edge
        if (!edge[EDGE_KEYS_NO_CSS_PROPERTY.MARKER_END.id].hasOwnProperty("color")) {
            edge[EDGE_KEYS_NO_CSS_PROPERTY.MARKER_END.id]["color"] = edge["style"]["stroke"];
        }
        if (!edge[EDGE_KEYS_NO_CSS_PROPERTY.MARKER_START.id].hasOwnProperty("color")) {
            edge[EDGE_KEYS_NO_CSS_PROPERTY.MARKER_START.id]["color"] = edge["style"]["stroke"];
        }

        // the key animated is something that is supported by the library, but it is overwritten by the standard value of strokeDasharray
        // If the user sets animated to true, but sets no strokDasharray, the edge should still be animated
        if (edge.hasOwnProperty("animated") && edge["animated"] === true && edge["style"]["strokeDasharray"] === GLOBAL_DEFAULT_KEY_VALUES.STROKE_DASHARRAY.value) {
            edge["style"]["strokeDasharray"] = "5";
        }


        // If the edge has no zIndex and connects 2 nodes that are in the same parent, set the zIndex of the edge to 1
        if (!edge.hasOwnProperty("zIndex")) {
            const [srcNode, targetNode] = getSourceNode_targetNode_fromId(edge, nodes);
            if (
                srcNode.hasOwnProperty(NODE_KEYS.PARENT.id) && targetNode.hasOwnProperty(NODE_KEYS.PARENT.id)
                && srcNode[NODE_KEYS.PARENT.id] === targetNode[NODE_KEYS.PARENT.id]
            ) {
                edge["zIndex"] = 1;

            }
        }


        fix_sourceHandle_targetHandle(globalDefaults, edge, nodes);

    }

    return edges;
}

function fix_sourceHandle_targetHandle(globalDefaults, edge, nodes) {
    // Although there are more source and target handles in the nodes, react flow does not choose them wisely
    // So let's fix that, e.g. if target is left from the source, the sourceHandle should be right and the targetHandle should be left
    // This code below checks the different possibilities


    const [sourceNode, targetNode] = getSourceNode_targetNode_fromId(edge, nodes);
    //const sourceNode = nodes.find(n => n.id === edge["source"]);
    //const targetNode = nodes.find(n => n.id === edge["target"]);

    let sourceNodePos = {...sourceNode.position};
    let targetNodePos = {...targetNode.position};

    // You can't just compare coordinates, because source and/or target could be in a parent
    // If a node is in a parent, its x and y are relative to the parent
    if (sourceNode.hasOwnProperty("parentNode")) {
        let parent = nodes.find(n => n.id === sourceNode["parentNode"]);
        sourceNodePos.x += parent.position.x;
        sourceNodePos.y += parent.position.y;
    }
    if (targetNode.hasOwnProperty("parentNode")) {
        let parent = nodes.find(n => n.id === targetNode["parentNode"]);
        targetNodePos.x += parent.position.x;
        targetNodePos.y += parent.position.y;
    }

    const verticalCheck = [
        [sourceNodePos.y <= targetNodePos.y, "bottom-source", "top-target"],
        [sourceNodePos.y >= targetNodePos.y, "top-source", "bottom-target"]
    ];

    const horizontalCheck = [
        [sourceNodePos.x <= targetNodePos.x, "right-source", "left-target"],
        [sourceNodePos.x >= targetNodePos.x, "left-source", "right-target"]
    ];

    const check = {
        "vertical": [...verticalCheck, ...horizontalCheck],
        "horizontal": [...horizontalCheck, ...verticalCheck]
    }[globalDefaults[GLOBAL_DEFAULT_KEY_VALUES.ORIENTATION.id]];

    let i = 0;
    while (i < check.length && !check[i][0]) {
        i++;
    }

    if (i < check.length) {
        if (!edge.hasOwnProperty("sourceHandle")) {
            edge["sourceHandle"] = check[i][1];
        }
        if (!edge.hasOwnProperty("targetHandle")) {
            edge["targetHandle"] = check[i][2];
        }
    }

}

function getSourceNode_targetNode_fromId(edge, nodes) {
    const sourceNode = nodes.find(n => n.id === edge["source"]);
    const targetNode = nodes.find(n => n.id === edge["target"]);
    return [sourceNode, targetNode];
}

