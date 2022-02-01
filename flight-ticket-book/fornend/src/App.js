import {useEffect} from "react"
import Index from './components';
import 'bootstrap/dist/css/bootstrap.min.css';

const disableReactDevTools = () => {
  const noop = () => undefined;
  const DEV_TOOLS = (window).__REACT_DEVTOOLS_GLOBAL_HOOK__;

  if (typeof DEV_TOOLS === 'object') {
      for (const [key, value] of Object.entries(DEV_TOOLS)) {
          DEV_TOOLS[key] = typeof value === 'function' ? noop : null;
      }
  }
};

function App() {
  useEffect(() => {
    document.title = "Flights | Ticket";
  }, []);
  return (
    <Index/>
  );
}

export default App;
