import React, { useLayoutEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";

import { useTree } from "../Tree";

import Styles from "./style.module.css";
import Logger from "../Logger";

const Node = (props) => {
  const { name, fatherId, children } = props;

  const self = useRef(null);
  // eslint-disable-next-line
  const [selfId, _UNSAFE_setSelfId] = useState(nanoid());
  const [hasMounted, setMounted] = useState(false);

  const Tree = useTree();

  // @doc "Waits component screen loading"
  useLayoutEffect(() => {
    const initialized = Tree && self && selfId;
    if (!initialized) {
      return;
    }

    if (hasMounted) {
      return;
    }

    Logger.info(`Mounting ${name} node`);

    Tree.pushNode({ self, selfId, fatherId });
    setMounted(true);

    // return () => Tree.killNode(selfId);
  }, [hasMounted, Tree, self, selfId, fatherId, name]);

  return (
    <div ref={self} className={Styles.self}>
      <div className={Styles.leaf}>
        <span>{name}</span>
      </div>
      <div className={Styles.children}>
        {children !== undefined && children({ fatherId: selfId })}
      </div>
    </div>
  );
};

export default Node;
