
export const GRAPH = "graph";
export const NODE = "node";
export const EDGE = "edge";

// These are the keys that can be used in globalDefaults
// These keys are not standard supported by the library, that's why they are in a dict
// The values of this dict should be used in the JSON representation
export const KEY_VALUES = {

    [GRAPH]: {
        "AUTO_LAYOUT": {id: "autoLayout", "canBeGlobal": true, value: false, type: "boolean"},     // If true, use library 'dagrejs' to determine positioning of nodes
        "ORIENTATION": {
            id: "orientation", "canBeGlobal": true, value: "horizontal", type: "string",
            enum: ["vertical", "horizontal"]
        },
    },


    // Keys that can be used in the JSON/YAML representation of nodes
    [NODE]: {
        "FILL": {id: "fill", "canBeGlobal": true, value: "white", type: "string"},                 // Color of node
        "FONTSIZE": {id: "fontsize", "canBeGlobal": true, value: 12, type: "number"},              // Fontsize of text in nodes

        //TODO in DEVELOPMENT.md uitleggen dat je ook het pattern moet aanpassen
        "SHAPE": {
            id: "shape",
            "canBeGlobal": true,
            value: "square",
            type: "string",
            enum: ["8-star", "big-star", "circle", "cylinder", "diamond", "hexagon", "note", "rectangle", "square", "star", "triangle", "comunica", "rmlio", "solid"],
        },              // Shape of node
        "STROKE": {id: "stroke", "canBeGlobal": true, value: "black", type: "string"},             // Color of stroke of node
        "STROKE_WIDTH": {id: "strokeWidth", "canBeGlobal": true, value: 1, type: "number"},        // Width of stroke of node
        "HEIGHT": {id: "height", "canBeGlobal": true, value: 50, type: "number"},                  // Height of node
        "WIDTH": {id: "width", "canBeGlobal": true, value: 50, type: "number"},                    // Width of node

        ID: {id: "id", "canBeGlobal": false, type: "string"},
        POSITION: {id: "position", "canBeGlobal": false, type: "object"},
        Z_INDEX: {id: "zIndex", "canBeGlobal": true, value: 0, type: "number"},
        IMAGE: {id: "image", "canBeGlobal": true, type: "string"},
        LABEL: {id: "label", "canBeGlobal": true, value: "", type: "string"},
        TITLE: {id: "title", "canBeGlobal": false, type: "string"},

        PARENT: {id: "parentNode", "canBeGlobal": false, type: "string"}


        //TODO; hgroup, vgroup

    },

    // Keys that can be used in the JSON/YAML representation of edges
    [EDGE]: {
        "EDGE_COLOR": {id: "edgeColor", "canBeGlobal": true, value: "black", type: "string", "cssProperty": "stroke"},        // Color of edge
        "EDGE_THICKNESS": {id: "edgeThickness", "canBeGlobal": true, value: 1.2, type: "number", "cssProperty": "strokeWidth"},    // Thickness of edge
        "MARKER_END": {id: "markerEnd", "canBeGlobal": true, value: {}, type: "object"},             // Marker at end of the edge
        "MARKER_START": {id: "markerStart", "canBeGlobal": true, value: {}, type: "object"}, //TODO  hoe object fixen ivm intellisense (nu hardcoded in schemaValidation.js)?       // Marker at beginning of the edge
        "STROKE_DASHARRAY": {id: "strokeDasharray", "canBeGlobal": true, value: 0, type: ["number", "string"], "cssProperty": "strokeDasharray"},  // The stroke dasharray of the edges
        "ANIMATED": {id: "animated", "canBeGlobal": true, value: false, type: "boolean"},            // Standard animation supported by React Flow
        "ANIMATION": {id: "animation", "canBeGlobal": true, type: "string", "cssProperty": "animation"},                         // Custom animation
        "TYPE": {                                                               // Type of edge (default, step, smoothstep, straight)
            id: "type", "canBeGlobal": true, value: "default", type: "string",
            enum: ["default", "step", "smoothstep", "straight"]
        },

        "Z_INDEX": {id: "zIndex", "canBeGlobal": true, type: "number"},  // Leave value zIndex 0 (e.g. example 2)
        "LABEL": {id: "label", "canBeGlobal": true, type: "string"},
        "SOURCE": {id: "source", "canBeGlobal": false, type: "string", required: true},  //TODO: mss wel true
        "TARGET": {id: "target", "canBeGlobal": false, type: "string", required: true},
        "SOURCE_HANDLE": {
            id: "sourceHandle",
            "canBeGlobal": false,
            type: "string",
            enum: ["left-source", "right-source", "top-source", "bottom-source"]
        },
        "TARGET_HANDLE": {
            id: "targetHandle",
            "canBeGlobal": false,
            type: "string",
            enum: ["left-target", "right-target", "top-target", "bottom-target"]
        },
    },

};

/*
// Keys that can be used in the JSON representation of nodes
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
        "enum": GLOBAL_DEFAULT_KEY_VALUES.SHAPE.enum
    },
    "STROKE": {"id": GLOBAL_DEFAULT_KEY_VALUES.STROKE.id, "type": GLOBAL_DEFAULT_KEY_VALUES.STROKE.type},
    "STROKE_WIDTH": {
        "id": GLOBAL_DEFAULT_KEY_VALUES.STROKE_WIDTH.id,
        "type": GLOBAL_DEFAULT_KEY_VALUES.STROKE_WIDTH.type
    },
    "HEIGHT": {"id": GLOBAL_DEFAULT_KEY_VALUES.HEIGHT.id, "type": GLOBAL_DEFAULT_KEY_VALUES.HEIGHT.type},
    "WIDTH": {"id": GLOBAL_DEFAULT_KEY_VALUES.WIDTH.id, "type": GLOBAL_DEFAULT_KEY_VALUES.WIDTH.type},
};

 */

/*
// Keys that can be used in the JSON representation of edges
// Some things can also be done with css, that is why there are two hashmaps
export const EDGE_KEYS = {
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
    },

    "SOURCE": {id: "source", type: "string", required: true},
    "TARGET": {id: "target", type: "string", required: true},
    "Z_INDEX": {id: GLOBAL_DEFAULT_KEY_VALUES.Z_INDEX.id, type: "number"},
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
*/

export function parseGlobalDefaults(globalDefaults) {

    // TODO: error fallback meegeven aan deze functie en kijken of 'graph', 'node' en 'edge' er wel inzitten

    for (let key in KEY_VALUES) {
        for (let nestedKey in KEY_VALUES[key]) {
            let valueObject = KEY_VALUES[key][nestedKey];
            //console.log(valueObject)

            if (!valueObject["canBeGlobal"]) {
                continue;
            }

            //console.log(key)
            //console.log(globalDefaults)
            //console.log(globalDefaults[key])

            if (!globalDefaults[key].hasOwnProperty(valueObject.id)) {
                if (KEY_VALUES[key][nestedKey].hasOwnProperty("value")) {
                    globalDefaults[key][valueObject.id] = valueObject.value;
                }
            }
        }
    }

    /*   OUDE CODE

    for (let key in GLOBAL_DEFAULT_KEY_VALUES) {
        let valueObject = GLOBAL_DEFAULT_KEY_VALUES[key];
        if (!globalDefaults.hasOwnProperty(valueObject.id)) {
            globalDefaults[valueObject.id] = valueObject.value;
        }
    }

    return globalDefaults;*/
    return globalDefaults;
}


export function parseNodes(globalDefaults, nodes) {
    // TODO: errorfallback meegeven en kijken of alle opgegeven ID's wel uniek zijn

    for (let node of nodes) {

        // Each node needs to have an id
        if (!node.hasOwnProperty('id')) {
            // If the node is the only one with its title that does not have an ID, the title becomes the id
            // If the node is the only one with its label that does not have an ID, the label becomes the id
            // If the node does not have a label and the shape is unique among the nodes with no id's, the shape becomes the id
            // If the node does not have an id, label or shape, we look if the image is unique


            const titleId = KEY_VALUES[NODE].TITLE.id;
            const labelId = KEY_VALUES[NODE].LABEL.id;
            const shapeId = KEY_VALUES[NODE].SHAPE.id;
            const imageId = KEY_VALUES[NODE].IMAGE.id;

            function checkForPossibleId(key) {
                if (!node.hasOwnProperty(key)) {
                    return false
                }

                //let hits = nodes.filter(n => !(n.hasOwnProperty("id") || n["id"] !== key) && n.hasOwnProperty(key) && n[key] === node[key]);
                let hits = nodes.filter(n => (n.hasOwnProperty("id") && n["id"] === node[key]) || (n.hasOwnProperty(key) && n[key] === node[key]));

                if (hits.length === 1) {
                    node["id"] = node[key];
                    return true;
                }

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

        const NODE_KEYS = KEY_VALUES[NODE]

        if (node.hasOwnProperty(NODE_KEYS.IMAGE.id) && !node.hasOwnProperty(NODE_KEYS.STROKE.id)) {
            // Standard behaviour is no border around image
            node[NODE_KEYS.STROKE.id] = "none";
        }


        for (let key in NODE_KEYS) {
            if (!NODE_KEYS[key]["canBeGlobal"]) {
                continue;
            }
            let value = NODE_KEYS[key]["id"]
            data[value] = node[value];

            //console.log(`value: ${value}`)
            //console.log(`node: ${node}`)
            //console.log(`globalDefaults: ${globalDefaults}`)

            if (!node.hasOwnProperty(value) && globalDefaults[NODE].hasOwnProperty(value)) {
                data[value] = globalDefaults[NODE][value];
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
    //TODO: errorfallback meegeven en kijken of source en target wel valid ID's zijn

    for (let edge of edges) {

        if (!edge.hasOwnProperty("style")) {
            edge["style"] = {};
        }

        const EDGE_KEYS = KEY_VALUES[EDGE];


        // This loop fixes
        // TODO loop over values en niet over keys
        for (let key in EDGE_KEYS) {
            // TODO: mss beter way dan die if
            //  mss later mogelijk om verschillende loops om te zetten naar 1 loop
            if (!EDGE_KEYS[key].hasOwnProperty("cssProperty")) {
                continue
            }

            let value = EDGE_KEYS[key];

            // Reason for if statement:
            //  you can also set edgeColor via css with stroke, let's not overwrite that when that happens
            if (!edge["style"].hasOwnProperty(value.cssProperty)) {
                edge["style"][value.cssProperty] = edge[value.id] || globalDefaults[EDGE][value.id];
            }
        }

        // TODO: gwn 1 loop samen met de vorige
        for (let key in EDGE_KEYS) {
            if (!EDGE_KEYS[key]["canBeGlobal"]) {
                continue;
            }

            let value = EDGE_KEYS[key]["id"];

            if (!edge.hasOwnProperty(value) && globalDefaults[EDGE].hasOwnProperty(value)) {
                if (typeof globalDefaults[value] === 'object') {
                    edge[value] = {...globalDefaults[EDGE][value]};  // Deep copy, because e.g. markerStart does not have to be the same everywhere
                } else {
                    edge[value] = globalDefaults[EDGE][value];
                }
            }

        }

        // TODO: die dingen zijn nu ook keys
        // markerStart will not be oriented correctly
        if (!edge[EDGE_KEYS.MARKER_START.id].hasOwnProperty("orient")) {
            edge[EDGE_KEYS.MARKER_START.id]["orient"] = "auto-start-reverse";
        }

        // If edge has markerEnd and/or markerStart with no color set, set the color to the color of the edge
        if (!edge[EDGE_KEYS.MARKER_END.id].hasOwnProperty("color")) {
            edge[EDGE_KEYS.MARKER_END.id]["color"] = edge["style"]["stroke"];
        }
        if (!edge[EDGE_KEYS.MARKER_START.id].hasOwnProperty("color")) {
            edge[EDGE_KEYS.MARKER_START.id]["color"] = edge["style"]["stroke"];
        }

        // the key animated is something that is supported by the library, but it is overwritten by the standard value of strokeDasharray
        // If the user sets animated to true, but sets no strokDasharray, the edge should still be animated
        if (edge.hasOwnProperty("animated") && edge["animated"] === true && edge["style"]["strokeDasharray"] === EDGE_KEYS.STROKE_DASHARRAY.value) {
            edge["style"]["strokeDasharray"] = "5";
        }


        // If the edge has no zIndex and connects 2 nodes that are in the same parent, set the zIndex of the edge to 1
        // TODO: dit is wrs niet meer nodig als standaard value op 1 staat
        if (!edge.hasOwnProperty("zIndex")) {
            const [srcNode, targetNode] = getSourceNode_targetNode_fromId(edge, nodes);
            if (
                srcNode.hasOwnProperty(KEY_VALUES[NODE].PARENT.id) && targetNode.hasOwnProperty(KEY_VALUES[NODE].PARENT.id)
                && srcNode[KEY_VALUES[NODE].PARENT.id] === targetNode[KEY_VALUES[NODE].PARENT.id]
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
    }[globalDefaults[GRAPH][KEY_VALUES[GRAPH].ORIENTATION.id]];

    //console.log(KEY_VALUES[GRAPH].ORIENTATION.id)

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




function fixNodeGroups(nodes) {
    // loop over nodes and store all groups
    // let groups = {"vgroups": new Set(), "hgroups": new Set()}
    let groupsHash = new Set();
    let groups = [];
    /*for (let n of nodes) {
        // TODO: met ID's werken voor vgroup en hgroup
        if (n.hasOwnProperty("vgroup")) {
            groups["vgroups"].add(n["vgroup"]);
        }
        if (n.hasOwnProperty("hgroup")) {
            groups["hgroups"].add(n["hgroup"]);
        }
    }

    groups["vgroups"].forEach(g => fixVgroups(nodes, g));
    groups["hgroups"].forEach(g => fixHgroups(nodes, g));*/

    for (let n of nodes) {
        if (n.hasOwnProperty("vgroup") && !groupsHash.has(n["vgroup"])) {
            groups.push(["vgroup", n["vgroup"]]);
            groupsHash.add(n["vgroup"])
        }
        if (n.hasOwnProperty("hgroup") && !groupsHash.has(n["hgroup"])) {
            groups.push(["hgroup", n["hgroup"]]);
            groupsHash.add(n["hgroup"]);
        }
    }

    for (let g of groups) {
        if (g[0] === "vgroup") {
            fixVgroups(nodes, g[1]);
        } else {
            fixHgroups(nodes, g[1])
        }
    }

}

function fixVgroups(allNodes, vgroupId) {
    // search all nodes within that vgroup
    let nodes = allNodes.filter(n => n.vgroup === vgroupId);

    // Look for reference position
    let pos = {x: 0, y: 0};
    let i = 0;
    while (i < nodes.length && nodes[i].position.x === 0 && nodes[i].position.y === 0) {
        i++;
    }
    if (i < nodes.length) {
        pos.x = nodes[i].position.x;
        pos.y = nodes[i].position.y;
    }

    // Look for highest node height, the vertical space between the nodes will be this value
    let maxHeight = Math.max(...nodes.map(n => n.data.height))


    i = 0;
    while (nodes[i].position.x !== pos.x && nodes[i].position.y !== pos.y) {
        i++;
    }

    let referenceNode = nodes.slice(i, 1)[0];

    // TODO mss als de orientatie horizontaal is, beetje dichter en als de orientatie verticaal is, wat verder
    //  mss gwn algemeen een manier vinden om de spacing te definiëren

    let deltaY = maxHeight / 2;
    let previousY = pos.y;
    let previousHeight = referenceNode.data.height;
    let previousWidth = referenceNode.data.width;

    for (let n of nodes.filter((_, index) => index !== i)) {
        n.position.x = pos.x + (previousWidth - n.data.width) / 2;
        n.position.y = previousY + previousHeight + deltaY;
        previousY = n.position.y
        previousWidth = n.data.width;
        previousHeight = n.data.height;
    }

}

function fixHgroups(allNodes, hgroupId) {
    // search all nodes within that vgroup
    let nodes = allNodes.filter(n => n.hgroup === hgroupId);


    // Look for reference position
    let pos = {x: 0, y: 0};
    let i = 0;
    while (i < nodes.length && nodes[i].position.x === 0 && nodes[i].position.y === 0) {
        i++;
    }
    if (i < nodes.length) {
        pos.x = nodes[i].position.x;
        pos.y = nodes[i].position.y;
    }


    // Look for highest node height, the vertical space between the nodes will be this value
    let maxWidth = Math.max(...nodes.map(n => n.data.width))


    i = 0;
    while (nodes[i].position.x !== pos.x && nodes[i].position.y !== pos.y) {
        i++;
    }


    let referenceNode = nodes.slice(i, 1)[0];

    let deltaX = maxWidth / 2;  //TODO mss als de orientatie horizontaal is, beetje dichter en als de orientatie verticaal is, wat verder
    let previousX = pos.x;
    let previousHeight = referenceNode.data.height;
    let previousWidth = referenceNode.data.width;

    for (let n of nodes.filter((_, index) => index !== i)) {
        n.position.y = pos.y + (previousHeight - n.data.height) / 2;
        n.position.x = previousX + previousWidth + deltaX;
        previousX = n.position.x
        previousWidth = n.data.width;
        previousHeight = n.data.height;
    }


}
