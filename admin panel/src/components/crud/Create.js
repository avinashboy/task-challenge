import { useState, useContext, useEffect } from "react";
import Footer from "../wrapper/Footer";
import NavBar from "../wrapper/NavBar";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Row, Col, Button } from "react-bootstrap";
import { TextField } from "../common/TextField";
import { Con } from "../../context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

let initial = {
  name: "",
  email: "",
};

function Create() {
  const { data, setData } = useContext(Con);
  console.log("data:", data.changeData);

  const navigate = useNavigate();

  const [sendToServer, setSendToServer] = useState(initial);
  const [check, setCheck] = useState(initial);
  console.log("sendToServer:", sendToServer);

  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    name: Yup.string().required("name is required"),
  });

  useEffect(() => {
    const getPreData = async () => {
      await axios
        .get(`${data.appUrl}users/${data.changeData}`)
        .then((res) => {
          console.log("res:", res.data);
          const { email, name } = res.data;
          setCheck((preData) => ({
            ...preData,
            email,
            name,
          }));
          setSendToServer((preData) => ({
            ...preData,
            email,
            name,
          }));
        })
        .catch((err) => {
          console.log(err);
        });
    };

    if (data.changeData) return getPreData();
  }, [data.changeData]);

  useEffect(() => {
    const sendTheData = async () => {
      await axios
        .post(`${data.appUrl}users`, sendToServer)
        .then((res) => {
          if (res.status === 201 && res.statusText === "Created")
            return navigate("/view");
        })
        .catch((err) => {
          console.log("err:", err);
        });
    };

    const changeData = async () => {
      await axios
        .put(`${data.appUrl}users/${data.changeData}`, sendToServer)
        .then((res) => {
          setData((preData) => ({
            ...preData,
            changeData: "",
          }));
          if (res.status === 200 && res.statusText === "OK")
            return navigate("/view");
        })
        .catch((err) => {
          console.log("err:", err);
        });
    };

    if (
      (sendToServer.name !== check.name ||
        sendToServer.email !== check.email) &&
      data.changeData
    )
      return changeData();
    if (sendToServer.name && sendToServer.email && !data.changeData)
      return sendTheData();
  }, [sendToServer.name, sendToServer.email]);

  return (
    <>
      <div id='content-wrapper' className='d-flex flex-column'>
        <div id='content'>
          <NavBar />
          <Formik
            initialValues={initial}
            validationSchema={validate}
            onSubmit={(values) => {
              setSendToServer({
                ...sendToServer,
                email: values.email,
                name: values.name,
              });
            }}
          >
            {(formik) => (
              <div className='p-4'>
                <h1 className=''>Entry</h1>
                <Form>
                  <TextField label='name' name='name' type='text' />
                  <TextField label='Email' name='email' type='text' />
                  <Row className='mt-5'>
                    <Col md={12} className='d-flex justify-content-between'>
                      <Button variant='primary' type='submit'>
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </div>
            )}
          </Formik>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Create;
