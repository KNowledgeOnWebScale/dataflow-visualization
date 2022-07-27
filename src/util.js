export function parseGlobalDefaults(globalDefaults) {
    const defaults = [
        ["fontSize", 12],    // TODO bv fontsize aanpassen heeft nog geen invloed, want nog hardcoded in SvgNode
        ["width", 50],       //    (wrs werken nog paar andere dingen ook nog niet)
        ["height", 50],
        ["lineThickness", 2],
        ["fill", "white"],
        ["stroke", "black"],
        ["strokeWidth", 1],
        ["shape", "square"],

        ["edgeThickness", 1.3],
        ["edgeColor", "black"],

    ];

    for (const [key, value] of defaults) {
        if (!globalDefaults.hasOwnProperty(key)) {
            globalDefaults[key] = value;
        }
    }

    return globalDefaults;
}


// TODO: position optioneel maken, als dat mist, gwn renderen op 0,0 ofz (nu wordt dat gewoon niet getoond)
export function parseNodes(globalDefaults, nodes) {

    const data_keys = ["image", "shape", "label", "title", "strokeWidth", "stroke", "fill", "fontsize", "width", "height"];   // these keys should come in a data object, which will be passed to SvgNode

    for (let node of nodes) {

        // Each node needs to have an id
        if (!node.hasOwnProperty('id')) {
            node.id = "" + Math.random();
        }
        node.type = "custom";

        let data = {};

        for (let key of data_keys) {
            data[key] = node[key];
            if (!node.hasOwnProperty(key) && globalDefaults.hasOwnProperty(key)) {
                data[key] = globalDefaults[key];
            }
        }

        node["data"] = data;
    }

    return nodes;
}

// TODO: sourceHandle and targetHandle optioneel maken, als die keys ontbreken, gewoon kijken of source onder/boven, links/rechts van target is


export function parseEdges(globalDefaults, edges) {
    let keys_values = [
        ["edgeThickness", "strokeWidth"],
        ["edgeColor", "stroke"]
    ];

    for (let edge of edges) {

        if (!edge.hasOwnProperty("style")) {
            edge["style"] = {};
        }

        for (const [key, value] of keys_values) {

            // Reason for if statement:
            //  you can also set edgeColor via css with stroke, let's not overwrite that when that happens
            if (!edge["style"].hasOwnProperty(value)) {
                edge["style"][value] = edge[key] || globalDefaults[key]
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

    return edges;
}

