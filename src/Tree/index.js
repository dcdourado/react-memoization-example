import React, { useState } from "react";

import Logger from "../Logger";
import Actions from "./actions";

const Context = React.createContext();

const Tree = (props) => {
  const { children } = props;

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const pushNode = ({ self, selfId, fatherId }) => {
    const node = Actions.generateNode(self, selfId);
    const plusChildNodes = Actions.appendChild(nodes, node, fatherId);
    setNodes(plusChildNodes);

    const refreshedEdges = Actions.refreshDownEdges(plusChildNodes, [], fatherId);
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


