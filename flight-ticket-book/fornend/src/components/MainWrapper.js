import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useContext } from "react";
import to from "../images/to.png";
import form from "../images/form.png";
import { notifyError } from "../helper";
import { locationName } from "../constant";
import { Flight } from "../context";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const initial = {
  from: "",
  destination: "",
  departure: "",
  return: "",
  adult: 0,
  children: 0,
  way: false,
};

function MainWrapper() {
  const navigate = useNavigate();
  const { setData } = useContext(Flight);
  const futureDay = new Date();
  futureDay.setDate(futureDay.getDate() + 3);
  const [way, setWay] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(futureDay);
  const [fill, setFill] = useState(initial);

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    const isBool = value === "true" ? true : false;
    setWay((pre) => isBool);
  };

  const handleClick = () => {
    if (fill.from === fill.destination)
      return notifyError("Source and Destination cannot be same");
    setFill((pre) => ({
      ...pre,
      departure: startDate,
      return: way ? returnDate : null,
    }));
    setData((pre) => ({ ...pre, searchData: fill }));
    navigate("/search");
  };

  return (
    <>
      <Container className='mt-5 mb-5'>
        <h1 className='text-center'>Book Domestic Flight Tickets</h1>
        <Row>
          <div className='col-md-6 mx-auto'>
            <div className='card card-body bg-light mt-2'>
              <Col md={12}>
                <div className='d-flex justify-content-around'>
                  <span className='mr-4'>
                    <Form.Check
                      type='radio'
                      label='One-way'
                      name='radio'
                      value={false}
                      onChange={handleChange}
                    />
                  </span>
                  <span>
                    <Form.Check
                      type='radio'
                      label='Round-trip'
                      name='radio'
                      value={true}
                      onChange={handleChange}
                    />
                  </span>
                </div>
              </Col>
              {/* input from */}
              <Col md={12} className='mt-4'>
                <InputGroup className='mb-3'>
                  <InputGroup.Text id='basic-addon1'>
                    <img
                      alt='logo-images'
                      src={form}
                      width='25'
                      height='25'
                      className='d-inline-block align-top'
                    />
                  </InputGroup.Text>
                  <Form.Select
                    onChange={(event) => {
                      setFill((pre) => ({
                        ...pre,
                        from: event.target.value,
                      }));
                    }}
                  >
                    <option>From</option>
                    {locationName.map((location, index) => (
                      <option key={index} value={location}>
                        {location}
                      </option>
                    ))}
                  </Form.Select>
                </InputGroup>
              </Col>
              {/* input to */}
              <Col md={12} className='mt-4'>
                <InputGroup className='mb-3'>
                  <InputGroup.Text id='basic-addon1'>
                    <img
                      alt='logo-images'
                      src={to}
                      width='25'
                      height='25'
                      className='d-inline-block align-top'
                    />
                  </InputGroup.Text>
                  <Form.Select
                    onChange={(event) => {
                      setFill((pre) => ({
                        ...pre,
                        destination: event.target.value,
                      }));
                    }}
                  >
                    <option>Destination</option>
                    {locationName.map((location, index) => (
                      <option key={index} value={location}>
                        {location}
                      </option>
                    ))}
                  </Form.Select>
                </InputGroup>
              </Col>
              {/* Departure */}
              <Col md={12} className='mt-4'>
                <Row>
                  <Col md={6} xs={12}>
                    <div>
                      <label className='form-label'>Departure</label>
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        minDate={new Date()}
                      />
                    </div>
                  </Col>
                  <Col md={6} xs={12}>
                    {way && (
                      <div>
                        <label className='form-label'>Return</label>
                        <DatePicker
                          selected={returnDate}
                          onChange={(date) => setReturnDate(date)}
                          minDate={new Date()}
                        />
                      </div>
                    )}
                  </Col>
                </Row>
              </Col>
              {/* memeber */}
              <Col md={12} className='mt-4'>
                <Row>
                  <Col md={6}>
                    <div>
                      <Form.Label htmlFor='inputPassword5'>Adult</Form.Label>
                      <Form.Control
                        type='number'
                        id='inputPassword5'
                        onChange={(event) => {
                          const { value } = event.target;
                          setFill((pre) => ({
                            ...pre,
                            adult: +value,
                          }));
                        }}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div>
                      <Form.Label htmlFor='inputPassword6'>Children</Form.Label>
                      <Form.Control
                        type='number'
                        id='inputPassword6'
                        onChange={(event) => {
                          const { value } = event.target;
                          setFill((pre) => ({
                            ...pre,
                            children: +value,
                          }));
                        }}
                      />
                    </div>
                  </Col>
                </Row>
              </Col>
              {/* button */}
              <Col md={12} className='mt-3'>
                <div className='d-grid gap-2'>
                  <Button variant='primary' size='lg' onClick={handleClick}>
                    Search
                  </Button>
                </div>
              </Col>
            </div>
          </div>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default MainWrapper;
