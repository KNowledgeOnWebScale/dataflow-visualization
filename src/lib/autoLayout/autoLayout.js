import {EDGE, getNodeFromEdgeId, GRAPH, KEY_VALUES, NODE} from "../configParsing";
import dagre from "dagre";
import {fix_sourceHandle_targetHandle, fixNodeGroups} from "./layoutUtils";

function reverseDirection(direction) {
    if (direction === KEY_VALUES.edge.SOURCE.id) {
        return KEY_VALUES.edge.TARGET.id;
    }
    if (direction === KEY_VALUES.edge.TARGET.id) {
        return KEY_VALUES.edge.SOURCE.id;
    }
    return null;
}

/*
Algorithm if groups are used in combination with autoLayout:

* Step 1
    * If a node is inside vgroup/hgroup, take all the nodes from that group apart and add a temporary node the size of the entire group.
    * Remove the nodes you took apart.
    * Remove all the edges that have a node from a group as source or target.
    * (Store all of that in a object)
* Step 2:
    * Build with dagre.

* Step 3:
    * Remove the temporary nodes and edges.

* Step 4:
    * Add the nodes and edges you removed to the graph.
    * The position of the reference node is the position the temporary node (that represented the entire group) had.
    * Position the other elements of the group.


This is an example of the object we build in step 1
{
    vgroups: {
        vgroupid1:{
                nodes: [id1, id2, id3], edges: [edge1, edge2, edge3],
                edges: [All edges with node from group as source/target]
                addedEdges: [temporary edges where source or target is has been changed to the big temporary node]
             },
             vgroupid2: { ... }
        },
      hgroups: {
            hgroupid1: {
                    nodes: [id1, id2, id3], edges: [edge1, edge2, edge3],
                    edges: [All edges with node from group as source/target],
                    addedEdges: [temporary edges where source or target is has been changed to the big temporary node]
                }
      }


]

 */

function findAllWithIdAsKey(id, key, arr) {
    return arr.filter(e => e[key] === id);
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


    const [nodes1, edges1] = getLayoutedElementsDagre(dagreGraph, globalDefaults, nodesCopy, edgesCopy);

    // Remove the temporary nodes and edges and add the old one again
    removeTemporaryNodesAndEdgesAndAddTheOldOnesAgain(groups, nodes1, edges1)

    fixNodeGroups(globalDefaults, nodes1)

    // Finally, fix the source and target handles
    for (let edge of edges1) {
        fix_sourceHandle_targetHandle(globalDefaults, edge, nodes1);
    }


    return [nodes1, edges1]
}


// Step one of the algorithm if groups are used with autoLayout
function groupNodes(groups, nodesCopy, edgesCopy) {

    let vgroupId = KEY_VALUES[NODE].VGROUP.id;  // It would be pretty annoying to type that everytime
    let hgroupId = KEY_VALUES[NODE].HGROUP.id;

    let i = nodesCopy.length;
    while (i--) {

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
            fixEdges(node, KEY_VALUES.edge.SOURCE.id, edgesCopy, nodesCopy, groups, "vgroups", vgroupId)

            // All edges with node as target:
            fixEdges(node, KEY_VALUES.edge.TARGET.id, edgesCopy, nodesCopy, groups, "vgroups", vgroupId)


            nodesCopy.splice(i, 1)
        } else if (node.hasOwnProperty(hgroupId)) {
            if (!groups.hgroups.hasOwnProperty(node[hgroupId])) {
                groups.hgroups[node[hgroupId]] = {
                    "nodes": [], "edges": [], "addedEdges": []
                }
            }
            groups.hgroups[node[hgroupId]].nodes.push(JSON.parse(JSON.stringify(node)));


            // All edges with node as source:
            fixEdges(node, KEY_VALUES.edge.SOURCE.id, edgesCopy, nodesCopy, groups, "hgroups", hgroupId)


            // All edges with node as target:
            fixEdges(node, KEY_VALUES.edge.TARGET.id, edgesCopy, nodesCopy, groups, "hgroups", hgroupId)

            nodesCopy.splice(i, 1)
        }


    }

}

/**
 * Remove edge if it has a node from a group as source or target, and  maybe add a new edge where the temporary big node is the source or target
 * @param {*} node
 * @param {*} direction 'source' or 'target'
 * @param {*} edgess
 * @param {*} nodess
 * @param {*} groups
 * @param {*} groupType
 * @param {*} groupId
 */
function fixEdges(node, direction, edgess, nodess, groups, groupType, groupId) {
    const edgesWithNodeAsKey = findAllWithIdAsKey(node.id, direction, edgess); // key is source of target

    for (let edge of edgesWithNodeAsKey) {


        let otherNode = getNodeFromEdgeId(edge[reverseDirection(direction)], nodess); // TODO: findAllWithIdAsKey

        if (otherNode[groupId] && otherNode[groupId] === node[groupId]) {
            //groups[groupType][node[groupId]].edges.push(JSON.parse(JSON.stringify(edge)));
        } else {
            //TODO: soruce/target aanpassen naar temp node die toegevoegd zal worden
            // console.log(groups[groupType])

            const temporaryEdge = JSON.parse(JSON.stringify(edge));

            //groups[groupType][node[groupId]].edges.push(JSON.parse(JSON.stringify(edge)));

            temporaryEdge[direction] = node[groupId];

            groups[groupType][node[groupId]].addedEdges.push(temporaryEdge);
        }

        groups[groupType][node[groupId]].edges.push(JSON.parse(JSON.stringify(edge)));


        let index = edgess.findIndex(e => JSON.stringify(e) === JSON.stringify(edge))
        edgess.splice(index, 1);
    }
}


// Do layout with dagre
function getLayoutedElementsDagre(dagreGraph, globalDefaults, nodes, edges) {

    const widthId = KEY_VALUES[NODE].WIDTH.id;
    const heightId = KEY_VALUES[NODE].HEIGHT.id;

    let isHorizontal = globalDefaults[GRAPH][KEY_VALUES[GRAPH].ORIENTATION.id] === "horizontal";
    const spacing = globalDefaults[GRAPH][KEY_VALUES[GRAPH].SPACING.id];

    dagreGraph.setGraph({rankdir: isHorizontal ? "LR" : "TB"});

    nodes.forEach((node) => {
        let w = node["data"][widthId] || node[widthId];
        let h = node["data"][heightId] || node[heightId];
        dagreGraph.setNode(node.id, {
            width: isHorizontal ? w * spacing : w ,
            height: isHorizontal ? h : h * spacing
        });
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge[KEY_VALUES[EDGE].SOURCE.id], edge[KEY_VALUES[EDGE].TARGET.id]);
    });

    dagre.layout(dagreGraph, {});

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

function removeTemporaryNodesAndEdgesAndAddTheOldOnesAgain(groups, nodes, edges) {
    for (let type of Object.keys(groups)) {
        for (const [id, object] of Object.entries(groups[type])) {
            // Remove node from nodes1 with id
            let i = 0;
            while (nodes[i].id !== id) {
                i++;
            }
            let position = nodes[i].position
            //  positions[type][nodes1[i].id] = nodes1[i].position
            nodes.splice(i, 1);

            // Remove all edges from edges1 with id as source or target
            i = edges.length;
            while (i--) {
                let edge = edges[i];
                if (edge.source === id || edge.target === id) {
                    edges.splice(i, 1);
                }
            }

            object.nodes[object.nodes.length - 1].position = position


            // Add the old nodes and edges back
            nodes.push(...object.nodes.reverse());
            edges.push(...object.edges);

        }
    }
}


//TODO: misschien getVgroupDimensions en getHgroupDimensions abstraheren naar 1 functie
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

