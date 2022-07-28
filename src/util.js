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
    "WIDTH": {"id": "width", "value": 50}                     // Width of node
};
/// TODO bv fontsize aanpassen heeft nog geen invloed, want nog hardcoded in SvgNode (en mss nog paar andere dingen die ook nog niet werken)


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


// TODO: position optioneel maken, als dat mist, gwn renderen op 0,0 ofz (nu wordt dat gewoon niet getoond)
export function parseNodes(globalDefaults, nodes) {

    // The values of NODE_KEYS should come in a data object, which will be passed to SvgNode

    for (let node of nodes) {

        // Each node needs to have an id
        if (!node.hasOwnProperty('id')) {
            node.id = "" + Math.random();
        }
        node.type = "custom";

        let data = {};

        for (let key in NODE_KEYS) {
            let value = NODE_KEYS[key]
            data[value] = node[value];
            if (!node.hasOwnProperty(value) && globalDefaults.hasOwnProperty(value)) {
                data[value] = globalDefaults[value];
            }
        }

        node["data"] = data;
    }

    console.log(nodes)
    return nodes;
}

// TODO: sourceHandle and targetHandle optioneel maken, als die keys ontbreken, gewoon kijken of source onder/boven, links/rechts van target is


export function parseEdges(globalDefaults, edges) {

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

    }

    //console.log(globalDefaults)
   // console.log(edges)

    return edges;
}

