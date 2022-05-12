import React, { useState, useEffect, useContext, useMemo } from "react";
import { Smooth } from "../context";
import moment from "moment";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { truncate } from "../utils";
import { Tag } from "antd";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import DorpZone from "../components/DorpZone";
import Swal from "sweetalert2";

const initial = {
  roomid: "",
  roomname: "",
  userid: "",
  username: "",
  usermessage: "",
  userimage: "",
};

function Talkscreen() {
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");
  const { data } = useContext(Smooth);
  const [count, setCount] = useState(0);
  const [froms, setFroms] = useState([]);
  const [show, setShow] = useState(false);
  const [roomComplaints, setRoomComplaints] = useState(initial);
  const [roomDetails, setRoomDetails] = useState([]);
  const [imgageurl1, setimageurl1] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (error) setTimeout(() => seterror(""), 4000);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (value === "") alert("Please selected the room");

    if (name === "type") {
      const { room, roomid } = roomDetails.filter(
        (room) => room.room === value
      )[0];
      setRoomComplaints((prev) => ({
        ...prev,
        roomid,
        roomname: room,
        userid: data.metaInfo?._id,
        username: data.metaInfo?.name,
      }));
    }

    setRoomComplaints((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const memoization = useMemo(
    () => (
      <DorpZone
        setimageurl1={setimageurl1}
        maxLength={1}
        multiple={false}
        path="complaints"
      />
    ),
    [imgageurl1]
  );

  const handleSubmit = async (e) => {

    await axios
      .post(`${data.appUrl}/api/froms/addfroms`, roomComplaints)
      .then((res) => {

        Swal.fire("Your complaint has been register", "success");
        setCount((prev) => prev + 1);
      })
      .catch((err) => {
        Swal.fire("Oops", "Try again.!", "error");
      });

    handleClose();
  };

  useEffect(() => {
    setRoomComplaints({
      ...roomComplaints,
      userimage: imgageurl1,
    });
  }, [imgageurl1]);

  useEffect(() => {
    const getData = async () => {
      setloading(true);
      try {
        const info = await axios.post(`${data.appUrl}/api/froms/getfromsstatusbyuserid`, {
          userid: data.metaInfo?._id,
        });
        setloading(false);
        setFroms(info.data);
      } catch (error) {
        seterror("Something went wrong");
      }
    };

    const getBookInfoForUser = async () => {
      try {
        const info = await axios.post(`${data.appUrl}/api/bookings/getbookingsbyuserid`, {
          userid: data.metaInfo?._id,
        });
        setRoomDetails(info.data);
      } catch (error) {
        seterror("Can't get the room details for users");
      }
    };
    getBookInfoForUser();
    getData();
  }, [count]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h2>Complaint Status</h2>
          </div>
          <div className="col-md-12 d-flex flex-row-reverse">
            <>
              <Button variant="primary" onClick={handleShow}>
                Add Complaint
              </Button>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Complaint Froms</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="mx-auto">
                    <select
                      className="form-control mb-4"
                      name="type"
                      value={roomComplaints.roomname}
                      onChange={handleChange}
                    >
                      <option value="">Select Hotel</option>
                      {roomDetails.map((room) => (
                        <option key={room?._id} value={room?.room}>
                          {room?.room}
                        </option>
                      ))}
                    </select>
                    <div className="mb-2">
                      <textarea
                        className="form-control"
                        name="usermessage"
                        value={roomComplaints.usermessage}
                        placeholder="Type message"
                        style={{ height: "100px" }}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                    <div className="mb-2">{memoization}</div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleSubmit}>
                    Submit
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          </div>
          <div className="row nomore">
            <div className="col-md-6 mb-5 mx-auto">
              {loading && <Loader />}
              {error && <Error message={error} />}
              {froms.length > 0 &&
                froms.map((froms) => {
                  return (
                    <div className="bs" key={froms?._id}>
                      <h1>{froms?.roomname}</h1>
                      <p>
                        <b>Hotel Name:</b> {froms?.roomname}
                      </p>

                      <p>
                        <b>Message:</b> {froms?.usermessage}
                      </p>
                      <div>
                        <div className="mb-2 d-flex align-items-center">
                          <a target="_blank" href={froms?.userimage}>
                            <img
                              src={froms?.userimage}
                              alt={froms?.roomname}
                              style={{
                                height: "100px",
                                width: "100px",
                                borderRadius: "10px",
                              }}
                            />
                          </a>
                        </div>
                      </div>
                      <p>
                        {" "}
                        <b>Status:</b>{" "}
                        {froms?.status === "closed" ? (
                          <Tag color="green">CLOSED</Tag>
                        ) : (
                          <Tag
                            color={
                              froms?.status === "pending" ? "yellow" : "red"
                            }
                          >
                            {froms?.status.toUpperCase()}
                          </Tag>
                        )}
                      </p>
                    </div>
                  );
                })}

              {!froms.length ? <h1>No Data</h1> : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Talkscreen;
