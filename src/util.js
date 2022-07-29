// These are the keys that can be used in globalDefaults
// These keys are not standard supported by the library, that's why they are in a dict
// The values of this dict should be used in the JSON representation
const GLOBAL_DEFAULT_KEY_VALUES = {
    "EDGE_COLOR": {"id": "edgeColor", "value": "black"},      // color of edge
    "EDGE_THICKNESS": {"id": "edgeThickness", "value": 1.2},  // Thickness of edge (= connections between nodes)
    "FILL": {"id": "fill", "value": "white"},                 // Color of node
    "FONTSIZE": {"id": "fontsize", "value": 12},              // Fontsize of text in nodes TODO: fontsize op edges???
    "SHAPE": {"id": "shape", "value": "square"},              // Shape of node
    "STROKE": {"id": "stroke", "value": "black"},             // Color of stroke of node
    "STROKE_WIDTH": {"id": "strokeWidth", "value": 1},        // Width of stroke of node
    "HEIGHT": {"id": "height", "value": 50},                  // Height of node
    "WIDTH": {"id": "width", "value": 50},                    // Width of node
    "ORIENTATION": {"id": "orientation", "value": "horizontal"} // Orientation of flow
};

// Keys, not supported by the library, that can be used in the JSON representation of nodes
export const NODE_KEYS = {
    "IMAGE": "image",
    "LABEL": "label",
    "TITLE": "title",

    "FILL": GLOBAL_DEFAULT_KEY_VALUES.FILL.id,
    "FONTSIZE": GLOBAL_DEFAULT_KEY_VALUES.FONTSIZE.id,
    "SHAPE": GLOBAL_DEFAULT_KEY_VALUES.SHAPE.id,
    "STROKE": GLOBAL_DEFAULT_KEY_VALUES.STROKE.id,
    "STROKE_WIDTH": GLOBAL_DEFAULT_KEY_VALUES.STROKE_WIDTH.id,
    "HEIGHT": GLOBAL_DEFAULT_KEY_VALUES.HEIGHT.id,
    "WIDTH": GLOBAL_DEFAULT_KEY_VALUES.WIDTH.id,
};

// Keys, not supported by the library, that can be used in the JSON representation of edges
const EDGE_KEYS = {
    "EDGE_COLOR": {"id": GLOBAL_DEFAULT_KEY_VALUES.EDGE_COLOR.id, "cssProperty": "stroke"},
    "EDGE_THICKNESS": {"id": GLOBAL_DEFAULT_KEY_VALUES.EDGE_THICKNESS.id, "cssProperty": "strokeWidth"}
};


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
            // If the node is the only one with its label that does not have an ID, the label becomes the id
            // If the node does not have a label and the shape is unique, the shape becomes the id
            // If the node does not have an id, label or shape, we look if the image is unique

            const labelId = NODE_KEYS.LABEL;
            const shapeId = GLOBAL_DEFAULT_KEY_VALUES.SHAPE.id;
            const imageId = NODE_KEYS.IMAGE;

            function checkForPossibleId(key) {
                if (node.hasOwnProperty(key)) {
                    //let hits = nodes.filter(n => !(n.hasOwnProperty("id") || n["id"] !== key) && n.hasOwnProperty(key) && n[key] === node[key]);
                    let hits = nodes.filter(n => (n.hasOwnProperty("id") && n["id"] === node[key]) || (n.hasOwnProperty(key) && n[key] === node[key]));
                    console.log(key)
                    console.log(hits)

                    if (hits.length === 1) {
                        node["id"] = node[key];
                        return true;
                    }

                }
                return false;
            }

            if (!checkForPossibleId(labelId)) {
                if (!checkForPossibleId(shapeId)) {
                    if (!checkForPossibleId(imageId)) {
                        node["id"] = "" + Math.random();
                    }
                }
            }

        }

        node.type = "custom";

        // The values of NODE_KEYS should come in a data object, which will be passed to SvgNode
        let data = {};

        for (let key in NODE_KEYS) {
            let value = NODE_KEYS[key]
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

    return nodes;
}


export function parseEdges(globalDefaults, edges, nodes) {

    //console.log(`nodes in het begin van de functie:`)
    //console.log(JSON.stringify(nodes));

    for (let edge of edges) {

        if (!edge.hasOwnProperty("style")) {
            edge["style"] = {};
        }

        for (let key in EDGE_KEYS) {
            let value = EDGE_KEYS[key];

            // Reason for if statement:
            //  you can also set edgeColor via css with stroke, let's not overwrite that when that happens
            if (!edge["style"].hasOwnProperty(value.cssProperty)) {
                edge["style"][value.cssProperty] = edge[value.id] || globalDefaults[value.id];
            }
        }

        // If edge has markerEnd and/or markerStart with no color set, color that too
        if (edge.hasOwnProperty("markerEnd") && !edge["markerEnd"].hasOwnProperty("color")) {
            edge["markerEnd"]["color"] = edge["style"]["stroke"];
        }
        if (edge.hasOwnProperty("markerStart") && !edge["markerStart"].hasOwnProperty("color")) {
            edge["markerStart"]["color"] = edge["style"]["stroke"];
        }

        fix_sourceHandle_targetHandle(globalDefaults, edge, nodes);

    }

    return edges;
}

function fix_sourceHandle_targetHandle(globalDefaults, edge, nodes) {
    // Although there are more source and target handles in the nodes, react flow does not choose them wisely
    // So let's fix that, e.g. if target is left from the source, the sourceHandle should be right and the targetHandle should be left
    // This code below checks the different possibilities

    const sourceNode = nodes.find(n => n.id === edge["source"]);
    const targetNode = nodes.find(n => n.id === edge["target"]);

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
        [sourceNodePos.y < targetNodePos.y, "bottom-source", "top-target"],
        [sourceNodePos.y > targetNodePos.y, "top-source", "bottom-target"]
    ];

    const horizontalCheck = [
        [sourceNodePos.x < targetNodePos.x, "right-source", "left-target"],
        [sourceNodePos.x > targetNodePos.x, "left-source", "right-target"]
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
