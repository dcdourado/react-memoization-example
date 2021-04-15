import React, { useContext, useEffect, useState } from "react";

import Logger from "../Logger";
import Actions from "./actions";

export const TreeContext = React.createContext();

export const TreeProvider = (props) => {
  const { children } = props;

  const [initialized, setInitialized] = useState(false);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  if (initialized) {
    Logger.info(`Node count: ${nodes?.length}`);
    Logger.info(`Edge count: ${edges?.length}`);
  }

  useEffect(() => {
    // Logger.clear();
    Logger.info("Tree initialized");
    setInitialized(true);

    return () => setInitialized(false);
  }, [nodes]);

  const pushNode = ({ self, selfId, fatherId }) => {
    Logger.info(`Pushing node ${selfId}`);

    const node = Actions.generateNode(self, selfId, fatherId);
    Logger.log(node);

    setNodes((nodes) => {
      Logger.info("Previously...");
      Logger.log(nodes);

      const plusChildNodes = Actions.appendChild(nodes, node, fatherId);
      Logger.info("Then...");
      Logger.log(plusChildNodes);

      setEdges(Actions.refreshDownEdges(plusChildNodes, [], fatherId));

      return plusChildNodes;
    });

    Logger.info(`Node ${selfId} pushed successfully`);

    return;
  };

  const killNode = (nodeId) => {
    Logger.info(`Killed node ${nodeId}`);

    const childlessNodes = Actions.excludeNodeById(nodes, nodeId);
    // TO-DO: kill all children recursevly
    setNodes(childlessNodes);

    // TO-DO: removeDownEdges(edge)
  };

  const value = {
    nodes,
    pushNode,
    killNode,
  };

  if (!initialized) return <div>{children}</div>;

  return <TreeContext.Provider value={value}>{children}</TreeContext.Provider>;
};

export const useTree = () => useContext(TreeContext);
