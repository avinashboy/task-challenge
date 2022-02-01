import React, { useState, useContext, useEffect } from "react";
import {
  Row,
  Col,
  Button,
  Container,
  Modal,
  Form,
  FloatingLabel,
} from "react-bootstrap";
import axios from "axios";
import { Tracker } from "../../context/context";
import { incomeCategories, expenseCategories } from "../../constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DisplayCard from "./DiplayCard";
import HistoryList from "./HistoryList";
import moment from "moment";

const initialState = {
  cost: "",
  category: "Business",
  subCategory: "Office",
  type: "Income",
  description: "",
  date: new Date(),
};

const editInitial = {
  id: "",
};

function Wrapper() {
  const [formData, setFormData] = useState(initialState);
  const [editOptions, setEditOptions] = useState(editInitial);
  const [historyRecord, setHistoryRecord] = useState([]);

  const { appURL } = useContext(Tracker);
  const [show, setShow] = useState(false);
  const [showTwo, setShowTwo] = useState(false);
  const [filter, setFilter] = useState("Both");
  const [showInfo, setShowInfo] = useState("");
  const [choiceTwoDate, setChoiceTwoDate] = useState({ start: "", end: "" });


  const getData = () => {
    console.log("getdata");
    axios
      .get(`${appURL}`)
      .then((res) => {
        if (
          res.data.message === "Access denied." ||
          res.data.message === "Invalid token."
        ) {
          return showUp(res.data.message);
        }
        if (res.data.length === 0)
          return showUp("No History"), setHistoryRecord(res.data);
        setHistoryRecord(res.data);
      })
      .catch((error) => console.error(error));
  };

  const deleteTransaction = (id) => {
    axios
      .delete(`${appURL}${id}`)
      .then((res) => {
        if (res.data.success === "Successful deleted") {
          showUp(res.data.message, true);
          return getData();
        } else {
          showUp(res.data.message);
        }
      })
      .catch((error) => console.error(error));
  };

  const editTransaction = (id) => {
    setEditOptions({ ...editOptions, id: id });
    const { category, subCategory, description, date, cost, type } =
      historyRecord.filter((e) => e._id === id)[0];
    const data = {
      category,
      subCategory,
      description,
      date: date.slice(0, 16),
      cost,
      type,
    };
    setFormData({ ...formData, ...data });
    handleShow();
  };

  const getTransactionInfo = ({ url }) => {
    axios
      .get(url)
      .then((res) => {
        if (res.data.length > 0) return setHistoryRecord(res.data);
      })
      .catch((error) => console.log(error));
  };

  const getShowInfo = () => {
    const date = new Date();
    console.log(showInfo.toLowerCase());

    if (showInfo.toLowerCase() === "none") return getData();

    if (showInfo.toLowerCase() === "weekly") {
      const url = `${appURL}between?start=${date}&mode=weekly`;
      return getTransactionInfo({ url });
    }

    if (showInfo.toLowerCase() === "monthly") {
      const url = `${appURL}between?start=${date}&mode=monthly`;
      return getTransactionInfo({ url });
    }

    if (showInfo.toLowerCase() === "yearly") {
      const url = `${appURL}between?start=${date}&mode=yearly`;
      return getTransactionInfo({ url });
    }

    if (showInfo.toLowerCase() === "twodate") {
      console.log("okay tewo date");
      handleShowTwo();
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getShowInfo();
  }, [showInfo]);

  const showUp = (message, state = false) => {
    if (state) {
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

  const sendData = (data) => {
    axios
      .post(`${appURL}`, data)
      .then((res) => {
        if ("Successful created" === res.data.message) {
          showUp(res.data.message, true);
          getData();
        } else {
          showUp(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  const editData = ({ data, extraDate }) => {
    const datas = { ...data, extraDate };

    axios
      .put(`${appURL}${editOptions.id}`, datas)
      .then((res) => {
        if (res.data.message === "Successful updated") {
          showUp(res.data.message, true);
          setFormData(initialState);
          setEditOptions(editInitial);
          handleClose();
          getData();
          return;
        } else {
          return showUp(res.data.message);
        }
      })
      .catch((error) => console.log(error));
  };

  const createTransaction = () => {
    if (editOptions.id)
      return editData({ data: formData, extraDate: new Date() });
    if (!formData.cost) return showUp("Fill the amount");
    if (!formData.description) return showUp("Fill the description");
    sendData(formData);
    setFormData(initialState);
    handleClose();
  };

  const historyFilter = ({ historyRecord, mode }) => {
    if (mode !== "Both")
      return historyRecord.filter(
        (h) => h.subCategory.toLowerCase() === filter.toLowerCase()
      );
    return historyRecord;
  };

  const filterData = ({ data, mode, title }) => {
    if (mode !== "Both")
      return data.filter(
        (e) =>
          e.type.toLowerCase() === title.toLowerCase() &&
          e.subCategory.toLowerCase() === filter.toLowerCase()
      );

    return data.filter((e) => e.type.toLowerCase() === title.toLowerCase());
  };

  const checkingDate = () => {
    const diffDays = (date, otherDate) => Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24));

    if (Date.parse(choiceTwoDate.start) >= Date.parse(choiceTwoDate.end)) return showUp("End date should be greater than Start date");

    if (diffDays(new Date(choiceTwoDate.start), new Date(choiceTwoDate.end)) !== 2) return showUp("Select Two Date Only");

    const url = `${appURL}between?start=${choiceTwoDate.start}&end=${choiceTwoDate.end}&mode=twodate`;
    getTransactionInfo({ url });
    return handleCloseTwo()
  };

  const handleCloseTwo = () => (
    setShowTwo(false), setChoiceTwoDate({ start: "", end: "" })
  );
  const handleShowTwo = () => setShowTwo(true);

  const handleClose = () => (
    setShow(false), setFormData(initialState), setEditOptions(editInitial)
  );
  const handleShow = () => setShow(true);
  const selectedCategories =
    formData.type === "Income" ? incomeCategories : expenseCategories;
  return (
    <>
      <Container>
        {/* two data */}
        <Modal show={showTwo} onHide={handleCloseTwo}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12}>
                <FloatingLabel controlId="floatingInputGrid" label="Start">
                  <Form.Control
                    type="date"
                    value={choiceTwoDate.start}
                    onChange={(e) =>
                      setChoiceTwoDate({
                        ...choiceTwoDate,
                        start: e.target.value,
                      })
                    }
                  />
                </FloatingLabel>
              </Col>
              <Col md={12} className="mt-3">
                <FloatingLabel controlId="floatingInputGrid" label="end">
                  <Form.Control
                    type="date"
                    value={choiceTwoDate.end}
                    onChange={(e) =>
                      setChoiceTwoDate({
                        ...choiceTwoDate,
                        end: e.target.value,
                      })
                    }
                  />
                </FloatingLabel>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseTwo}>
              Close
            </Button>
            <Button variant="primary" onClick={checkingDate}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <ToastContainer />
        {/* filter adding */}
        <Row className="mt-5">
          <Col md={12} className="d-flex justify-content-between">
            <div className="d-flex justify-content-between">
              <FloatingLabel
                className="p-1"
                controlId="floatingSelect"
                label="Filter"
              >
                <Form.Select
                  aria-label="Floating label select example"
                  value={showInfo}
                  onChange={(e) => setShowInfo(e.target.value)}
                >
                  <option value="None">None</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
                  <option value="TwoDate">Two Date</option>
                </Form.Select>
              </FloatingLabel>
              <FloatingLabel
                className="p-1"
                controlId="floatingSelect"
                label="Filter"
              >
                <Form.Select
                  aria-label="Floating label select example"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="Both">Both</option>
                  <option value="Office">Office</option>
                  <option value="Personal">Personal</option>
                </Form.Select>
              </FloatingLabel>
            </div>
            {/* add the data */}
            <div>
              <Button variant="primary" onClick={handleShow}>
                Add
              </Button>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Add </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Row>
                    <Col md={6} className="mb-3">
                      <FloatingLabel
                        controlId="floatingSelect"
                        label="Sub Category"
                      >
                        <Form.Select
                          value={formData.subCategory}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              subCategory: e.target.value,
                            })
                          }
                        >
                          <option value="Office">Office</option>
                          <option value="Personal">Personal</option>
                        </Form.Select>
                      </FloatingLabel>
                    </Col>
                    <Col md={6} className="mb-3">
                      <FloatingLabel label="Type">
                        <Form.Select
                          value={formData.type}
                          onChange={(e) =>
                            setFormData({ ...formData, type: e.target.value })
                          }
                        >
                          <option value="Income">Income</option>
                          <option value="Expense">Expense</option>
                        </Form.Select>
                      </FloatingLabel>
                    </Col>
                    <Col md={6} className="mb-3">
                      <FloatingLabel label="Category">
                        <Form.Select
                          value={formData.category}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              category: e.target.value,
                            })
                          }
                        >
                          {selectedCategories.map((c) => (
                            <option key={c.type} value={c.type}>
                              {c.type}
                            </option>
                          ))}
                        </Form.Select>
                      </FloatingLabel>
                    </Col>
                    <Col md={6}>
                      <FloatingLabel controlId="floatingInputGrid" label="">
                        <Form.Control
                          type="datetime-local"
                          value={formData.date}
                          onChange={(e) =>
                            setFormData({ ...formData, date: e.target.value })
                          }
                        />
                      </FloatingLabel>
                    </Col>
                    <Col md={6}>
                      <FloatingLabel
                        controlId="floatingInputGrid"
                        label="Amount"
                      >
                        <Form.Control
                          type="number"
                          value={formData.cost}
                          onChange={(e) =>
                            setFormData({ ...formData, cost: e.target.value })
                          }
                        />
                      </FloatingLabel>
                    </Col>
                    <Col md={6}>
                      <FloatingLabel
                        controlId="floatingInputGrid"
                        label="Description"
                      >
                        <Form.Control
                          type="text"
                          value={formData.description}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              description: e.target.value,
                            })
                          }
                        />
                      </FloatingLabel>
                    </Col>
                  </Row>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={createTransaction}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </Col>
        </Row>
        {/* graph dount */}
        <Row className="mt-5">
          <Col md={12} className="mb-4 text-center">
            <h2>{filter === "Both" ? "Both office & Personal" : filter}</h2>
          </Col>
          <Col md={6} className="mb-4 text-center">
            <DisplayCard
              title="Income"
              data={filterData({
                data: historyRecord,
                mode: filter,
                title: "Income",
              })}
            />
          </Col>
          <Col md={6} className="mb-4 text-center">
            <DisplayCard
              title="Expense"
              data={filterData({
                data: historyRecord,
                mode: filter,
                title: "Expense",
              })}
            />
          </Col>
        </Row>
        {/* history */}
        <Row className="mt-5">
          <Col md={12}>
            <HistoryList
              data={historyFilter({ historyRecord, mode: filter })}
              deleteTransaction={deleteTransaction}
              editTransaction={editTransaction}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Wrapper;
