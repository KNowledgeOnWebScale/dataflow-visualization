import dagre from "dagre";
import {
    EDGE,
    getSourceNode_targetNode_fromId,
    getSourceNodeFromId,
    getTargetNodeFromId,
    GRAPH,
    KEY_VALUES,
    NODE
} from "./configParsing";


/*

als node in vgroup/hgroup, neem al die nodes apart en voeg een node ter grootte van de breedthe en hoogte toe aan nodes. (verwijder de nodes die je apart hebt genomen)

Bouw met autolayout

verwijder de tijdelijke node

positioneer nu de vgroup, de reference node krijgt position van de grote tijdelijke node




{
    vgroups: {
        vgroupid1:{
                nodes: [id1, id2, id3], edges: [edge1, edge2, edge3],
                id:"id van tijdelijke node",
                toegevoegdeEdges: [alle edges met een source buiten de nodes en een target binnen de nodes en de edges met een source binnen de ndoes en een target buiten de nodes]
             },
             vgroupid2: { ... }
        },
      hgroups: {
            hgroupid1: {
                    nodes: [id1, id2, id3], edges: [edge1, edge2, edge3],
                    id:"id van tijdelijke node",
                    toegevoegdeEdges: [alle edges met een source buiten de nodes en een target binnen de nodes en de edges met een source binnen de ndoes en een target buiten de nodes]
                }
      }


]

 */


function findAllWithIdAsKey(id, key, arr) {
    return arr.filter(e => e[key] === id);
}


function groupNodes(groups, nodesCopy, edgesCopy) {

    let vgroupId = KEY_VALUES[NODE].VGROUP.id;
    let hgroupId = KEY_VALUES[NODE].HGROUP.id;

    let i = nodesCopy.length;
    while (i--) {

        // Node verwijderen met nodesCopy.splice(i, 1)

        let node = nodesCopy[i];

        //TODO: vab deze if een functie maken om vgroup/hgroup te abstraheren!!!!!
        if (node.hasOwnProperty(vgroupId)) {
            if (!groups.vgroups.hasOwnProperty(node[vgroupId])) {
                groups.vgroups[node[vgroupId]] = {
                    "nodes": [], "edges": [], "addedEdges": []
                }
            }
            groups.vgroups[node[vgroupId]].nodes.push(JSON.parse(JSON.stringify(node)));

            // All edges with node as source:
            fixEdges(node, "source", edgesCopy, nodesCopy, groups, "vgroups", vgroupId, getTargetNodeFromId)

            // All edges with node as target:
            fixEdges(node, "target", edgesCopy, nodesCopy, groups, "vgroups", vgroupId, getSourceNodeFromId)


            nodesCopy.splice(i, 1)
        } else if (node.hasOwnProperty(hgroupId)) {
            if (!groups.hgroups.hasOwnProperty(node[hgroupId])) {
                groups.hgroups[node[hgroupId]] = {
                    "nodes": [], "edges": [], "addedEdges": []
                }
            }
            groups.hgroups[node[hgroupId]].nodes.push(JSON.parse(JSON.stringify(node)));


            // All edges with node as source:
            fixEdges(node, "source", edgesCopy, nodesCopy, groups, "hgroups", hgroupId, getTargetNodeFromId)


            // All edges with node as target:
            fixEdges(node, "target", edgesCopy, nodesCopy, groups, "hgroups", hgroupId, getSourceNodeFromId)

            nodesCopy.splice(i, 1)
        }


    }

}

export function autoLayout(dagreGraph, globalDefaults, nodes, edges) {

    const groups = {"hgroups": {}, "vgroups": {}};

    let nodesCopy = JSON.parse(JSON.stringify(nodes));
    let edgesCopy = JSON.parse(JSON.stringify(edges));


    groupNodes(groups, nodesCopy, edgesCopy);


    // Add fake nodes and fake edges
    for (let type of Object.keys(groups)) {
        let func = type === "hgroups" ? getHgroupDimensions : getVgroupDimensions;
        for (const [id, object] of Object.entries(groups[type])) {
            let dimensions = func(object.nodes)
            nodesCopy.push({
                id: id,
                position: {x: 0, y: 0},
                height: dimensions.height, width: dimensions.width
            });
            edgesCopy.push(...object.addedEdges);
        }
    }


    //return getLayoutedElementsDagre(dagreGraphedges, globalDefaults, nodes, edges)
    const [nodes1, edges1] =  getLayoutedElementsDagre(dagreGraph, globalDefaults, nodesCopy, edgesCopy);

    // De fake edges en nodes terug verwijderen

    //const positions = { "vgroups": {}, "hgroups": {}}
    for (let type of Object.keys(groups)) {
        for (const [id, object] of Object.entries(groups[type])) {
            // Remove node from nodes1 with id
            let i = 0;
            while (nodes1[i].id !== id) {
                i++;
            }
            let position = nodes1[i].position
          //  positions[type][nodes1[i].id] = nodes1[i].position
            nodes1.splice(i, 1);

            // Remove all edges from edges1 with id as source or target
            i = edges1.length;
            while (i--) {
                let edge = edges1[i];
                if (edge.source === id || edge.target === id ) {
                    edges1.splice(i, 1);
                }
            }

            object.nodes[object.nodes.length-1].position = position


            // Add the old nodes and edges back
            nodes1.push(...object.nodes.reverse());
            edges1.push(...object.edges);
            //edges1.push(...object.addedEdges);  dit niet want dat waren de tijdelijke edges


        }
    }

  /*  for (const [key, pos] of Object.entries(positions["hgroups"])) {


    }*/
    fixNodeGroups(nodes1)

    // Finally, fix the source and target handles
    for (let edge of edges1) {
        fix_sourceHandle_targetHandle(globalDefaults, edge, nodes1);
    }

    console.log(edges1)



    return [nodes1, edges1]
    //return getLayoutedElementsDagre(dagreGraph, globalDefaults, nodes1, edges1);
}


function fixEdges(node, key, edgess, nodess, groups, groupType, groupId, getNode) {
    const edgesWithNodeAsKey = findAllWithIdAsKey(node.id, key, edgess); // key is source of target

    for (let edge of edgesWithNodeAsKey) {


        let otherNode = getNode(edge, nodess); // TODO: findAllWithIdAsKey

        if (otherNode[groupId] && otherNode[groupId] === node[groupId]) {
            //groups[groupType][node[groupId]].edges.push(JSON.parse(JSON.stringify(edge)));
        } else {
            //TODO: soruce/target aanpassen naar temp node die toegevoegd zal worden
            // console.log(groups[groupType])

            const temporaryEdge = JSON.parse(JSON.stringify(edge));

            //groups[groupType][node[groupId]].edges.push(JSON.parse(JSON.stringify(edge)));

            temporaryEdge[key] = node[groupId];

            groups[groupType][node[groupId]].addedEdges.push(temporaryEdge);
        }

        groups[groupType][node[groupId]].edges.push(JSON.parse(JSON.stringify(edge)));


        let index = edgess.findIndex(e => JSON.stringify(e) === JSON.stringify(edge))
        edgess.splice(index, 1);
    }
}


function getLayoutedElementsDagre(dagreGraph, globalDefaults, nodes, edges) {

    const widthId = KEY_VALUES[NODE].WIDTH.id;
    const heightId = KEY_VALUES[NODE].HEIGHT.id;

    dagreGraph.setGraph({rankdir: globalDefaults[GRAPH][KEY_VALUES[GRAPH].ORIENTATION.id] === "horizontal" ? "LR" : "TB"});

    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, {
            width: node[widthId] || globalDefaults[NODE][widthId],
            height: node[heightId] || globalDefaults[NODE][heightId]
        });
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge[KEY_VALUES[EDGE].SOURCE.id], edge[KEY_VALUES[EDGE].TARGET.id]);
    });

    dagre.layout(dagreGraph);

    nodes.forEach((node) => {
        const nodeWithPosition = dagreGraph.node(node[KEY_VALUES[NODE].ID.id]);

        node.position = {
            x: nodeWithPosition.x - (node[widthId] || globalDefaults[NODE][widthId]) / 2,
            y: nodeWithPosition.y - (node[heightId] || globalDefaults[NODE][heightId]) / 2,
        };

        return node;
    });

    return [nodes, edges];


}

// Nodes are array of nodes

//TODO: abstraheren naor 1 functie (getVgroupDimensions en getHgroupDimensions)
function getHgroupDimensions(nodes) {
    const widthId = KEY_VALUES[NODE].WIDTH.id;
    const heightId = KEY_VALUES[NODE].HEIGHT.id;

    let width = 0;
    let height = 0;

    let maxWidth = Math.max(...nodes.map(n => n.data.width))

    for (let node of nodes) {

        width += node.data[widthId] + maxWidth / 2;
        if (node.data[heightId] > height) {
            height = node.data[heightId];
        }
    }

    // mss moet width nog eens min maxWidth/2 gedaan worden
    return {width: width, height: height};
}

function getVgroupDimensions(nodes) {
    const widthId = KEY_VALUES[NODE].WIDTH.id;
    const heightId = KEY_VALUES[NODE].HEIGHT.id;

    let width = 0;
    let height = 0;

    let maxHeight = Math.max(...nodes.map(n => n.data.height))


    for (let node of nodes) {
        height += node.data[heightId] + maxHeight / 2;
        if (node.data[widthId] > width) {
            width = node.data[widthId];
        }
    }

    // mss moet width nog eens min maxWidth/2 gedaan worden
    return {width: width, height: height};
}


export function fixVgroups(allNodes, vgroupId) {
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


export function fixHgroups(allNodes, hgroupId) {
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



export function fixNodeGroups(nodes) {

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
            fixVgroups(nodes, g[1]);
        } else {
            fixHgroups(nodes, g[1])
        }
    }

}


export function fix_sourceHandle_targetHandle(globalDefaults, edge, nodes) {
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


    if (sourceNode.hasOwnProperty("hgroup") && targetNode.hasOwnProperty("hgroup") && sourceNode["hgroup"] === targetNode["hgroup"] ) {
        check = hashmap["horizontal"];
    } else if (sourceNode.hasOwnProperty("vgroup") && targetNode.hasOwnProperty("vgroup") && sourceNode["vgroup"] === targetNode["vgroup"]) {
        check = hashmap["vertical"];
    } else {
        check = hashmap[globalDefaults[GRAPH][KEY_VALUES[GRAPH].ORIENTATION.id]];
    }


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

