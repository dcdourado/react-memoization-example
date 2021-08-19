import React, { useLayoutEffect, useState } from "react";
import { nanoid } from "nanoid";

import { useTree } from "../Tree";

import Styles from "./style.module.css";
import Logger from "../Logger";

const Node = (props) => {
  const { name, fatherId, children } = props;

  // eslint-disable-next-line
  const [id, _UNSAFE_setId] = useState(nanoid());
  const [hasMounted, setMounted] = useState(false);

  const Tree = useTree();

  // @doc "Waits component screen loading"
  useLayoutEffect(() => {
    const initialized = Tree && id;
    if (!initialized) {
      return;
    }

    if (hasMounted) {
      return;
    }

    Logger.info(`Mounting ${name} node`);

    Tree.pushNode({ id, fatherId });
    setMounted(true);

    // return () => Tree.killNode(id);
  }, [hasMounted, Tree, id, fatherId, name]);

  return (
    <div className={Styles.self}>
      <div className={`${Styles.leaf} ${id}`}>
        <span>{name}</span>
      </div>
      <div className={Styles.children}>
        {children !== undefined && children({ fatherId: id })}
      </div>
    </div>
  );
};

export default Node;
