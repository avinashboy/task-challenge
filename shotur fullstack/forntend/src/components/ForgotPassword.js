import React, { useState, useEffect, useContext } from "react";
import { Formik, Form } from "formik";
import { Row, Col, Button } from "react-bootstrap";
import { TextField } from "./common/TextField";
import * as Yup from "yup";
import axios from "axios";
import { Short, initial as base } from "../context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const initial = { email: "" };

function ForgotPassword() {
  const [forgot, setForgot] = useState(initial);

  const navigate = useNavigate();
  const { data , setData} = useContext(Short);

  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
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
    const forgotPassword = () => {
      setForgot(initial);
      axios
        .post(`${data.appURL}user/forgot`, forgot)
        .then((res) => {
          showUp(res.data.message, true);
          setData({...data, ...base})
          setTimeout(() => {
            navigate("/login");
            setForgot(initial);
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

    if (forgot.email) return forgotPassword();
  }, [forgot]);
  return (
    <div className='container mt-5 py-4'>
      <Formik
        initialValues={initial}
        validationSchema={validate}
        onSubmit={(values) => {
          setForgot({ ...forgot, email: values.email });
        }}
      >
        {(formik) => (
          <div>
            <h1 className=''>Enter Registered Email</h1>
            <Form>
              <TextField label='Email' name='email' type='text' />
              <Row className='mt-5'>
                <Col md={12} className='d-flex justify-content-between'>
                  <Button variant='primary' size='lg' type='submit'>
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default ForgotPassword;
