import React, { useState, useEffect, useContext, useMemo } from "react";
import { Tabs } from "antd";
import Loader from "../components/Loader";
import DorpZone from "../components/DorpZone";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Smooth } from "../context";
import moment from "moment";

const { TabPane } = Tabs;

function Adminscreen() {
  const navigate = useNavigate();
  const { data } = useContext(Smooth);
  useEffect(() => {
    if (data.metaInfo?.role !== "admin") {
      navigate("/");
    }
  }, []);
  return (
    <div className="mt-3 ml-3 mr-3 bs">
      <h2 className="text-center" style={{ fontSize: "30px" }}>
        {" "}
        <b>Admin Panel</b>
      </h2>
      <Tabs defaultActiveKey="3">
        <TabPane tab="Bookings" key="1">
          <Bookings />
        </TabPane>
        <TabPane tab="Rooms" key="2">
          <Rooms />
        </TabPane>
        <TabPane tab="Add Room" key="3">
          <Addroom />
        </TabPane>
        <TabPane tab="Users" key="4">
          <Users />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Adminscreen;

export function Bookings() {
  const { data } = useContext(Smooth);
  const [bookings, setbookings] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();

  useEffect(() => {
    async function getData() {
      try {
        const gg = await axios.get(
          `${data.appUrl}/api/bookings/getallbookings`
        );
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

export function Rooms() {
  const { data } = useContext(Smooth);
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function getData() {
      try {
        const gg = await axios.get(`${data.appUrl}/api/rooms/getallrooms`);
        setrooms(gg.data);
        setloading(false);
      } catch (error) {
        setloading(false);
        seterror(error);
      }
    }
    getData();
  }, [count]);

  const deleteRoom = async (id) => {
    try {
      const gg = await axios.delete(
        `${data.appUrl}/api/rooms/deleteroom/${id}`
      );
      setCount((pre) => pre + 1);
      Swal.fire("Done", "Deteled Successfully", "success");
    } catch (error) {
      Swal.fire("Bad", "Something Went Wrong", "danger");
    }
  };

  return (
    <div className="row">
      <div className="col-md-12 mx-auto">
        {loading && <Loader />}
        <h1>Rooms</h1>
        <table className="table table-dark table-bordered">
          <thead>
            <tr>
              <th>No.S</th>
              <th>Room Id</th>
              <th>Name</th>
              <th>Type</th>
              <th>Rent Per Day</th>
              <th>Max Count</th>
              <th>Phone Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rooms.length ? (
              rooms.map((room, index) => {
                return (
                  <tr key={room._id}>
                    <td>{index + 1}</td>
                    <td>{room._id}</td>
                    <td>{room.name}</td>
                    <td>{room.type}</td>
                    <td>{room.rentperday}</td>
                    <td>{room.maxcount}</td>
                    <td>{room.phonenumber}</td>
                    <td>
                      <span
                        className="btn"
                        onClick={() => deleteRoom(room._id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8">No Data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Users() {
  const { data } = useContext(Smooth);
  const [users, setusers] = useState([]);
  const [duplicateUsers, setDuplicateUsers] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  const [count, setCount] = useState(0);
  const [type, settype] = useState("all");

  function filterByType(e) {
    settype(e);
    if (e.toLowerCase() !== "all") {
      const tempUsers = duplicateUsers.filter(
        (user) => user?.role.toLowerCase() === e.toLowerCase()
      );
      setusers(tempUsers);
    } else {
      setusers(duplicateUsers);
    }
  }

  const handleDelete = async (id) => {
    await axios
      .delete(`${data.appUrl}/api/users/deleteuser/${id}`)
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
        const gg = await axios.get(`${data.appUrl}/api/users/getallusers`);
        setusers(gg.data);
        setDuplicateUsers(gg.data);
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
        <div className="d-inline mb-5">
          <span
            style={{ fontSize: "25px", fontWeight: "500", marginRight: "10px" }}
          >
            Users
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
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="staff">Staff</option>
              <option value="user">User</option>
            </select>
          </div>
        </div>

        {loading && <Loader />}
        <table
          className="table table-dark table-bordered"
          style={{ marginTop: "1rem" }}
        >
          <thead>
            <tr>
              <th>No.S</th>
              <th>User Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Join Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 &&
              users.map((user, index) => {
                return (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{moment(user.createdAt).format("MMM Do YY")}</td>
                    <td>
                      {
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => handleDelete(user._id)}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      }
                    </td>
                  </tr>
                );
              })}
            {users.length === 0 && (
              <tr>
                <td colSpan="7">No Data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Addroom() {
  const { data } = useContext(Smooth);
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();
  const initialValues = {
    name: "",
    type: "delux",
    rentperday: "",
    maxcount: "",
    phonenumber: "",
    description: "",
    method: "url",
    imageurls: [],
  };
  const [roomInfo, setRoomInfo] = useState(initialValues);

  //
  const [imgageurl1, setimageurl1] = useState("");
  const [imgageurl2, setimageurl2] = useState("");
  const [imgageurl3, setimageurl3] = useState("");

  const handleChange = (e) =>
    setRoomInfo({ ...roomInfo, [e.target.name]: e.target.value });

  async function addRoom() {
    setRoomInfo((prev) => ({
      ...prev,
      imageurls: [...prev.imageurls, imgageurl1, imgageurl2, imgageurl3],
    }));
  }

  useEffect(() => {
    const addRommInfo = async () => {
      try {
        const gg = await await axios.post(
          `${data.appUrl}/api/rooms/addroom`,
          roomInfo
        );
        setloading(false);
        Swal.fire("Congrats", "Your New Room Added Successfully", "success");
        setRoomInfo(initialValues);
        setimageurl1("");
        setimageurl2("");
        setimageurl3("");
        setTimeout(() => navigate("/"), 1000);
      } catch (error) {
        setloading(false);
        Swal.fire("Oops", "Something went wrong", "error");
      }
    };

    if (roomInfo.imageurls.length === 3) addRommInfo();
  }, [roomInfo.imageurls]);

  const memoization = useMemo(
    () => (
      <DorpZone
        setimageurl1={setimageurl1}
        setimageurl2={setimageurl2}
        setimageurl3={setimageurl3}
        maxLength={3}
        multiple={true}
        path="images"
      />
    ),
    [roomInfo.method]
  );

  return (
    <div className="row showme">
      <div className="col-md-6 mx-auto">
        {loading && <Loader />}
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Room name"
          name="name"
          value={roomInfo.name}
          onChange={handleChange}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Rent perday"
          name="rentperday"
          value={roomInfo.rentperday}
          onChange={handleChange}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Max count"
          name="maxcount"
          value={roomInfo.maxcount}
          onChange={handleChange}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Description"
          name="description"
          value={roomInfo.description}
          onChange={handleChange}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Phone number"
          name="phonenumber"
          value={roomInfo.phonenumber}
          onChange={handleChange}
        />
        <select
          className="form-control mb-2"
          value={roomInfo.type}
          name="type"
          onChange={handleChange}
        >
          <option value="delux">Delux</option>
          <option value="non-delux">Non-Delux</option>
        </select>

        <div className="d-inline-flex ">
          <div className="form-check px-4">
            <input
              className="form-check-input"
              type="radio"
              name="method"
              id="1radio"
              value="url"
              checked={roomInfo.method === "url"}
              onChange={handleChange}
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
              checked={roomInfo.method === "file"}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="2radio">
              FIle
            </label>
          </div>
        </div>
        {roomInfo.method === "url" && (
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
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Image URL 2 "
              value={imgageurl2}
              onChange={(e) => {
                setimageurl2(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Image URL 3"
              value={imgageurl3}
              onChange={(e) => {
                setimageurl3(e.target.value);
              }}
            />
          </div>
        )}

        {roomInfo.method === "file" && <>{memoization}</>}

        <div className="text-right mt-3">
          <button className="btn btn-primary mt-2 " onClick={addRoom}>
            {" "}
            Add Room
          </button>
        </div>
      </div>
    </div>
  );
}
