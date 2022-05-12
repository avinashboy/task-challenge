import React, { useState, useEffect, useContext, useMemo } from "react";
import { Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import { Smooth } from "../context";
import Loader from "../components/Loader";
import Error from "../components/Error";
import axios from "axios";
import Swal from "sweetalert2";
import DorpZone from "../components/DorpZone";
import moment from "moment";
import { truncate } from "../utils";
import Modals from "../components/Modals";

const { TabPane } = Tabs;

function Managerscreen() {
  const navigate = useNavigate();
  const { data } = useContext(Smooth);

  useEffect(() => {
    if (data.metaInfo?.role !== "manager") {
      navigate("/");
    }
  }, []);
  return (
    <div className="mt-3 ml-3 mr-3 bs">
      <h2 className="text-center" style={{ fontSize: "30px" }}>
        {" "}
        <b>Manager Panel</b>
      </h2>
      <Tabs defaultActiveKey="5">
        <TabPane tab="Bookings" key="1">
          <Bookings />
        </TabPane>
        <TabPane tab="Foods" key="2">
          <Foods />
        </TabPane>
        <TabPane tab="Add Food" key="3">
          <AddFood />
        </TabPane>
        <TabPane tab="Food Order" key="4">
          <FoodOrder />
        </TabPane>
        <TabPane tab="Complaint" key="5">
          <ComplaintFroms />
        </TabPane>
        <TabPane tab="Staff" key="6">
          {/* <Staff /> */}
        </TabPane>
      </Tabs>
    </div>
  );
}

export function Bookings() {
  const {data} = useContext(Smooth);
  const [bookings, setbookings] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();

  useEffect(() => {
    async function getData() {
      try {
        const gg = await axios.get(`${data.appUrl}/api/bookings/getallbookings`);
        setbookings(gg.data);
        setloading(false);
      } catch (error) {
        setloading(false);
        seterror(error);
      }
    }
    getData();
  }, []);
  return (
    <div className="row">
      <div className="col-md-12 mx-auto">
        <h1>Bookings</h1>
        {loading && <Loader />}
        <table className="table table-bordered table-dark">
          <thead className="bs thead-dark">
            <tr>
              <th>No.S</th>
              <th>Booking Id</th>
              <th>User Id</th>
              <th>Room</th>
              <th>From</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length ? (
              <>
                {bookings.length &&
                  bookings.map((booking, index) => {
                    return (
                      <tr key={booking._id}>
                        <td>{index + 1}</td>
                        <td>{booking._id}</td>
                        <td>{booking.userid}</td>
                        <td>{booking.room}</td>
                        <td>{booking.fromdate}</td>
                        <td>{booking.status}</td>
                      </tr>
                    );
                  })}
              </>
            ) : (
              <tr>
                <td colSpan="6">No Data</td>
              </tr>
            )}
          </tbody>
        </table>
        {bookings.length && (
          <h1> There are a total of {bookings.length} bookings</h1>
        )}
      </div>
    </div>
  );
}

export function FoodOrder() {
  const {data} = useContext(Smooth);
  const [foods, setFoods] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();

  useEffect(() => {
    async function getData() {
      try {
        const gg = await axios.get(`${data.appUrl}/api/foods/orderfoods`);
        setFoods(gg.data);
        setloading(false);
      } catch (error) {
        setloading(false);
        seterror(error);
      }
    }

    getData();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12 mx-auto">
        <h1>Food Order</h1>
        {loading && <Loader />}
        <table className="table table-bordered table-dark">
          <thead className="bs thead-dark">
            <tr>
              <th>No.S</th>
              <th>Room Id</th>
              <th>User Id</th>
              <th>Room</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {foods.length ? (
              <>
                {foods.length &&
                  foods.map((food, index) => {
                    return (
                      <tr key={food._id}>
                        <td>{index + 1}</td>
                        <td>{food.roomid}</td>
                        <td>{food.userid}</td>
                        <td>{food.roomname}</td>
                        <td>{food.status}</td>
                      </tr>
                    );
                  })}
              </>
            ) : (
              <tr>
                <td colSpan="6">No Data</td>
              </tr>
            )}
          </tbody>
        </table>
        {foods.length && (
          <h1>
            {" "}
            There are a total pending{" "}
            {foods.map((food) => food.status === "pending").length} foods order
          </h1>
        )}
      </div>
    </div>
  );
}

export function Foods() {
  const {data} = useContext(Smooth);
  const [count, setCount] = useState(0);
  const [foods, setFoods] = useState([]);
  const [duplicateFoods, setDuplicateFoods] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  const [type, settype] = useState("all");

  function filterByType(e) {
    settype(e);
    if (e.toLowerCase() !== "all") {
      const tempFoods = duplicateFoods.filter(
        (user) => user?.type.toLowerCase() === e.toLowerCase()
      );
      setFoods(tempFoods);
    } else {
      setFoods(duplicateFoods);
    }
  }

  const handleDelete = async (id) => {
    await axios
      .delete(`${data.appUrl}/api/foods/deletefood/${id}`)
      .then((res) => {
        Swal.fire("Done", "Deleted Successfully", "success");
        setCount((pre) => pre + 1);
      })
      .catch((err) => {
        Swal.fire("Bad", "Something Went Wrong", "danger");
      });
  };

  useEffect(() => {
    async function getData() {
      try {
        const gg = await axios.get(`${data.appUrl}/api/foods/getfoods`);
        setFoods(gg.data);
        setDuplicateFoods(gg.data);
        setloading(false);
      } catch (error) {
        setloading(false);
        seterror(error);
      }
    }
    getData();
  }, [count]);

  return (
    <div className="row">
      <div className="col-md-12 mx-auto">
        {loading && <Loader />}
        <div className="d-inline mb-5">
          <span
            style={{ fontSize: "25px", fontWeight: "500", marginRight: "10px" }}
          >
            Foods
          </span>
          <div className="d-inline-flex justify-content-center">
            <select
              className="form-control"
              value={type}
              onChange={(e) => {
                filterByType(e.target.value);
              }}
            >
              <option value="all">All</option>
              <option value="break fast">Break Fast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
            </select>
          </div>
        </div>
        <table className="table table-bordered table-dark mt-4">
          <thead className="bs thead-dark">
            <tr>
              <th>N0.S</th>
              <th>Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {foods.length ? (
              <>
                {foods.length &&
                  foods.map((food, index) => {
                    return (
                      <tr key={food.id}>
                        <td>{index + 1}</td>
                        <td>{food?.name}</td>
                        <td>${food?.price}</td>
                        <td>
                          <a target="_blank" href={food?.image}>
                            <img
                              src={food?.image}
                              style={{
                                height: "50px",
                                width: "50px",
                                borderRadius: "10px",
                              }}
                              alt="food?.name"
                            />
                          </a>
                        </td>
                        <td>{food?.type}</td>
                        <td>
                          {
                            <button
                              type="button"
                              className="btn btn-outline-danger"
                              onClick={() => handleDelete(food.id)}
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          }
                        </td>
                      </tr>
                    );
                  })}
              </>
            ) : (
              <tr>
                <td colSpan="6">No Data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AddFood() {
  const {data} = useContext(Smooth);
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();
  const initialValues = {
    name: "",
    type: "all",
    price: "",
    method: "url",
    image: "",
  };

  const [foodInfo, setRoomInfo] = useState(initialValues);
  const [imgageurl1, setimageurl1] = useState("");


  const memoization = useMemo(
    () => (
      <DorpZone
        setimageurl1={setimageurl1}
        maxLength={1}
        multiple={false}
        path="foods"
      />
    ),
    [foodInfo.method]
  );

  const handleChange = (e) =>
    setRoomInfo({ ...foodInfo, [e.target.name]: e.target.value });

  const handleChangeMemory = useMemo(() => handleChange, [foodInfo]);

  function addRoom() {
    setRoomInfo((prev) => ({
      ...prev,
      image: imgageurl1,
      price: parseInt(prev.price),
    }));
  }

  useEffect(() => {
    const addRommInfo = async () => {
      try {
        const gg = await axios.post(`${data.appUrl}/api/foods/addfood`, foodInfo);
        setloading(false);
        Swal.fire("Congrats", "Food Added Successfully", "success");
        setRoomInfo(initialValues);
        setimageurl1("");
      } catch (error) {
        setloading(false);
        Swal.fire("Oops", "Something went wrong", "error");
      }
    };

    if (foodInfo.image) addRommInfo();
  }, [foodInfo.image]);

  return (
    <div className="row showme">
      <div className="col-md-6 mx-auto">
        {loading && <Loader />}
        <input
          type="text"
          className="form-control mb-2"
          placeholder="name"
          name="name"
          value={foodInfo.name}
          onChange={handleChangeMemory}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Price"
          name="price"
          value={foodInfo.price}
          onChange={handleChangeMemory}
        />
        <select
          className="form-control mb-2"
          value={foodInfo.type}
          name="type"
          onChange={handleChangeMemory}
        >
          <option value="all">All</option>
          <option value="break fast">Break Fast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="snack">Snack</option>
        </select>

        <div className="d-inline-flex ">
          <div className="form-check px-4">
            <input
              className="form-check-input"
              type="radio"
              name="method"
              id="1radio"
              value="url"
              checked={foodInfo.method === "url"}
              onChange={handleChangeMemory}
            />
            <label className="form-check-label" htmlFor="1radio">
              URL
            </label>
          </div>
          <div className="form-check px-4">
            <input
              className="form-check-input"
              type="radio"
              name="method"
              value="file"
              id="2radio"
              checked={foodInfo.method === "file"}
              onChange={handleChangeMemory}
            />
            <label className="form-check-label" htmlFor="2radio">
              FIle
            </label>
          </div>
        </div>
        {foodInfo.method === "url" && (
          <div>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Image URL 1"
              value={imgageurl1}
              onChange={(e) => {
                setimageurl1(e.target.value);
              }}
            />
          </div>
        )}

        {foodInfo.method === "file" && <>{memoization}</>}

        <div className="text-right mt-3">
          <button className="btn btn-primary mt-2 " onClick={addRoom}>
            {" "}
            Add Food
          </button>
        </div>
      </div>
    </div>
  );
}

export function ComplaintFroms() {
  const {data} = useContext(Smooth);
  const [count, setCount] = useState(0);
  const [froms, setFroms] = useState([]);
  const [duplicateFroms, setDuplicateFroms] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  const [type, settype] = useState("all");

  function filterByType(e) {
    settype(e);
    if (e.toLowerCase() !== "all") {
      const tempFroms = duplicateFroms.filter(
        (user) => user?.status.toLowerCase() === e.toLowerCase()
      );
      setFroms(tempFroms);
    } else {
      setFroms(duplicateFroms);
    }
  }

  useEffect(() => {
    async function getData() {
      try {
        const gg = await axios.get(`${data.appUrl}/api/froms/getfroms`);
        setFroms(gg.data);
        setDuplicateFroms(gg.data);
        setloading(false);
      } catch (error) {
        setloading(false);
        seterror(error);
      }
    }
    getData();
  }, [count]);

  return (
    <>
      <div className="row">
        <div className="col-md-12 mx-auto">
          {loading && <Loader />}
          <div className="d-inline mb-5">
            <span
              style={{
                fontSize: "25px",
                fontWeight: "500",
                marginRight: "10px",
              }}
            >
              Complaints
            </span>
            <div className="d-inline-flex justify-content-center">
              <select
                className="form-control"
                value={type}
                onChange={(e) => {
                  filterByType(e.target.value);
                }}
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>
          <table className="table table-bordered table-dark mt-4 text-center">
            <thead className="bs thead-dark">
              <tr>
                <th>N0.S</th>
                <th>Hotel Name</th>
                <th>User ID</th>
                <th>Message</th>
                <th>Image</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {froms.length ? (
                <>
                  {froms.length &&
                    froms.map((from, index) => {
                      return (
                        <tr key={from._id}>
                          <td>{index + 1}</td>
                          <td>{from?.roomname}</td>
                          <td>{from?.userid}</td>
                          <td>{truncate(from?.usermessage, 10)}</td>
                          <td>
                            <a target="_blank" href={from?.userimage}>
                              <img
                                src={from?.userimage}
                                style={{
                                  height: "50px",
                                  width: "50px",
                                  borderRadius: "10px",
                                }}
                                alt={from?.roomname}
                              />
                            </a>
                          </td>
                          <td>{from?.status}</td>
                          <td>{moment(from?.date).format("MMM Do YY")}</td>
                          <td><Modals from={from} setCount={setCount}/></td>
                        </tr>
                      );
                    })}
                </>
              ) : (
                <tr>
                  <td colSpan="8">No Data</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Managerscreen;
