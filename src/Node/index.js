import React, { useLayoutEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";

import { useTree } from "../Tree";

import Styles from "./style.module.css";

const Node = (props) => {
  const { name, fatherId, children } = props;

  const self = useRef(null);
  const [selfId, _UNSAFE_setSelfId] = useState(nanoid());
  const [hasMounted, setMounted] = useState(false);

  const Tree = useTree();

  // @doc "Waits component screen loading"
  useLayoutEffect(() => {
    if (hasMounted) {
      // NO-OP
      return;
    }

    Tree.pushNode({ self, selfId, fatherId });
    setMounted(true);

    // return () => Tree.killNode(selfId);
  }, [hasMounted, Tree, selfId, fatherId]);

  return (
    <div ref={self} className={Styles.self}>
      <div className={Styles.leaf}>
        <span>{name}</span>
      </div>
      <div className={Styles.children}>{children}</div>
    </div>
  );
};

export default Node;
