import {fix_sourceHandle_targetHandle, fixNodeGroups} from "./autoLayout/layoutUtils";

import customComponents from '../components/custom';

export const GRAPH = "graph";
export const NODE = "node";
export const EDGE = "edge";

const customComponentNames = Object.keys(customComponents);
let shapes = ["icon", "8-star", "big-star", "circle", "cylinder", "diamond", "hexagon", "note", "rectangle", "square", "star", "triangle", "comunica", "rmlio", "solid"]
shapes = shapes.concat(customComponentNames);

// These are the keys that can be used in globalDefaults
// These keys are not standard supported by the library, that's why they are in a dict
// The values of this dict should be used in the JSON representation
export const KEY_VALUES = {

    [GRAPH]: {
        "AUTO_LAYOUT": {
            id: "autoLayout",
            "canBeGlobal": true,
            value: false,
            type: "boolean",
            description: "If set to `true`, [dagre](https://github.com/dagrejs/dagre) is used to automatically determine to positions of the nodes. Individually set positions will be overwritten see [Node positioning](https://github.com/KNowledgeOnWebScale/dataflow-visualization/tree/main#node-positioning) for more information."
        },     // If true, use library 'dagrejs' to determine positioning of nodes
        "ORIENTATION": {
            id: "orientation", "canBeGlobal": true, value: "horizontal", type: "string",
            enum: ["vertical", "horizontal"],
            description: "The orientation of the graph. If you want to work from top to bottom or from bottom to top, set `orientation` to `vertical`"
        },
        "SPACING": {
            id: "spacing", canBeGlobal: true, value: 1, type: "number",
            description: "Set the spacing between nodes when autolayout, vgroups or hgroups are used." +
                "The default spacing for groups is the width/2 for hgroups or the height/2 for vgroups devided by 2. If you want that larger or smaller, you can set this key to any number. The spacing will be the default times the factor." +
                "When 'autolayout' is used, spacing has only effect on the vertical distance between nodes, when the orientation is set to 'vertical'. Vice versa for 'horizontal'."
        }

    },


    // Keys that can be used in the JSON/YAML representation of nodes
    [NODE]: {
        "HEIGHT": {
            id: "height",
            "canBeGlobal": true,
            value: 50,
            type: "number",
            description: "The height of the node."
        },
        "WIDTH": {
            id: "width",
            "canBeGlobal": true,
            value: 50,
            type: "number",
            description: "The width of the node."
        },
        "FILL": {
            id: "fill",
            "canBeGlobal": true,
            value: "white",
            type: "string",
            description: "Color of the node."
        },
        "FONTSIZE": {
            id: "fontsize",
            "canBeGlobal": true,
            value: 12,
            type: "number",
            description: "Size of the text inside the nodes."
        },
        ID: {
            id: "id",
            "canBeGlobal": false,
            type: "string",
            required: false,
            description: "Used to refer to the node. Used by e.g. an edge to connect two nodes or used by children to specify its parent node."
        },
        IMAGE: {
            id: "image",
            "canBeGlobal": true,
            type: "string",
            description: "The image inside a node. This image takes up the entire width and height of the node."
        },
        LABEL: {
            id: "label",
            "canBeGlobal": true,
            value: "",
            type: "string",
            description: "The text inside a node."
        },
        PARENT: {
            id: "parentNode",
            "canBeGlobal": false,
            type: "string",
            description: "The parent of other nodes. If you want to add a node inside another node, you have to set `parentNode` in the child as the ID of the parent."
        },
        POSITION: {
            id: "position",
            "canBeGlobal": false,
            type: "object",
            description: "The position of the node."
        },

        PRESETS: {
            id: "presets",
            canBeGlobal: true,
            type: "object",
            description: "Create node presets."
        },

        PRESET: {
            id: "preset",
            canBeGlobal: false,
            type: "string",
            description: "Refer to a preset defined in the config of the global defaults. If you use this, you will overwrite all that is defined in this node with the values of the preset."
        },

        "SHAPE": {
            id: "shape",
            "canBeGlobal": true,
            value: "square",
            type: "string",
            enum: shapes,
            description: "The shape of the node."
        },
        ICON_NAME: {
            id: "iconName",
            canBeGlobal: "true",
            type: "string",
            description: "When 'shape' is set to 'icon', you can set 'iconName' to anything you find in [react-icons](https://react-icons.github.io/react-icons/). Since this is a third-party library, not all styling will work. Only `fill`, `strokeWidth`, `width` and `height` will have effect."
        },
        "STROKE": {
            id: "stroke",
            "canBeGlobal": true,
            value: "black",
            type: "string",
            description: "The color of the stroke of the node."
        },
        "STROKE_DASHARRAY": {
            id: "strokeDasharray",
            "canBeGlobal": true,
            value: 0,
            type: ["number", "string"],
            description: "The dash pattern of the node."
        },
        "STROKE_WIDTH": {
            id: "strokeWidth",
            "canBeGlobal": true,
            value: 1,
            type: "number",
            description: "The thickness of the stroke of the nodes."
        },
        TITLE: {
            id: "title",
            "canBeGlobal": true,
            type: "string",
            description: "The title of a node. E.g. useful to name a parentNode. " +
                "Notice that this is not the same as an ID. If you give a node a title, that title will show up not in the middle of the node, but at the top."
        },
        TOP_TEXT: {
            id: "topText",
            "canBeGlobal": true,
            type: "string",
            description: "Set on top of the node."
        },
        Z_INDEX: {
            id: "zIndex",
            "canBeGlobal": true,
            value: 0,
            type: "number",
            description: "Controls the stacking order of the nodes."
        },

        HGROUP: {
            id: "hgroup",
            canBeGlobal: true,
            type: "string",
            description: "Align a group of nodes vertically."
        },

        VGROUP: {
            id: "vgroup",
            canBeGlobal: true,
            type: "string",
            description: "Align a group of nodes horizontally."
        }
    },

    // Keys that can be used in the JSON/YAML representation of edges
    [EDGE]: {
        "ANIMATED": {
            id: "animated",
            "canBeGlobal": true,
            value: false,
            type: "boolean",
            description: "Set a default animation for the edge. See also [Animations](https://github.com/KNowledgeOnWebScale/dataflow-visualization/tree/main#animations)."
        },
        "ANIMATION": {
            id: "animation",
            "canBeGlobal": true,
            type: "string",
            "cssProperty": "animation",
            description: "See [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/animation) for more information about animation. An example is e.g. `dashdraw .2s linear infinite`."
        },
        "COLOR": {
            id: "color",
            "canBeGlobal": true,
            value: "black",
            type: "string",
            "cssProperty": "stroke",
            description: "The color of the edge."
        },
        "LABEL": {
            id: "label",
            "canBeGlobal": true,
            type: "string",
            description: "Set the label of the edge."
        },
        "MARKER_END": {
            id: "markerEnd",
            "canBeGlobal": true,
            value: {},
            type: "object",
            description: "The arrowhead at the end of the edge."
        },
        "MARKER_START": {
            id: "markerStart",
            "canBeGlobal": true,
            value: {},
            type: "object",
            description: "The arrowhead at the beginning of the edge."
        },

        PRESETS: {
            id: "presets",
            canBeGlobal: true,
            type: "object",
            description: "Create edge presets."
        },

        PRESET: {
            id: "preset",
            canBeGlobal: false,
            type: "string",
            description: "Refer to a preset defined in the config of the global defaults. If you use this, you will overwrite all that is defined in this edge with the values of the preset."
        },

        "THICKNESS": {
            id: "thickness",
            "canBeGlobal": true,
            value: 1.2,
            type: "number",
            "cssProperty": "strokeWidth",
            description: "The thickness of the edge."
        },
        "STROKE_DASHARRAY": {
            id: "strokeDasharray",
            "canBeGlobal": true,
            value: 0,
            type: ["number", "string"],
            "cssProperty": "strokeDasharray",
            description: "The pattern of dashes of the edges. See [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray#example) for more information."
        },
        "SOURCE": {
            id: "source",
            "canBeGlobal": true,
            type: "string",
            required: true,
            description: "ID of the source node."
        },
        "TARGET": {
            id: "target",
            "canBeGlobal": true,
            type: "string",
            required: true,
            description: "ID of the target node."
        },
        "SOURCE_HANDLE": {
            id: "sourceHandle",
            "canBeGlobal": true,
            type: "string",
            enum: ["left", "right", "top", "bottom"],
            description: "Set where the edge should attach to the source node."
        },
        "TARGET_HANDLE": {
            id: "targetHandle",
            "canBeGlobal": true,
            type: "string",
            enum: ["left", "right", "top", "bottom"],
            description: "Set where the edge should attach to the target node."
        },
        "TYPE": {                                                               // Type of edge (default, step, smoothstep, straight)
            id: "type", "canBeGlobal": true, value: "default", type: "string",
            enum: ["default", "step", "smoothstep", "straight"],
            description: "Set how the edge should look like (straight line, curve ...). `default` = [Bézier curve](https://en.wikipedia.org/wiki/B%C3%A9zier_curve)."
        },

        "Z_INDEX": {
            id: "zIndex",
            "canBeGlobal": true,
            type: "number",
            description: "Controls the stacking order of the edge. For more information, go to the [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/z-index)."
        },
    }

};


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

            if (!globalDefaults[key]) {
                throw new Error(`Expected key ${key} in the global defaults!`)
            }

            if (!globalDefaults[key].hasOwnProperty(valueObject.id)) {
                if (KEY_VALUES[key][nestedKey].hasOwnProperty("value")) {
                    globalDefaults[key][valueObject.id] = valueObject.value;
                }
            }
        }
    }

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

        if (node.hasOwnProperty(NODE_KEYS.PRESET.id)) {
            let presetInGlobalDefaults = globalDefaults[NODE][NODE_KEYS.PRESETS.id][node[NODE_KEYS.PRESET.id]];
            for (let key of Object.keys(presetInGlobalDefaults)) {
                node[key] = presetInGlobalDefaults[key];
            }
        }

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
    fixNodeGroups(globalDefaults, nodes);

    return nodes;
}


export function parseEdges(globalDefaults, edges, nodes) {
    //TODO: errorfallback meegeven en kijken of source en target wel valid ID's zijn

    for (let edge of edges) {

        if (!edge.hasOwnProperty("style")) {
            edge["style"] = {};
        }

        const EDGE_KEYS = KEY_VALUES[EDGE];

        if (edge.hasOwnProperty(EDGE_KEYS.PRESET.id)) {
            let presetInGlobalDefaults = globalDefaults[EDGE][EDGE_KEYS.PRESETS.id][edge[EDGE_KEYS.PRESET.id]];
            for (let key of Object.keys(presetInGlobalDefaults)) {
                edge[key] = presetInGlobalDefaults[key];
            }
        }

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
                if (typeof globalDefaults[EDGE][value] === 'object') {
                    edge[value] = {...globalDefaults[EDGE][value]};  // Deep copy, because e.g. markerStart does not have to be the same everywhere
                } else {
                    edge[value] = globalDefaults[EDGE][value];
                }
            }

        }

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

        for (let id of [EDGE_KEYS.MARKER_START.id, EDGE_KEYS.MARKER_END.id]) {
            if (edge[id].hasOwnProperty("size")) {
                edge[id]["height"] = edge[id]["size"]; // The library works with width and height, but only specifying e.g. width and no height doesn't do anything
                edge[id]["width"] = edge[id]["size"];  // So just a key 'size' makes more sense
            }
        }
        if (edge[EDGE_KEYS.MARKER_START.id].hasOwnProperty("size")) {
            edge[EDGE_KEYS.MARKER_START.id]["height"] = edge[EDGE_KEYS.MARKER_START.id]["size"];
            edge[EDGE_KEYS.MARKER_START.id]["width"] = edge[EDGE_KEYS.MARKER_START.id]["size"];
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

export function getNodeFromEdgeId(edgeId, nodes) {
    const n = nodes.find(n => n.id === edgeId);
    if (!n) {
        throw new Error(`No node with ID ${edgeId} found!`)
    }
    return n;
}

export function getSourceNode_targetNode_fromId(edge, nodes) {
    return [getNodeFromEdgeId(edge[KEY_VALUES.edge.SOURCE.id], nodes), getNodeFromEdgeId(edge[KEY_VALUES.edge.TARGET.id], nodes)];
}




