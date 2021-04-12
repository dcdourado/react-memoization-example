import Node from "./Node";

import "./App.css";

function App() {
  return (
    <div className="App">
      <h2>Hello world</h2>

      <Node name="Apartamento">
        <Node name="Humanos">
          <Node name="Pati" />
          <Node name="Diogo" />
        </Node>
        <Node name="Gatas">
          <Node name="Shimeji" />
          <Node name="Tufinha" />
        </Node>
        <Node name="Akita" />
      </Node>

      {/* <Node name="Grandfather 1">
        <Node name="Father 1">
          <Node name="Child 1" />
          <Node name="Child 2" />
        </Node>
        <Node name="Father 2">
          <Node name="Child 3" />
        </Node>
      </Node> */}
    </div>
  );
}

export default App;
