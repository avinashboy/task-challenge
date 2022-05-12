import React, { useContext, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Smooth } from "../context";

const initial = {
  name: "",
  email: "",
  password: "",
  cpassword: "",
};

function Registerscreen() {
  const navigate = useNavigate();
  const {data} = useContext(Smooth);
  const [datas, setData] = useState(initial);

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();
  const [success, setsuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  async function register() {
    if (datas.password === datas.cpassword) {
      try {
        setloading((e) => !e);
        await axios.post(`${data.appUrl}/api/users/register`, datas);
        setloading((e) => !e);
        setsuccess(true);
        setData(initial);
        setTimeout(() => {navigate("/login");}, 3000);
      } catch (error) {
        setloading(false);
        seterror(true);
      }
    } else {
      Swal.fire({ icon: "error", text: "Password and Confirm Password must be same" });
    }
  }
  return (
    <>
      <div className="row mt-5 mb-5">
        <div className="col-md-4 mx-auto ">
          {error && <Error />}
          {loading && <Loader />}
          {success && <Success message="Registration Success" />}
          <div className="bs">
            <b>
              <h2> Register</h2>
            </b>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Name"
              name="name"
              value={datas.name}
              onChange={handleChange}
            />
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Email"
              name="email"
              value={datas.email}
              onChange={handleChange}
            />
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Password"
              name="password"
              value={datas.password}
              onChange={handleChange}
            />
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Confirm Password"
              name="cpassword"
              value={datas.cpassword}
              onChange={handleChange}
            />

            <button className="btn btn-primary mt-3" onClick={register}>
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Registerscreen;
