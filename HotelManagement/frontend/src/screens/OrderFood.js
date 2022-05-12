import React, { useState, useEffect, useContext } from "react";
import Loader from "react-spinners/HashLoader";
import AuthChecking from "../common/AuthCheck";
import axios from "axios";
import Swal from "sweetalert2";
import Food from "../components/Food";
import OffCanvas from "../components/OffCanvas";
import { Smooth } from "../context";

function OrderFood() {
  const { data, setData } = useContext(Smooth);
  const [foods, setFoods] = useState([]);
  const [duplicateFoods, setduplicateFoods] = useState([]);
  const [loading, setloading] = useState(true);
  const [searchkey, setsearchkey] = useState("");
  const [type, settype] = useState("all");

  function filterBySearch() {
    const tempFoods = duplicateFoods.filter((room) =>
      room.name.toLowerCase().includes(searchkey.toLowerCase())
    );
    setFoods(tempFoods);
  }

  function filterByType(e) {
    settype(e);
    if (e.toLowerCase() !== "all") {
      const tempFoods = duplicateFoods.filter(
        (food) => food.type.toLowerCase() === e.toLowerCase()
      );
      setFoods(tempFoods);
    } else {
      setFoods(duplicateFoods);
    }
  }

  function orderIdFood(id) {
    const tempFood = duplicateFoods.filter((food) => food.id === id)[0];

    const indexOfObject = data.foodList.findIndex((food) => food.id === id);

    const tempList = {
      id: tempFood.id,
      name: tempFood.name,
      price: tempFood.price,
      type: tempFood.type,
      image: tempFood.image,
      count: tempFood?.count >= 1 ? tempFood?.count : 1,
    };

    if (indexOfObject > -1) {
      data.foodList[indexOfObject].count += 1;
      return setData((prev) => ({
        ...prev,
        foodList: [...data.foodList],
      }));
    } else {
      return setData((prev) => ({
        ...prev,
        foodList: [...prev.foodList, tempList],
      }));
    }
  }

  useEffect(() => {
    localStorage.setItem("foodList", JSON.stringify(data.foodList));
  }, [data.foodList]);

  useEffect(() => {
    const getFoodList = async () => {
      try {
        const res = await axios.get(`${data.appUrl}/api/foods/getfoods`);
        setFoods(res.data);
        setduplicateFoods(res.data);
        setloading(false);
      } catch (error) {
        Swal.fire("Error", "Something went wrong", "error");
      }
    };

    getFoodList();
  }, []);

  return (
    <div className="container">
      {<AuthChecking />}
      <div className="row mt-5 bs ">
        <div className="col-md-12 d-flex justify-content-around mx-auto ">
          <div className="col-md-5 d-flex justify-content-center">
            <input
              type="text"
              className="form-control"
              placeholder="search food"
              value={searchkey}
              onChange={(e) => {
                setsearchkey(e.target.value);
              }}
              onKeyUp={filterBySearch}
            />
          </div>
          <div className="col-md-4 d-flex justify-content-center">
            <select
              className="form-control"
              value={type}
              style={{ marginTop: ".5rem" }}
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
          <div className="col-md-2 d-flex justify-content-center">
            {<OffCanvas />}
          </div>
        </div>
      </div>
      <div className="row justify-conent-center py-5">
        {loading ? (
          <Loader />
        ) : (
          foods.map((food, index) => {
            return (
              <div className="col-md-9 mt-3 mx-auto " key={index}>
                <Food food={food} orderIdFood={orderIdFood} />
              </div>
            );
          })
        )}

        {foods.length ? null : (
          <div className="col-md-9 mt-3 mx-auto">
            <h1>No Result</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderFood;
