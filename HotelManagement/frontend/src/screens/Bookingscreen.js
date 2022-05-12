import React, { useState, useEffect,useContext } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import {Smooth} from "../context"

function Bookingscreen() {
  const { data } = useContext(Smooth);
  const navigate = useNavigate();
  const params = useParams();
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  const [room, setroom] = useState();
  const fromdate = moment(params.fromdate, "DD-MM-YYYY");
  const todate = moment(params.todate, "DD-MM-YYYY");
  const totaldays = moment.duration(todate.diff(fromdate)).asDays() + 1;
  const [totalamount, settotalamount] = useState();

  useEffect(() => {
    if (!data.metaInfo) {
      return navigate("/login");
    }
    const getData = async () => {
      await axios
        .get(`${data.appUrl}/api/rooms/getroombyid/${params.roomid}`)
        .then((res) => {
          setloading(true);
          setroom(res.data);

          setloading(false);
          settotalamount(res.data.rentperday * totaldays);
        })
        .catch((err) => {
          seterror(true);
          setloading(false);
        });
    };
    getData();
  }, []);

  async function onToken(token) {
    const bookingDetails = {
      room,
      userid: data.metaInfo?._id,
      fromdate,
      todate,
      totalamount,
      totaldays,
      token,
    };
    try {
      setloading(true);
      const gg = await axios.post(
        `${data.appurl}/api/bookings/bookroom`,
        bookingDetails
      );
      setloading(false);
      Swal.fire("Congratulations", "Your Room Booked Successfully", "success");
      navigate("/profile");
    } catch (error) {
      setloading(false);
      Swal.fire("OOPs", "Something Went wrong", "error");
    }
  }
  return (
    <div className="m-5">
      {loading ? (
        <Loader />
      ) : room ? (
        <div>
          <div className="row justify-content-center mt-5 bs">
            <div className="col-md-6">
              <h1>{room.name}</h1>
              <img
                src={room.imageurls[0]}
                alt="error_booking"
                className="bigimg"
              />
            </div>
            <div className="col-md-6">
              <div style={{ textAlign: "right" }}>
                <h1>Booking Details</h1>

                <hr />
                <b>
                  <p>
                    Name :{" "}
                    {JSON.parse(localStorage.getItem("currentUser"))?.name}
                  </p>

                  <p>From Date : {params.fromdate}</p>
                  <p>To Date :{params.todate} </p>
                  <p>Max count : {room.maount}</p>
                </b>
              </div>

              <div style={{ textAlign: "right" }}>
                <h1>Amount</h1>
                <hr />
                <b>
                  <p>Total days : {totaldays}</p>
                  <p>Rent per day : ${room.rentperday}</p>
                  <p>Total amount : ${totalamount}</p>
                </b>
              </div>
              <div style={{ float: "right" }}>
                <StripeCheckout
                  amount={totalamount * 100}
                  token={onToken}
                  currency="USD"
                  stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
                >
                  <button className="btn btn-primary">Pay Now </button>
                </StripeCheckout>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default Bookingscreen;
