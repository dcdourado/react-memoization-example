import React, { useContext, useEffect, useState } from "react";
import LineTo from "react-lineto";

import Logger from "../Logger";
import Actions from "./actions";

export const TreeContext = React.createContext();

export const TreeProvider = (props) => {
  const { children } = props;

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    Logger.info("Node report")
    Logger.log(nodes)
  }, [nodes])

  useEffect(() => {
    Logger.info("Edge report")
    Logger.log(edges)
  }, [edges])

  const pushNode = ({ id, fatherId }) => {
    Logger.info(`Pushing node ${id}`);

    const node = Actions.buildNode(id, fatherId);
    setNodes((nodes) => [node, ...nodes]);

    return;
  };

  const refreshEdges = () => {
    Logger.info("Refreshing edges")

    setEdges(nodes
      .map((n) => {
        const father = Actions.findNode(nodes, n.fatherId);

        if (!father) {
          return undefined;
        }

        return <LineTo from={n.id} to={father.id} key={`from-${n.id}-to-${father.id}`} />;
      })
      .filter((e) => e !== undefined));

    return;
  }

  const killNode = (nodeId) => {
    Logger.info(`Killed node ${nodeId}`);

    const childlessNodes = Actions.excludeNode(nodes, nodeId);
    // TO-DO: kill all children recursevly
    setNodes(childlessNodes);

    // TO-DO: removeDownEdges(edge)
  };

  const value = {
    nodes,
    pushNode,
    edges,
    refreshEdges,
    killNode,
  };

  return <TreeContext.Provider value={value}>{children}</TreeContext.Provider>;
};

export const useTree = () => useContext(TreeContext);
