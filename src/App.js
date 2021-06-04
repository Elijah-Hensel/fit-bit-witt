import "./App.css";
import Navigation from "./components/Navigation";
import Pages from "./components/Pages";

function App() {
  return (
    <div>
      <header>
        <Navigation />
      </header>
      <main style={{ marginTop: "100px", display: "flex" }}>
        <Pages />
      </main>
    </div>
  );
}

export default App;
