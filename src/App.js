import Node from "./Node";

import "./App.css";

function App() {
  return (
    <div className="App">
      <h2>Memoization Nodes</h2>

      <Node name="Apartamento">
        {(props) => (
          <>
            <Node name="Diogo" {...props} />
            <Node name="Pati" {...props} />
          </>
        )}
      </Node>
    </div>
  );
}

export default App;
