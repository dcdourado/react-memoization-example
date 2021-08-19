const buildNode = (id, fatherId) => ({
  id,
  fatherId,
});

const findNode = (nodes, id) => nodes.find((n) => n.id === id);

const excludeNode = (nodes, id) => nodes.filter((n) => n.id !== id);

const Actions = {
  buildNode,
  findNode,
  excludeNode,
};

export default Actions;
