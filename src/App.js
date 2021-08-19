import { useTree } from "./Tree";
import Node from "./Node";

import "./App.css";

function App() {
  const Tree = useTree();

  const handleClick = () => {
    Tree.refreshEdges();
  }

  return (
    <div className="App">
      <h2>Memoization Nodes</h2>

      <button onClick={handleClick}>Refresh edges</button>

      <Node name="Apartamento">
        {(props) => (
          <>
            <Node name="Diogo" {...props} />
            <Node name="Pati" {...props} />
          </>
        )}
      </Node>

      {Tree.edges}
    </div>
  );
}

export default App;
