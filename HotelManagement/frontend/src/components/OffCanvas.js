import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";
import { Smooth } from "../context";
import Loader from "../components/Loader";

function OffCanvas() {
  
  const [chooseRoomId, setChooseRoomId] = useState("");
  const [orderRoom, setOrderRoom] = useState([]);
  const [loading, setloading] = useState(false);
  const { data, setData } = useContext(Smooth);
  const [totalAmount, setTotalAmount] = useState(0);
  const amountArr = data.foodList
    .map((food) => food.price * food.count)
    .reduce((a, b) => a + b, 0);

  const handleUp = (id) => {
    const indexOfObject = data.foodList.findIndex((food) => food.id === id);
    if (indexOfObject > -1) {
      data.foodList[indexOfObject].count += 1;
      return setData((prev) => ({
        ...prev,
        foodList: [...data.foodList],
      }));
    }
  };

  const handleDown = (id) => {
    const indexOfObject = data.foodList.findIndex((food) => food.id === id);
    if (indexOfObject > -1 && data.foodList[indexOfObject].count > 1) {
      data.foodList[indexOfObject].count -= 1;
      return setData((prev) => ({
        ...prev,
        foodList: [...data.foodList],
      }));
    }
  };

  const removeItem = (id) => {
    const indexOfObject = data.foodList.findIndex((food) => food.id === id);
    if (indexOfObject > -1) {
      data.foodList.splice(indexOfObject, 1);
      return setData((prev) => ({
        ...prev,
        foodList: [...data.foodList],
      }));
    }
  };

  useEffect(() => {
    const getBookInfoForUser = async () => {
      const info = await axios.post(`${data.appUrl}/api/bookings/getbookingsbyuserid`, {
        userid: data.metaInfo?._id,
      });
      setOrderRoom(info.data);
    };
    getBookInfoForUser();
  }, []);

  useEffect(() => {
    localStorage.setItem("foodList", JSON.stringify(data.foodList));
  }, [data.foodList]);

  useEffect(() => {
    setTotalAmount(amountArr);
  }, [amountArr]);

  const onToken = async (token) => {
    const foodDetails = {
      foodList: data.foodList,
      userid: data.metaInfo?._id,
      totalAmount,
      token,
      roomid: chooseRoomId,
    };
    setloading(true);
    await axios
      .post(`${data.appUrl}/api/foods/foodpayment`, foodDetails)
      .then((res) => {
        Swal.fire("Order", "Your Order has been placed", "success");
        setData((prev) => ({
          ...prev,
          foodList: [],
        }));
        setChooseRoomId("");
        setloading(false);
      })
      .catch((err) => {
        Swal.fire("Failed", "Something went wrong", "error");
      });
  };

  return (
    <>
      <button
        className="btn btn-primary position-relative"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasWithBothOptions"
        aria-controls="offcanvasWithBothOptions"
      >
        {data.foodList.length > 0 ? (
          <>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {data.foodList.length}
              <span className="visually-hidden">unread messages</span>
            </span>
          </>
        ) : null}
        <i className="fa-solid fa-cart-shopping"></i>
      </button>

      <div
        className="offcanvas offcanvas-end"
        data-bs-scroll="true"
        tabIndex="-1"
        id="offcanvasWithBothOptions"
        aria-labelledby="offcanvasWithBothOptionsLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">
            Your Food Order
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          
          <div>
            <div className="mb-3">
              {data.foodList.length > 0 ? (
                <>
                  {data.foodList.map((food) => (
                    <div
                      className="card mb-3"
                      style={{ maxWidth: "540px" }}
                      key={food.id}
                    >
                      <div className="row g-0">
                        <div className="col-md-4">
                          <img
                            src={food.image}
                            className="card-img-top rounded-start"
                            alt={food.name}
                            style={{ height: "100%" }}
                          />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <h5 className="card-title">{food.name}</h5>
                            <p className="card-text">Price: ${food.price}</p>

                            <p className="card-text">
                              <small
                                className="text-muted mr-3"
                                style={{
                                  fontSize: "1rem",
                                }}
                              >
                                Quantity: {food.count}
                              </small>
                              <small className="text-muted mr-3 p-3">
                                <i
                                  className="fa-solid fa-angle-down"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="bottom"
                                  title="down"
                                  style={{
                                    cursor: "pointer",
                                    fontSize: "1.2rem",
                                  }}
                                  onClick={() => handleDown(food.id)}
                                ></i>
                              </small>
                              <small className="text-muted mr-3 ">
                                <i
                                  className="fa-solid fa-angle-up"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="bottom"
                                  title="up"
                                  style={{
                                    cursor: "pointer",
                                    fontSize: "1.2rem",
                                  }}
                                  onClick={() => handleUp(food.id)}
                                ></i>
                              </small>
                              <small className="text-muted mr-3 p-3">
                                <i
                                  className="fa-solid fa-xmark"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="bottom"
                                  title="remove item"
                                  style={{
                                    cursor: "pointer",
                                    fontSize: "1.2rem",
                                  }}
                                  onClick={() => removeItem(food.id)}
                                ></i>
                              </small>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <h1>No Order Yet</h1>
              )}
            </div>
            {data.foodList.length > 0 ? (
              <>
                <div className="mb-3 d-flex justify-content-center">
                  <h5>Total Amount: ${totalAmount}</h5>
                </div>
                {orderRoom.length > 0 ? (
                  <div className="mb-3 d-flex flex-column align-items-center">
                    <h5>Which hotel to delivery</h5>
                    {orderRoom.map((room) => (
                      <div className="mb-2" key={room._id}>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="orderroom"
                            value={`${room.roomid}///${room.room}`}
                            checked={
                              `${room.roomid}///${room.room}` ===
                              chooseRoomId
                            }
                            onChange={(e) => setChooseRoomId(e.target.value)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault1"
                          >
                            {room.room}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
                <div className="mb-3 d-flex justify-content-center">
                  {chooseRoomId && (
                    <StripeCheckout
                      amount={totalAmount * 100}
                      token={onToken}
                      currency="USD"
                      stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
                    >
                      <button className="btn btn-primary">Order Now</button>
                    </StripeCheckout>
                  )}
                </div>
              </>
            ) : null}
          </div>
          {loading && <Loader/>}
        </div>
      </div>
    </>
  );
}

export default OffCanvas;
