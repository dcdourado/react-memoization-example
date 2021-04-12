import React, {
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { nanoid } from "nanoid";
import Styles from "./style.module.css";

const Node = (props) => {
  const { name, fatherId, children } = props;

  const [selfId, _UNSAFE_setSelfId] = useState(nanoid());
  const [hasMounted, setMounted] = useState(false);

  // const Tree = useContext();
  const Tree = {
    pushNode: () => {},
    clearNodeLine: (a, b) => {},
    drawLineBetweenNodes: (a, b) => {},
  };
  const self = useRef();

  // @doc "Waits component screen loading"
  useLayoutEffect(() => {
    if (hasMounted) {
      return;
    }

    Tree.pushNode({
      self: { ...self, id: selfId },
      fatherId,
    });
    Tree.clearNodeLine(fatherId, selfId);
    Tree.drawLineBetweenNodes(fatherId, selfId);
    setMounted(true);
  }, [hasMounted, Tree, fatherId, selfId]);

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
