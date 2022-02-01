import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AuthChecking from "./common/AuthChecking";
import Analytics from "./home/Analytics";
import CreateLink from "./home/CreateLink";
import ListData from "./home/ListData";
import { Short } from "../context";
import axios from "axios";
import { toast } from "react-toastify";

function Home() {
  const [getId, setGetId] = useState("");

  const { data, setData } = useContext(Short);

  const getListLink = async () => {
    const headers = { Authorization: `Bearer ${data.authToken}` };
    await axios
      .get(`${data.appURL}short`, { headers })
      .then((res) => {
        if(res.data.length <= 0) return false
        setGetId(res?.data[0].id);
        setData({ ...data, linksInfo: res.data });
      })
      .catch((err) => {
        showUp("something went wrong");
      });
  };

  useEffect(() => {
    getListLink();
  }, []);

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

  return (
    <>
      <AuthChecking />
      <Container fluid className='mt-5'>
        <Row className='d-flex justify-content-center'>
          <Col className='showme justify-content-md-center' xs lg='2'>
            <h3>Create link</h3>
          </Col>
          <CreateLink getListLink={getListLink} />
        </Row>
        <Container className='mt-5 show_list_link mb-5 '>
          <div className='showme scroll show_list_link_info flex-inner p-2'>
            <ListData setGetId={setGetId} />
          </div>
          <div className='showme flex-inner p-2'>
            <Analytics id={getId} setGetId={setGetId} />
          </div>
        </Container>
      </Container>
    </>
  );
}

export default Home;
