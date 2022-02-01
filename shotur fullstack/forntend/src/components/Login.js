import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Formik, Form } from "formik";
import { TextField } from "./common/TextField";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { Short } from "../context";
import { useNavigate, Link } from "react-router-dom";

const initial = {
  email: "",
  password: "",
};

function Login() {
  const [login, setLogin] = useState(initial);
  

  const navigate = useNavigate();
  const {data, setData} = useContext(Short);

  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const showUp = (message, isError = false) => {
    if (isError) {
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };



  useEffect(() => {

    const loginup = () => {
      axios
        .post(`${data.appURL}user/login`, login)
        .then((res) => {
          if(res.data.token){
            setLogin(initial)
            localStorage.setItem('token', res.data.token)
            setData({...data,authToken:res.data.token}) 
            navigate("/")
          } else {
            showUp(res.data.message)
          }
        })
        .catch((err) => {
          const {response : {data : {message}}} = err
          showUp(message);
        });
    };

    const { email, password } = login;
    if (email && password) return loginup();
  }, [login]);

  return (
    <div className="container mt-5 py-4">
      <Formik
        initialValues={initial}
        validationSchema={validate}
        onSubmit={(values) => {
          setLogin({
            ...login,
            email: values.email,
            password: values.password,
          });
        }}
      >
        {(formik) => (
          <div>
            <h1 className="">Login</h1>
            <Form>
              <TextField label="Email" name="email" type="text" />
              <TextField label="password" name="password" type="password" />

              <Row className="mt-5">
                <Col md={12} className="d-flex justify-content-between">
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                  <div className="d-flex flex-lg-column">
                    <span><Link className="no_link"  to="/forgot">Forgot Password ?</Link></span>
                  </div>
                </Col>
              </Row>
            </Form>
            <hr/>
            <div className="text-center">Don’t have an account?<Link className="no_link" to="/register"> Register</Link></div>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default Login;
