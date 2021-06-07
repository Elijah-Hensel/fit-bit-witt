import "./App.css";
import React, {useEffect, useState} from "react";
import Navigation from "./components/Navigation";
import Pages from "./components/Pages";

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const isLoggedIn = () => {
    if (localStorage.getItem("token")) {
      setLoggedIn(true)
    }
  }
  useEffect(() => {
    isLoggedIn()
  }, [loggedIn])
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
