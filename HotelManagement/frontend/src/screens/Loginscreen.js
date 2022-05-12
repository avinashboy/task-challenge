import React, { useState ,useContext } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { useNavigate } from "react-router-dom";
import { Smooth } from "../context";


function Loginscreen() {
  const { data,setData } = useContext(Smooth);
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();

  async function Login() {
    const user = {
      email,
      password,
    };
    try {
      setloading(true);
      const gg = await axios.post(`${data.appUrl}/api/users/login`, user);
      setloading(false);
      localStorage.setItem("currentUser", JSON.stringify(gg.data));
      setData((prev) => ({ ...prev, metaInfo: gg.data }));
     navigate("/");
    } catch (error) {
      setloading(false);
      seterror(true);
    }
  }
  return (
    <>
    
    <div className="row mb-5">
      <div className="col-md-4 mx-auto mt-5 ">
        {loading && <Loader />}
        <div className=" mt-5">
          {error && <Error message="Invalid Credentials" />}

          <div className="bs">
            <b>
              <h2> Login</h2>
            </b>

            <input
              type="text"
              className="form-control mb-4"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />

            <button className="btn btn-primary mt-3" onClick={Login}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Loginscreen;
