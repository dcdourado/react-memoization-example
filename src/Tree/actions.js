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

const calculateEdgePosition = (fatherRef, childRef) => {
  if (!fatherRef.current || !childRef.current) {
    Logger.error("A node reference isn't loaded")

    return {
      top: 0,
      left: 0,
    }
  }

  const fatherRect = fatherRef.current.getBoundingClientRect()
  const childRect = childRef.current.getBoundingClientRect()

  const fatherTop = fatherRect.top + fatherRect.height / 2
  const childTop = childRect.top + childRect.height / 2
  const fatherLeft = fatherRect.left + fatherRect.width / 2
  const childLeft = childRect.left + childRect.width / 2

  return {
    fromTop: Math.min(fatherTop, childTop),
    toTop: Math.max(fatherTop, childTop),
    fromLeft: Math.min(fatherLeft, childLeft),
    toLeft: Math.max(fatherLeft, childLeft),
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
