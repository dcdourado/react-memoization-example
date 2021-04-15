import React, { useContext, useEffect, useState } from "react";

import Logger from "../Logger";
import Actions from "./actions";

const Context = React.createContext();

export const TreeContext = (props) => {
  const { children } = props;

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  Logger.info(`Node count: ${nodes.length}`);
  Logger.info(`Edge count: ${edges.length}`);

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

  const value = {
    nodes,
    pushNode,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useTree = () => useContext(TreeContext);
