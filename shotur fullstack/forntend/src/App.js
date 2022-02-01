import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Index from "./components";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.title = "Short URL";
  }, []);
  return <Index />;
}

export default App;
