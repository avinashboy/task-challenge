import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";
import { Formik, Form } from "formik";
import { TextField } from "../common/TextField";
import * as Yup from "yup";
import axios from "axios";
import { Short } from "../../context";
import {  toast } from "react-toastify";

const initial = {
  fullUrl: "",
};

function CreateLink({ getListLink }) {
  const [url, setUrl] = useState(initial);

  const [show, setShow] = useState(false);
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
    const createShortLink = async () => {
      const headers = { Authorization: `Bearer ${data.authToken}` };
      await axios
        .post(`${data.appURL}short`, url, { headers })
        .then((res) => {
          if (res.status === 201 && res.statusText === "Created")
            return (
              showUp(res.data.message, true), setUrl(initial), getListLink()
            );
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

    if (url.fullUrl) return createShortLink();
  }, [url.fullUrl]);

  const validate = Yup.object({
    url: Yup.string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        "URL is invalid"
      )
      .required("URL is required"),
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Col className='showme d-flex flex-row-reverse' xs lg='2'>
      <Button variant='primary' onClick={handleShow}>
        Add
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create short link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initial}
            validationSchema={validate}
            onSubmit={(values) => {
              setUrl({
                ...url,
                fullUrl: values.url,
              });
            }}
          >
            {(formik) => (
              <div>
                <Form>
                  <TextField label='URL' name='url' type='text' />
                  <Row className='mt-5'>
                    <Col md={12} className='d-grid gap-2'>
                      <Button
                        variant='primary'
                        type='submit'
                        size='lg'
                        onClick={handleClose}
                      >
                        Save
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </div>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </Col>
  );
}

export default CreateLink;
