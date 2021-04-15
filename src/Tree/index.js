import { nanoid } from "nanoid";
import React, { useState } from "react";

const structure = {};

const Context = React.createContext();

const Tree = (props) => {
  const { children } = props;

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const pushNode = ({ self, selfId, fatherId }) => {
    const node = generateNode(self, selfId);
    const nodesNewState = appendChild([...nodes, node], fatherId, node.id);

    setNodes(nodesNewState);

    refreshDownEdges(nodes, [], fatherId);
  };

  const value = {
    nodes,
    pushNode,
  };

  return <Context.Provider>{children}</Context.Provider>;
};

const generateNode = (self, id) => ({
  self,
  id,
  children: [],
});

const appendChild = (nodes, fatherId, childId) => {
  const father = findNodeById(fatherId);

  if (!father) {
    console.warn(`[Tree|appendChild] Could not find father by id ${fatherId}`);
    return;
  }

  father.children = [...father.children, childId];

  const rest = excludeNodeById(fatherId);

  return [...rest, father];
};

const refreshDownEdges = (nodes, siblings, selectedNodeId, result = []) => {
  // Select node
  let nodeId = selectedNodeId;

  // No where to go...
  const noWhereToGo = nodeId === undefined && siblings === [];
  if (noWhereToGo) {
    console.debug("[" + new Date().toLocaleTimeString() + "] puff...");

    // With Array.flat() this will go away...
    return [];
  }

  // Node id exists
  const hasNode = nodeId !== undefined;
  if (hasNode) {
    const node = findNodeById(nodeId);

    const loadedChildren = loadChildren(node.children);

    // Builds father <=> children edges
    const childrenEdges = loadedChildren
      .map((child) => calculateEdgePosition(node.self, child.self))
      .flat();

    // Returns it with the rest
    return childrenEdges;
  }

  const hasSiblings = siblings.length > 0;
  if (!hasSiblings) {
    console.warn("")
  }
    return [
      ...result,
      Array.siblings
        .map((sibling) => refreshDownEdges(nodes, [], sibling))
        .flat(),
    ];
  }

  // const startingNodeId = siblings === [];

  // const startingNode = findNodeById(nodes, startingNodeId);

  // if (!startingNode) {
  //   console.warn(
  //     `[Tree|refreshDownEdges] Could not find starting node by id ${startingNodeId}`
  //   );
  //   return;
  // }

  // if (startingNode.children === []) {
  //   console.info(`Ended leaf id ${startingNodeId}`);
  //   return false;
  // }

  // const loadedChildren = loadChildren(startingNode.children);

  // const childrenEdges = loadedChildren
  //   .map((child) => calculateEdgePosition(startingNode.self, child.self))
  //   .flat();

  // return [...childrenEdges, refreshDownEdges(nodes, loadedChildren)];
};

const generateEdge = (childId, fatherId) => {
  return {
    id: nanoid(),
    fatherId,
    childId,
    fromX: 0,
    toX: 100,
    fromY: 0,
    toY: 100,
  };
};

const calculateEdgePosition = (fatherRef, childRef) => {
  return {
    id: nanoid(),
  };
};

const findNodeById = (nodes, id) => nodes.find((n) => n.id === id);

const loadChildren = (nodes, childrenIds) =>
  childrenIds.map((id) => findNodeById(nodes, id));

const excludeNodeById = (nodes, id) => nodes.filter((n) => n.id !== id);
