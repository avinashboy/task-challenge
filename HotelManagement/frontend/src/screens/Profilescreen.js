import React, { useState, useEffect, useContext } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Loader from "../components/Loader";
// import Error from "../components/Error";
import Swal from "sweetalert2";
import { Tag, Row, Col } from "antd";
import { Smooth } from "../context";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { truncate } from "../utils";

const { TabPane } = Tabs;

function Profilescreen() {
  const navigate = useNavigate();
  const { data } = useContext(Smooth);

  useEffect(() => {
    if (!data.metaInfo) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="ml-5 mt-3 nomore">
      <Tabs defaultActiveKey="2">
        <TabPane
          tab={<span style={{ marginLeft: "10px" }}>Bookings</span>}
          key="2"
        >
          <MyBookings />
        </TabPane>

        <TabPane
          tab={<span style={{ marginLeft: "10px" }}>Food</span>}
          key="3"
        >
          <MyFood />
        </TabPane>
        <TabPane tab={<span>Profile</span>} key="1">
          <div className="container">
            <h1>My Profile</h1>
            <br />
            <h1> Name : {data.metaInfo?.name}</h1>
            <h1>Email : {data.metaInfo?.email}</h1>
            <h1>
              Join Date : {moment(data.metaInfo?.createdAt).format("MMM Do YY")}
            </h1>
            <h1>Role : {data.metaInfo?.role}</h1>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Profilescreen;

export function MyFood(){
  
  const [loading, setloading] = useState(false);
  const { data } = useContext(Smooth);
  const [count, setCount] = useState(0);
  const [foodBookings, setFoodBookings] = useState([]);

  useEffect(() => {
    const getData = async () => {
      setloading(true);
      const gg = await axios.get(`${data.appUrl}/api/foods/getfoodbookingsbyuserid/${data.metaInfo?._id}`)
      setFoodBookings(gg.data)
      setloading(false);
    }
    getData();
  },[]);

  return(
    <>
     <div className="row nomore">
        <div className="col-md-6 mb-5 mx-auto">
          {loading && <Loader />}
          {foodBookings.length &&
            foodBookings.map((foodBooking) => {
              return (
                <div className="bs" key={foodBooking?._id}>
                  <h1>{foodBooking?.roomname}</h1>
                  <p>
                    <b>Food-Id:</b> {foodBooking?._id}
                  </p>
                  <p>
                    <b>Amount:</b> ${foodBooking?.totalAmount}
                  </p>
                  <div>
                    {
                      foodBooking?.foodList.map((list)=>(
                        <div key={list?.id} className="mb-2 d-flex justify-content-around align-items-center">
                          <img src={list?.image} alt="" style={{height: "100px", width: "100px", borderRadius: "10px"}} />
                          <b>{truncate(list?.name,15)}</b>
                          <b>Quantity: {list?.count}</b>
                        </div>
                      ))
                    }
                  </div>
                  <p>
                    {" "}
                    <b>Status:</b>{" "}
                    {foodBooking?.status === "pending" ? (
                      <Tag color="yellow">PENDING</Tag>
                    ) : (
                      <Tag color="green">DELIVERY</Tag>
                    )}
                  </p>
                  {/* {booking.status !== "cancelled" && (
                    <div className="text-right">
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          cancelBooking(booking._id, booking.roomid);
                        }}
                      >
                        CANCEL BOOKING
                      </button>
                    </div>
                  )} */}
                </div>
              );
            })}

          {!foodBookings.length ? <h1>No Data</h1> : null}
        </div>
      </div>
    </>
  )
}

export function MyBookings() {
  const { data } = useContext(Smooth);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();
  const [count, setCount] = useState(0);
  const [bookings, setbookings] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        setloading(true);
        const gg = await axios.post(`${data.appUrl}/api/bookings/getbookingsbyuserid`, {
          userid: data.metaInfo?._id,
        });

        setbookings(gg.data);
        setloading(false);
      } catch (error) {
        setloading(false);
        seterror(error);
      }
    }

    fetchData();
  }, [count]);

  async function cancelBooking(bookingid, roomid) {
    try {
      setloading(true);
      const gg = await axios.post(`${data.appUrl}/api/bookings/cancelbooking`, {
        bookingid,
        roomid,
      });
      setCount((count) => count + 1);
      setloading(false);
      Swal.fire("Congrats", "Your Booking has been cancelled", "success");
    } catch (error) {
      setloading(false);
      Swal.fire("Something Went wrong", "error");
    }
  }
  return (
    <>
      <div className="row nomore">
        <div className="col-md-6 mb-5 mx-auto">
          {loading && <Loader />}
          {bookings.length &&
            bookings.map((booking) => {
              return (
                <div className="bs" key={booking._id}>
                  <h1>{booking.room}</h1>
                  <p>
                    <b>BookingId:</b> {booking._id}
                  </p>
                  <p>
                    <b>CheckIn:</b> {booking.fromdate}
                  </p>
                  <p>
                    <b>Check out:</b> {booking.todate}
                  </p>
                  <p>
                    <b>Amount:</b> ${booking.totalamount}
                  </p>
                  <p>
                    {" "}
                    <b>Status:</b>{" "}
                    {booking.status === "cancelled" ? (
                      <Tag color="red">CANCELLED</Tag>
                    ) : (
                      <Tag color="green">CONFIRMED</Tag>
                    )}
                  </p>
                  {booking.status !== "cancelled" && (
                    <div className="text-right">
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          cancelBooking(booking._id, booking.roomid);
                        }}
                      >
                        CANCEL BOOKING
                      </button>
                    </div>
                  )}
                </div>
              );
            })}

          {!bookings.length ? <h1>No Data</h1> : null}
        </div>
      </div>
    </>
  );
}
