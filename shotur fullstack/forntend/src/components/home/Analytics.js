import React, { useContext } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Short } from "../../context";
import moment from "moment";
import randomcolor from "randomcolor";
import axios from "axios";
import { toast } from "react-toastify";
Chart.register(ArcElement, Tooltip, Legend);

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

function Analytics({ id, setGetId }) {
  const { data, setData } = useContext(Short);
  const filterInfo = data.linksInfo.filter((f) => {
    return f.id === id;
  })[0];

  if (!filterInfo) return "";

  const charData = {
    datasets: [
      {
        data: Object.values(filterInfo?.metadata.country),
        backgroundColor: Object.values(filterInfo?.metadata.country).map((e) =>
          randomcolor()
        ),
      },
    ],
    labels: Object.keys(filterInfo?.metadata.country),
  };

  const charData2 = {
    datasets: [
      {
        label: "# of Votes",
        data: Object.values(filterInfo?.metadata.device),
        backgroundColor: Object.values(filterInfo?.metadata.device).map((e) =>
          randomcolor()
        ),
      },
    ],
    labels: Object.keys(filterInfo?.metadata.device),
  };

  const removeContextApi = () => {
    const removeData = data.linksInfo.filter((f) => f.id !== id);
    if (removeData.length <= 0)
      return false, setData({ ...data, linksInfo: [] });
    setGetId(removeData[0].id);
    setData({ ...data, linksInfo: removeData });
  };

  const handleDelete = () => {
    const headers = { Authorization: `Bearer ${data.authToken}` };
    const id = filterInfo?.id ? filterInfo?.id : undefined;
    if (!id) return;
    axios
      .delete(`${data.appURL}short/${id}`, { headers })
      .then((res) => {
        showUp("Deleted successful", true);
        removeContextApi();
      })
      .catch((err) => {
        removeContextApi();
        showUp("something went wrong");
      });
  };

  return (
    <>
      <p className='font-weight-bold display-5 text-capitalize text-center'>
        analytics
      </p>
      <div className='d-flex justify-content-between'>
        <div>{filterInfo?.short ? filterInfo?.short : "None"}</div>
        <div>{moment(filterInfo?.metadata.created).format("L")}</div>
      </div>
      <div className='add_flex_prop'>
        <div className='doughutSize'>
          <p className='text-center lead display-6'>country</p>
          <Doughnut data={charData} />
        </div>
        <div className='doughutSize'>
          <p className='text-center lead display-6'>device</p>
          <Doughnut data={charData2} />
        </div>
      </div>
      <p className='display-4'>Total clicks : {filterInfo?.metadata.count}</p>
      <div>
        <button className='btn btn-danger' onClick={handleDelete}>
          Delete link
        </button>
      </div>
    </>
  );
}

export default Analytics;
