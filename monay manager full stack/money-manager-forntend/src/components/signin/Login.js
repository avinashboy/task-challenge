import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Nav, Button } from "react-bootstrap";
import { Formik, Form } from "formik";
import { TextField } from "../common/TextField";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Tracker} from "../../context/context"
import { useNavigate } from "react-router-dom";


const initial = {
  email: "",
  password: "",
};

function Login() {
  const navigate = useNavigate();

  const {appURL} = useContext(Tracker)


  const [sendToServer, setSendToServer] = useState(initial);

  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  let signin = async () => {
    axios
      .post(`${appURL}users/login`, sendToServer)
      .then((res) => {
        if (res.data.token) {
          toast.success("Login", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
          navigate('/')
          setSendToServer(initial)
          return 
        }else {
          toast.error(res.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          return;
        }
        
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const {email, password} = sendToServer
    if(email && password) return signin();
  }, [sendToServer]);

  return (
    <div className="container mt-5 py-4">
      <ToastContainer />
      <Formik
        initialValues={initial}
        validationSchema={validate}
        onSubmit={(values) => {
          setSendToServer({
            ...sendToServer,
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
              <TextField label="password" name="password" type="text"  />
              <Row className="mt-5">
                <Col md={12} className="d-flex justify-content-between">
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                  <Nav.Link href="/register">Register</Nav.Link>
                </Col>
              </Row>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default Login;
