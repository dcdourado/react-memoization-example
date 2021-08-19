import { nanoid } from "nanoid";

import Logger from "../Logger";

const generateNode = (self, id, fatherId) => ({
  self,
  id,
  fatherId,
});

const generateEdge = (fatherRef, childRef) => {
  return {
    ...calculateEdgePosition(fatherRef, childRef),
    id: nanoid(),
  };
};

// TO-DO: calculate this values correctly
const calculateEdgePosition = (fatherRef, childRef) => {
  if (!fatherRef.current || !childRef.current) {
    Logger.error("A node reference isn't loaded")

    return {
      fromX: 0,
      fromY: 0,
      toX: 0,
      toY: 0,
    }
  }

  // Trying to discover something with this
  Logger.log(fatherRef.current.getBoundingClientRect())

  const fatherX = 0;
  const fatherY = 0;
  const childX = 0;
  const childY = 0;

  return {
    fromX: Math.min(fatherX, childX),
    fromY: Math.min(fatherY, childY),
    toX: Math.max(fatherX, childX),
    toY: Math.max(fatherY, childY),
  };
};

const findNode = (nodes, id) => nodes.find((n) => n.id === id);

const excludeNode = (nodes, id) => nodes.filter((n) => n.id !== id);

const Actions = {
  generateNode,
  generateEdge,
  findNode,
  excludeNode,
};

export default Actions;
