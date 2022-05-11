import React, { useState, useContext, useEffect,useMemo } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Smooth } from "../context";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";

function Room({ room, fromdate, todate }) {
  const { data } = useContext(Smooth);
  const [reviewText, setReviewText] = useState("");
  const [count, setCount] = useState(0);
  const [listReview, setListReview] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleReview = () => {
    const newReview = {
      userid: data.metaInfo?._id,
      description: reviewText,
      name: data.metaInfo?.name,
      roomid: room._id,
      date: new Date(),
    };
    axios
      .post(`/api/reviews/addreview`, newReview)
      .then((res) => {
        Swal.fire({ title: "Success", text: "Review added successfully" });
        setCount((prev) => prev + 1);
        setReviewText("");
      })
      .catch((err) => {
        Swal.fire({ title: "Error", text: "Something went wrong" });
      });
  };

  const handleReviewMemory = useMemo(() => handleReview, [reviewText]);

  const handleDeleteReview = async (id) => {
    await axios
      .delete(`/api/reviews/deletereview/${id}`)
      .then((res) => {
        Swal.fire({ title: "Success", text: "Deleted successfully" });
        setCount((prev) => prev + 1);
      })
      .catch((err) => {
        Swal.fire({
          title: "Error",
          text: "You can't delete the review",
        });
      });
  };

  useEffect(() => {
    const getReviewById = async () => {
      const { data } = await axios.get(
        `/api/reviews/getroomreviewbyid/${room._id}`
      );
      setListReview(data);
    };

    getReviewById();
  }, [count]);

  return (
    <div className="row bs">
      <div className="col-md-4">
        <img src={room.imageurls[0]} alt="error" className="smallimg" />
      </div>

      <div className="col-md-7">
        <h1>{room.name}</h1>
        <b>
          <p>Max Count: {room.maxcount}</p>
          <p>Phone Number: {room.phonenumber}</p>
          <p>Type: {room.type}</p>
        </b>

        <div style={{ float: "right" }}>
          {fromdate && todate && (
            <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
              <Button className="btn btn-primary m-2">Book Now</Button>
            </Link>
          )}

          <button className="btn btn-primary" onClick={handleShow}>
            {" "}
            View Details
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel prevLabel="" nextLabel="">
            {room.imageurls.map((url, index) => {
              return (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100 bigimg"
                    src={url}
                    alt="Third slide"
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <p>{room.description}</p>
          <br />
          <h4>Review</h4>
          {/* send review */}
          <div className="d-flex justify-content-start align-items-center mb-4">
            <span style={{ fontSize: "22px", margin: "0 1rem" }}>
              {data.metaInfo?.name}
            </span>
            <div style={{ fontSize: "25px", margin: "0 .75rem" }}>
              <input
                type="text"
                placeholder="Review"
                className="form-control"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
            </div>
            <div style={{ fontSize: "20px", margin: "0 .75rem" }}>
              <i
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Send"
                className="fa-solid fa-paper-plane"
                style={{ cursor: "pointer" }}
                onClick={handleReviewMemory}
              ></i>
            </div>
          </div>
          {/* display review */}
          <div>
            {listReview.length > 0 ? (
              <>
                {listReview.map((review) => (
                  <div key={review?._id} className="">
                    <div className="d-flex justify-content-start align-items-center">
                      <span style={{ fontSize: "18px", margin: "0 .75rem" }}>
                        <i className="fa-solid fa-user"></i> {review?.name}
                      </span>
                      <span style={{ fontSize: "12px" }}>
                        {moment(review?.date).fromNow()}
                      </span>
                      {review?.userid === data.metaInfo?._id && (
                        <span style={{ fontSize: "18px", margin: "0 .75rem" }}>
                          <i
                            className="fa-solid fa-trash"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleDeleteReview(review._id)}
                          ></i>
                        </span>
                      )}
                    </div>
                    <div>
                      <p
                        className="text-muted"
                        style={{ fontSize: "24px", margin: ".5rem" }}
                      >
                        {review?.description}
                      </p>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <span>No review yet...</span>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Room;
