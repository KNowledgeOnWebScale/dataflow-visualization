import dagre from "dagre";

export function getLayoutedElementsDagre(dagreGraph, nodes, edges, globalDefaults) {

    dagreGraph.setGraph({rankdir: globalDefaults.orientation === "horizontal" ? "LR" : "TB"});

    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, {
            width: node.width || globalDefaults.width,
            height: node.height || globalDefaults.height
        });
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

export function fixNodeGroups(nodes) {
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
