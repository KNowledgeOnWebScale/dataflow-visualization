import React, { useCallback } from 'react';

import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  Background,
 // MarkerType,
} from 'react-flow-renderer';

// import CustomEdge from './CustomEdge';
import SvgNode from "./SvgNode";

import {nodesData, edgesData} from "./data"



//const edgeTypes = {
//  custom: CustomEdge,
//};

const nodeTypes = {
  custom: SvgNode
}

const EdgesFlow = () => {
  const [nodes, , onNodesChange] = useNodesState(nodesData);
  const [edges, setEdges, onEdgesChange] = useEdgesState(edgesData);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  return (
      <>
      <p>flow</p>
      <div style={{height: window.innerHeight}}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          snapToGrid={true}
         // edgeTypes={edgeTypes}
            nodeTypes = {nodeTypes}
          fitView
          attributionPosition="top-right"
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
      </div>
      </>
  );
};

export default EdgesFlow;
