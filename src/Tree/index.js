import React, { useContext, useEffect, useState } from "react";

import Logger from "../Logger";
import Actions from "./actions";

export const TreeContext = React.createContext();

export const TreeProvider = (props) => {
  const { children } = props;

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  Logger.info(`Node count: ${nodes?.length}`);
  Logger.info(`Edge count: ${edges?.length}`);

  useEffect(() => {
    Logger.info("Tree initialized");
  }, []);

  const pushNode = ({ self, selfId, fatherId }) => {
    const node = Actions.generateNode(self, selfId);
    const plusChildNodes = Actions.appendChild(nodes, node, fatherId);
    setNodes(plusChildNodes);

    const refreshedEdges = Actions.refreshDownEdges(
      plusChildNodes,
      [],
      fatherId
    );
    setEdges(refreshedEdges);

    Logger.info(`Node ${selfId} pushed successfully`);

    return;
  };

  const killNode = (nodeId) => {
    Logger.info(`Killed node ${nodeId}`)

    const childlessNodes = Actions.excludeNodeById(nodes, nodeId)
    // TO-DO: kill all children recursevly
    setNodes(childlessNodes)

    // TO-DO: removeDownEdges(edge)
  }

  const value = {
    nodes,
    pushNode,
    killNode,
  };

  return <TreeContext.Provider value={value}>{children}</TreeContext.Provider>;
};

export const useTree = () => useContext(TreeContext);
