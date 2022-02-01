import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Formik, Form } from "formik";
import { TextField } from "./common/TextField";
import * as Yup from "yup";
import axios from "axios";
import {  toast } from "react-toastify";
import { Short } from "../context";
import { useNavigate, Link } from "react-router-dom";

const initial = {
  email: "",
  username: "",
};

function Register() {
  const [register, setRegister] = useState(initial);

  const navigate = useNavigate();
  const { data } = useContext(Short);

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
    const registerup = () => {
      axios
        .post(`${data.appURL}user/register`, register)
        .then((res) => {
          setRegister(initial);
          showUp(res.data.message, true);
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        })
        .catch((err) => {
          const {
            response: {
              data: { message },
            },
          } = err;
          showUp(message);
        });
    };
    const { email, username } = register;
    if (email && username) return registerup();
  }, [register]);

  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    username: Yup.string().required("user name is required"),
  });
  return (
    <div className='container mt-5 py-4'>
      <Formik
        initialValues={initial}
        validationSchema={validate}
        onSubmit={(values) => {
          setRegister({
            ...register,
            username: values.username,
            email: values.email,
          });
        }}
      >
        {(formik) => (
          <div>
            <h1 className=''>Register</h1>
            <Form>
              <TextField label='User Name' name='username' type='text' />
              <TextField label='Email' name='email' type='text' />
              <Row className='mt-5'>
                <Col md={12} className='d-flex justify-content-between'>
                  <Button variant='primary' type='submit'>
                    Submit
                  </Button>
                  <span>
                    Already registered User?{" "}
                    <Link className='no_link' to='/login'>
                      Login
                    </Link>
                  </span>
                </Col>
              </Row>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default Register;
