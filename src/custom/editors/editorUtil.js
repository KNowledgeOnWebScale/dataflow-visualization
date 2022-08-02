import dagre from 'dagre';

// These are the keys that can be used in globalDefaults
// These keys are not standard supported by the library, that's why they are in a dict
// The values of this dict should be used in the JSON representation
const GLOBAL_DEFAULT_KEY_VALUES = {
    "ANIMATED": {"id":"animated", "value": false},              // Standard animation supported by React Flow
    "ANIMATION": {"id": "animation", "value": undefined},          // Custom animation
    "TYPE": {"id": "type", "value": "default"},                 // Type of edge (default, step, smoothstep, straight)
    "EDGE_COLOR": {"id": "edgeColor", "value": "black"},        // Color of edge
    "EDGE_THICKNESS": {"id": "edgeThickness", "value": 1.2},    // Thickness of edge
    "MARKER_END": {"id": "markerEnd", "value": {}},             // Marker at end of the edge
    "MARKER_START": {"id": "markerStart", "value": {}},         // Marker at beginning of the edge
    "STROKE_DASHARRAY": { "id": "strokeDasharray", "value": 0 },  // The stroke dasharray of the edges


    "FILL": {"id": "fill", "value": "white"},                 // Color of node
    "FONTSIZE": {"id": "fontsize", "value": 12},              // Fontsize of text in nodes TODO: fontsize op edges???
    "SHAPE": {"id": "shape", "value": "square"},              // Shape of node
    "STROKE": {"id": "stroke", "value": "black"},             // Color of stroke of node
    "STROKE_WIDTH": {"id": "strokeWidth", "value": 1},        // Width of stroke of node
    "HEIGHT": {"id": "height", "value": 50},                  // Height of node
    "WIDTH": {"id": "width", "value": 50},                    // Width of node

    "AUTO_LAYOUT": {"id": "autoLayout", "value": false},
    "ORIENTATION": {"id": "orientation", "value": "horizontal"}, // Orientation of flow


};

// Keys, not supported by the library, that can be used in the JSON representation of nodes
export const NODE_KEYS = {
    "IMAGE": "image",
    "LABEL": "label",
    "TITLE": "title",

    "PARENT": "parentNode",

    //TODO: vgroup, hgroup

    "FILL": GLOBAL_DEFAULT_KEY_VALUES.FILL.id,
    "FONTSIZE": GLOBAL_DEFAULT_KEY_VALUES.FONTSIZE.id,
    "SHAPE": GLOBAL_DEFAULT_KEY_VALUES.SHAPE.id,
    "STROKE": GLOBAL_DEFAULT_KEY_VALUES.STROKE.id,
    "STROKE_WIDTH": GLOBAL_DEFAULT_KEY_VALUES.STROKE_WIDTH.id,
    "HEIGHT": GLOBAL_DEFAULT_KEY_VALUES.HEIGHT.id,
    "WIDTH": GLOBAL_DEFAULT_KEY_VALUES.WIDTH.id,
};

// Keys, not supported by the library, that can be used in the JSON representation of edges
// Some things can also be done with css, that is why there are two hashmaps
const EDGE_KEYS_WITH_CSS_PROPERTY = {
    "ANIMATION": {"id": GLOBAL_DEFAULT_KEY_VALUES.ANIMATION.id, "cssProperty": "animation"},
    "EDGE_COLOR": {"id": GLOBAL_DEFAULT_KEY_VALUES.EDGE_COLOR.id, "cssProperty": "stroke"},
    "EDGE_THICKNESS": {"id": GLOBAL_DEFAULT_KEY_VALUES.EDGE_THICKNESS.id, "cssProperty": "strokeWidth"},
    "STROKE_DASHARRAY": {"id": GLOBAL_DEFAULT_KEY_VALUES.STROKE_DASHARRAY.id, "cssProperty": "strokeDasharray"}
};

const EDGE_KEYS_NO_CSS_PROPERTY = {
    "ANIMATED": GLOBAL_DEFAULT_KEY_VALUES.ANIMATED.id,
    "TYPE": GLOBAL_DEFAULT_KEY_VALUES.TYPE.id,
    "MARKER_END":  GLOBAL_DEFAULT_KEY_VALUES.MARKER_END.id,
    "MARKER_START":  GLOBAL_DEFAULT_KEY_VALUES.MARKER_START.id
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

            const titleId = NODE_KEYS.TITLE;
            const labelId = NODE_KEYS.LABEL;
            const shapeId = GLOBAL_DEFAULT_KEY_VALUES.SHAPE.id;
            const imageId = NODE_KEYS.IMAGE;

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
            let value = EDGE_KEYS_NO_CSS_PROPERTY[key];

            if (!edge.hasOwnProperty(value)) {
                if (typeof globalDefaults[value] === 'object') {
                    edge[value] = {...globalDefaults[value]};  // Deep copy, because e.g. markerStart does not have to be the same everywhere
                } else {
                    edge[value] = globalDefaults[value];
                }
            }

        }

        // markerStart will not be oriented correctly
        if (!edge[EDGE_KEYS_NO_CSS_PROPERTY.MARKER_START].hasOwnProperty("orient")) {
            edge[EDGE_KEYS_NO_CSS_PROPERTY.MARKER_START]["orient"] = "auto-start-reverse";
        }


        // If edge has markerEnd and/or markerStart with no color set, set the color to the color of the edge
        if (!edge[EDGE_KEYS_NO_CSS_PROPERTY.MARKER_END].hasOwnProperty("color")) {
            edge[EDGE_KEYS_NO_CSS_PROPERTY.MARKER_END]["color"] = edge["style"]["stroke"];
        }
        if (!edge[EDGE_KEYS_NO_CSS_PROPERTY.MARKER_START].hasOwnProperty("color")) {
            edge[EDGE_KEYS_NO_CSS_PROPERTY.MARKER_START]["color"] = edge["style"]["stroke"];
        }

        // the key animated is something that is supported by the library, but it is overwritten by the standard value of strokeDasharray
        // If the user sets animated to true, but sets no strokDasharray, the edge should still be animated
        if (edge.hasOwnProperty("animated") && edge["animated"] === true && edge["style"]["strokeDasharray"] === GLOBAL_DEFAULT_KEY_VALUES.STROKE_DASHARRAY.value) {
            edge["style"]["strokeDasharray"] = "5";
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


export function getLayoutedElementsDagre(dagreGraph, nodes, edges, globalDefaults) {

    dagreGraph.setGraph({ rankdir: globalDefaults.orientation === "horizontal" ? "LR" : "TB" });

    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: node.width || globalDefaults.width, height: node.height || globalDefaults.height });
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    nodes.forEach((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);

        node.position = {
            x: nodeWithPosition.x - (node.width || globalDefaults.width) / 2,
            y: nodeWithPosition.y - (node.height || globalDefaults.height) / 2,
        };

        return node;
    });

    return [nodes, edges];


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

    let deltaY = maxHeight / 2;  //TODO mss als de orientatie horizontaal is, beetje dichter en als de orientatie verticaal is, wat verder
    let previousY = pos.y;
    let previousHeight = referenceNode.data.height;
    let previousWidth = referenceNode.data.width;

    for (let n of nodes.filter((_, index) => index !== i)) {
        n.position.x = pos.x + (previousWidth-n.data.width)/2;
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
        n.position.y = pos.y + (previousHeight-n.data.height)/2;
        n.position.x = previousX + previousWidth + deltaX ;
        previousX = n.position.x
        previousWidth = n.data.width;
        previousHeight = n.data.height;
    }


}
