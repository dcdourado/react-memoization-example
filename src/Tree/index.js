import { nanoid } from "nanoid";
import React, { useState } from "react";

import Logger from "../Logger";

const structure = {};

const Context = React.createContext();

const Tree = (props) => {
  const { children } = props;

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const pushNode = ({ self, selfId, fatherId }) => {
    const node = generateNode(self, selfId);
    const plusChildNodes = appendChild(nodes, node, fatherId);
    setNodes(plusChildNodes);

    const refreshedEdges = refreshDownEdges(plusChildNodes, [], fatherId);
    setEdges(refreshedEdges);

    Logger.info(`Node ${selfId} pushed successfully`);

    return;
  };

  const value = {
    nodes,
    pushNode,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const generateNode = (self, id) => ({
  self,
  id,
  children: [],
});

const appendChild = (nodes, child, fatherId) => {
  const father = findNodeById(fatherId);

  if (!father) {
    Logger.warn(`[appendChild] Could not find father by id ${fatherId}`);
    return;
  }

  father.children = [...father.children, child.id];

  const rest = excludeNodeById(nodes, fatherId);

  return [...rest, father];
};

const NOTHING = [];
const refreshDownEdges = (nodes, siblings, selectedNodeId, result = []) => {
  // Select node
  let nodeId = selectedNodeId;

  // No where to go...
  const noWhereToGo = nodeId === undefined && siblings.length === 0;
  if (noWhereToGo) {
    Logger.debug("[refreshDownEdges] Reached last branch leaf...");

    // With Array.flat() this will go away...
    return NOTHING;
  }

  // Node id exists
  const hasNode = nodeId !== undefined;
  if (hasNode) {
    const node = findNodeById(nodeId);

    const loadedChildren = loadChildren(node.children);

    // Builds father => children edges
    const childrenEdges = loadedChildren
      .map((child) => generateEdge(node.self, child.self))
      .flat();

    Logger.info(
      `[refreshDownEdges] Calculated ${childrenEdges.length()} children edges`
    );

    // Returns it with the rest
    return childrenEdges;
  }

  const hasSiblings = siblings.length > 0;
  if (!hasSiblings) {
    Logger.warn("[refreshDownEdges] You should'nt see me!");
    return NOTHING;
  }

  return [
    ...result,
    ...Array.siblings
      .map((sibling) => refreshDownEdges(nodes, [], sibling))
      .flat(),
  ];
};

const generateEdge = (fatherRef, childRef) => {
  const { fromX, toX, fromY, toY } = calculateEdgePosition(fatherRef, childRef);

  return {
    fromX,
    toX,
    fromY,
    toY,
    id: nanoid(),
  };
};

const calculateEdgePosition = (fatherRef, childRef) => {
  const fatherX = 0;
  const fatherY = 0;
  const childX = 0;
  const childY = 0;

  return {
    fromX: Math.min(fatherX, childX),
    toX: Math.max(fatherX, childX),
    fromY: Math.min(fatherY, childY),
    toY: Math.min(fatherY, childY),
  };
};

const findNodeById = (nodes, id) => nodes.find((n) => n.id === id);

const loadChildren = (nodes, childrenIds) =>
  childrenIds.map((id) => findNodeById(nodes, id));

const excludeNodeById = (nodes, id) => nodes.filter((n) => n.id !== id);
