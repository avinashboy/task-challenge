import React, { useContext, useEffect, useState } from "react";
import { Short } from "../context";
import AuthChecking from "./common/AuthChecking";
import { toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const axios = require("axios");
const moment = require("moment");

function Profile() {
  const [profile, setProfile] = useState({});
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const { data, setData } = useContext(Short);

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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteMyAccount = async () => {
    const headers = { Authorization: `Bearer ${data.authToken}` };
    await axios
      .delete(`${data.appURL}user`, { headers })
      .then((res) => {
        handleClose();
        if ("Successful Deleted" === res.data.message)
          showUp(res.data.message, true);
          localStorage.clear();
          setData({ ...data, authToken: null });
        setTimeout(() => {
          navigate("/login");
        }, 5000);
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

  useEffect(() => {
    const getProfile = async () => {
      const headers = { Authorization: `Bearer ${data.authToken}` };
      await axios
        .get(`${data.appURL}user/profile`, { headers })
        .then((res) => {
          setProfile({ ...res.data });
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

    getProfile();
  }, []);

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <>
      <AuthChecking />
      <div className='container py-5'>
        <div className='jumbotron jumbotron-fluid'>
          <h1 className='display-4 mb-4'>Account Information</h1>
          {Object.keys(profile).map((key, index) => (
            <p className='lead mt-2' key={key}>
              {" "}
              <b>{capitalize(key)}</b> :{" "}
              {key === "date"
                ? moment(profile[key]).format("lll")
                : profile[key]}
            </p>
          ))}
          <hr className='my-4' />

          <p className='lead'>
            <Button variant='danger' onClick={handleShow}>
              Delete account
            </Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title></Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h2>Are you sure you want to delete your account?</h2>
              </Modal.Body>
              <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>
                  Close
                </Button>
                <Button variant='danger' onClick={deleteMyAccount}>
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
          </p>
        </div>
      </div>
    </>
  );
}

export default Profile;
