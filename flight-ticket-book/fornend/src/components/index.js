import MainWrapper from "./MainWrapper";
import NavHeader from "./NavHeader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "../context";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import Search from "./Search";

function index() {
  return (
    <>
    <Router>
      <ToastContainer />
      <Provider>
        <NavHeader />
      <Switch>
      <Route path='/search' element={<Search />} />
      <Route path='/' element={<MainWrapper />} />
      </Switch>
      </Provider>
      </Router>
     
    </>
  );
}

export default index;
