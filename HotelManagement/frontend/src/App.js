import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Homescreen from "./screens/Homescreen";
import Bookingscreen from "./screens/Bookingscreen";
import Registerscreen from "./screens/Registerscreen";
import Loginscreen from "./screens/Loginscreen";
import Profilescreen from "./screens/Profilescreen";
import Adminscreen from "./screens/Adminscreen";
import Managerscreen from "./screens/Managerscreen";
import Error from "./components/Error";
import { Smooth } from "./context";
import { useContext } from "react";
import OrderFood from "./screens/OrderFood";
import Talkscreen from "./screens/Talkscreen";

function App() {
  const { data } = useContext(Smooth);
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Homescreen />} />
        <Route path="/register" element={<Registerscreen />} />
        <Route path="/login" element={<Loginscreen />} />

        {data.metaInfo?.role === "user" && (
          <>
            <Route
              path="/book/:roomid/:fromdate/:todate"
              element={<Bookingscreen />}
            />
            <Route path="/profile" element={<Profilescreen />} />
            <Route path="/orderfood" element={<OrderFood />} />
            <Route path="/complaint" element={<Talkscreen />} />
          </>
        )}

        {data.metaInfo?.role === "admin" && (
          <>
            <Route path="/admin" element={<Adminscreen />} />
          </>
        )}

        {data.metaInfo?.role === "manager" && (
          <>
            <Route path="/orderfood" element={<OrderFood />} />
            <Route path="/manager" element={<Managerscreen />} />
          </>
        )}
        <Route
          path="*"
          element={
            <Error message="Not found page" spaceM="mt-5" spaceP="py-5" />
          }
        />
      </Routes>
    </>
  );
}

export default App;
