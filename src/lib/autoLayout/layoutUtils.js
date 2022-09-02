import {getSourceNode_targetNode_fromId, GRAPH, KEY_VALUES, NODE} from "../configParsing";


export function fixVgroups(globalDefaults, allNodes, vgroupId) {
    // search all nodes within that vgroup
    let nodes = allNodes.filter(n => n.vgroup === vgroupId);

    const spacing = globalDefaults[GRAPH][KEY_VALUES[GRAPH].SPACING.id]

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

    let referenceNode = nodes[i]


    // TODO mss als de orientatie horizontaal is, beetje dichter en als de orientatie verticaal is, wat verder
    //  mss gwn algemeen een manier vinden om de spacing te definiëren

    let deltaY = (maxHeight / 2) * spacing;
    let previousY = nodes[i].position.y;
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


export function fixHgroups(globalDefaults, allNodes, hgroupId) {
    // search all nodes within that vgroup
    let nodes = allNodes.filter(n => n.hgroup === hgroupId);

    const spacing = globalDefaults[GRAPH][KEY_VALUES[GRAPH].SPACING.id]

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

    let deltaX = (maxWidth / 2) * spacing;
    let previousX = nodes[i].position.x;
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


export function fixNodeGroups(globalDefaults, nodes) {

    const vgroupID = KEY_VALUES[NODE].VGROUP.id;
    const hgroupId = KEY_VALUES[NODE].HGROUP.id;

    let groupsHash = new Set();
    let groups = [];

    for (let n of nodes) {
        if (n.hasOwnProperty(vgroupID) && !groupsHash.has(n[vgroupID])) {
            groups.push([vgroupID, n[vgroupID]]);
            groupsHash.add(n[vgroupID])
        }
        if (n.hasOwnProperty(hgroupId) && !groupsHash.has(n[hgroupId])) {
            groups.push([hgroupId, n[hgroupId]]);
            groupsHash.add(n[hgroupId]);
        }
    }

    for (let g of groups) {
        if (g[0] === vgroupID) {
            fixVgroups(globalDefaults, nodes, g[1]);
        } else {
            fixHgroups(globalDefaults, nodes, g[1])
        }
    }

}


/*
     Although there are more source and target handles in the nodes, react flow does not choose them wisely
     So let's fix that, e.g. if target is left from the source, the sourceHandle should be right and the targetHandle should be left
     This code below checks the different possibilities
 */
export function fix_sourceHandle_targetHandle(globalDefaults, edge, nodes) {

    const [sourceNode, targetNode] = getSourceNode_targetNode_fromId(edge, nodes);


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
        [sourceNodePos.y <= targetNodePos.y, "bottom", "top"],
        [sourceNodePos.y >= targetNodePos.y, "top", "bottom"]
    ];

    const horizontalCheck = [
        [sourceNodePos.x <= targetNodePos.x, "right", "left"],
        [sourceNodePos.x >= targetNodePos.x, "left", "right"]
    ];

    const hashmap = {
        "vertical": [...verticalCheck, ...horizontalCheck],
        "horizontal": [...horizontalCheck, ...verticalCheck]
    }

    let check;


    if (sourceNode.hasOwnProperty("hgroup") && targetNode.hasOwnProperty("hgroup") && sourceNode["hgroup"] === targetNode["hgroup"]) {
        check = hashmap["horizontal"];
    } else if (sourceNode.hasOwnProperty("vgroup") && targetNode.hasOwnProperty("vgroup") && sourceNode["vgroup"] === targetNode["vgroup"]) {
        check = hashmap["vertical"];
    } else {
        check = hashmap[globalDefaults[GRAPH][KEY_VALUES[GRAPH].ORIENTATION.id]];
    }


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

