import LineTo from "react-lineto";

const buildNode = (id, fatherId) => ({
  id,
  fatherId,
});

const findNode = (nodes, id) => nodes.find((n) => n.id === id);

const excludeNode = (nodes, id) => nodes.filter((n) => n.id !== id);

const buildEdges = (nodes) => {
  return(nodes
    .map((n) => {
      const father = Actions.findNode(nodes, n.fatherId);

      if (!father) {
        return undefined;
      }

      return <LineTo from={n.id} to={father.id} key={`from-${n.id}-to-${father.id}`} />;
    })
    .filter((e) => e !== undefined));
}

const Actions = {
  buildNode,
  findNode,
  excludeNode,
  buildEdges,
};

export default Actions;
