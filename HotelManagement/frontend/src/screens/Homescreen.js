import React, { useState, useEffect, useContext } from "react";
import Room from "../components/Room";
import axios from "axios";
import "antd/dist/antd.css";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import { DatePicker, message } from "antd";
import AuthChecking from "../common/AuthCheck";
import { Smooth } from "../context";

const { RangePicker } = DatePicker;


function Homescreen() {
  const {data} = useContext(Smooth);
  const [rooms, setrooms] = useState([]);

  const [loading, setloading] = useState();
  const [error, seterror] = useState();

  const [fromdate, setfromdate] = useState();

  const [todate, settodate] = useState();

  const [duplicaterooms, setduplicaterooms] = useState([]);

  const [searchkey, setsearchkey] = useState("");

  const [type, settype] = useState("all");

  useEffect(() => {
    const getData = () => {
      axios
        .get(`${data.appUrl}/api/rooms/getallrooms`)
        .then((res) => {
          setloading(true);
          setrooms(res.data);
          setduplicaterooms(res.data);
          setloading(false);
        })
        .catch((err) => {
          seterror(err.response.data);
          setloading(false);
        });
    };
    getData();
  }, []);

  function filterByDate(dates) {
    setfromdate(moment(dates[0]).format("DD-MM-YYYY"));
    settodate(moment(dates[1]).format("DD-MM-YYYY"));
    var temprooms = [];
    var availability = false;
    for (const room of duplicaterooms) {
      if (room.currentbookings.length > 0) {
        for (const booking of room.currentbookings) {
          if (
            !moment(moment(dates[0]).format("DD-MM-YYYY")).isBetween(
              booking.fromdate,
              booking.todate
            ) &&
            !moment(moment(dates[1]).format("DD-MM-YYYY")).isBetween(
              booking.fromdate,
              booking.todate
            )
          ) {
            if (
              moment(dates[0]).format("DD-MM-YYYY") !== booking.fromdate &&
              moment(dates[0]).format("DD-MM-YYYY") !== booking.todate &&
              moment(dates[1]).format("DD-MM-YYYY") !== booking.fromdate &&
              moment(dates[1]).format("DD-MM-YYYY") !== booking.todate
            ) {
              availability = true;
            }
          }
        }
      }
      if (availability === true || room.currentbookings.length === 0) {
        temprooms.push(room);
      }
    }
    setrooms(temprooms);
  }

  function filterBySearch() {
    const temprooms = duplicaterooms.filter((room) =>
      room.name.toLowerCase().includes(searchkey.toLowerCase())
    );
    setrooms(temprooms);
  }

  function filterByType(e) {
    settype(e);
    if (e !== "all") {
      const temprooms = duplicaterooms.filter(
        (room) => room.type.toLowerCase() === e.toLowerCase()
      );
      setrooms(temprooms);
    } else {
      setrooms(duplicaterooms);
    }
  }
  return (
    <div className="container">
      {<AuthChecking />}
      {error && <Error message={error} spaceM="mt-5" />}
      <div className="row mt-5 bs">
        <div className="col-md-3">
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
        </div>
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="search rooms"
            value={searchkey}
            style={{ marginTop: "-0.01rem" }}
            onChange={(e) => {
              setsearchkey(e.target.value);
            }}
            onKeyUp={filterBySearch}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-control"
            value={type}
            onChange={(e) => {
              filterByType(e.target.value);
            }}
          >
            <option value="all">All</option>
            <option value="delux">Delux</option>
            <option value="non-delux">Non-Delux</option>
          </select>
        </div>
      </div>
      <div className="row justify-conent-center mt-5">
        {loading ? (
          <Loader />
        ) : (
          rooms.map((room, index) => {
            return (
              <div className="col-md-9 mt-3 mx-auto" key={index}>
                <Room room={room} fromdate={fromdate} todate={todate} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Homescreen;
