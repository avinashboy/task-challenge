import React, { useState, useEffect, useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import Loader from "../components/Loader";
import Error from "../components/Error";
import axios from "axios";
import Swal from "sweetalert2";
import { Smooth } from "../context";

function Modals({ from, setCount }) {
  const {data} = useContext(Smooth);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [type, setType] = useState("");

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");

  const handleSubmit = async () => {
    if (type === "") return false;
    await axios
      .put(`${data.appUrl}/api/froms/updateUserStatus/${from._id}`, { type })
      .then((res) => {
        Swal.fire({
          title: "Success",
          text: "Update successfull",
          icon: "success",
        });
        setCount((prev) => prev + 1);
      })
      .catch((err) => {
        Swal.fire({ title: "Error", text: "Update failed", icon: "error" });
      });
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <i className="fa-solid fa-file-pen"></i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading && <Loader />}
          {error && <Error />}
          <p>
            <b>Hotel Name:</b> {from.roomname}
          </p>

          <p>
            <b>Message:</b> {from.usermessage}
          </p>

          {from.userimage && (
            <p>
              <b>Image:</b>{" "}
              <a target="_blank" href={from?.userimage}>
                <img
                  src={from?.userimage}
                  style={{
                    height: "100px",
                    width: "100px",
                    borderRadius: "10px",
                  }}
                  alt={from?.roomname}
                />
              </a>
            </p>
          )}
          <select
            className="form-control mb-2"
            value={type}
            name="type"
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Select Option</option>
            <option value="reject">Reject</option>
            <option value="closed">Closed</option>
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Modals;
