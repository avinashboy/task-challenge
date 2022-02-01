import { useContext } from "react";
import { Flight } from "../context";
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import { companyName, randomPrice, minNumber } from "../constant";
import { Link } from "react-router-dom";
import DataChecked from "./common/DataChecked";
import Footer from "./Footer";
import { notifyError, notifySuccess } from "../helper";
import logo from "../images/logo.png";
import axios from "axios";

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => reject(false);
    document.body.appendChild(script);
  });
}

async function verify({ payLoad, url }) {
  await axios
    .post(`${url}`, { ...payLoad })
    .then((res) => {
      if(res.data.success) return notifySuccess("Successful done");
    })
    .catch((err) => {
      console.log(err.response.data.message);
    });
}

function Search() {
  const { data } = useContext(Flight);
  console.log("data:", data);

  const razorPayMethod = ({ amount, currency, id }) => {
    const options = {
      key: process.env.REACT_APP_KEY_ID,
      amount: amount,
      currency: currency,
      name: "Flight ticket",
      description: "Book your ticket by free method",
      image: logo,
      order_id: id,
      handler: (response) => {
        const payLoad = {
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
        };
        verify({ payLoad, url: `${data.appUrl}checking` });
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#0E6EFD",
      },
    };

    const paymentOption = new window.Razorpay(options);
    paymentOption.on("payment.failed", function (response) {
      console.log("response:", response.error.reason);
    });
    paymentOption.open();
  };

  const displayrazorPay = async (event) => {
    const price =
      event.target.parentNode.parentNode.parentNode.parentNode.children[1]
        .children[1].children[1].innerText;
    if (!window.Razorpay) {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!res) return notifyError("Network Error");
    }

    const payLoad = {
      price: +price,
      adult: data.searchData.adult,
      children: data.searchData.children,
      way: data.searchData.way,
    };

    await axios
      .post(`${data.appUrl}payment`, { ...payLoad })
      .then((res) => {
        razorPayMethod(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <DataChecked />
      <Container className='mt-5 mb-5'>
        <Link to='/'>
          <i className='fas fa-arrow-left fa-3x'></i>
        </Link>
        <h1 className='text-center'>Flight Lists</h1>
        <div className='mb-5 col-md-8 mx-auto'>
          {companyName.map((company, index) => (
            <Row key={index}>
              <Col md={12} className='show-me flight-list'>
                <Row className='mt-2'>
                  <Col md={6} className='text-capitalize fs-4 text mb-2'>
                    Airlines : {company}
                  </Col>
                  <Col md={6} className='text-capitalize fs-4 text'>
                    {data.searchData?.from} -> {data.searchData?.destination}
                  </Col>
                </Row>
                <Row className='mt-3'>
                  <Col md={6} className='fs-4 text mb-3'>
                    <span className='text-capitalize'>availability</span>:{" "}
                    {minNumber()} / 200
                  </Col>
                  <Col md={6} className='fs-2 text'>
                    <span>Price:</span> ₹<span>{randomPrice()}</span>
                  </Col>
                </Row>
                <Row className='mt-3'>
                  <Col md={12}>
                    <div className='d-grid gap-2'>
                      <Button
                        variant='primary'
                        size='lg'
                        onClick={displayrazorPay}
                      >
                        Pay
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          ))}
        </div>
      </Container>
      <Footer />
    </>
  );
}

export default Search;
