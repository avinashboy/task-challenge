import { useEffect, useContext } from "react";
import Footer from "../wrapper/Footer";
import NavBar from "../wrapper/NavBar";
import { Con } from "../../context";
import axios from "axios";
import moment from "moment";
import { useNavigate} from "react-router-dom";

function View() {
  const { data, setData } = useContext(Con);
  const navigate = useNavigate();
  
  const handleEdit = (event) => {
    const id =  event.target.id
    setData(preData => (
      {
        ...preData,
        changeData: id
      }
    ))
    navigate("/create")
  };

  const handleDelete = async (event) => {
    await axios
      .delete(`${data.appUrl}users/${event.target.id}`)
      .then((res) => {
        if (res.status === 200 && res.statusText === "OK") return getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getData = async () => {
    await axios
      .get(`${data.appUrl}users`)
      .then((res) => {
        if (res.status === 200 && res.statusText == "OK") {
          setData((preData) => ({ ...preData, dataInfo: [...res.data] }));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div id='content-wrapper' className='d-flex flex-column'>
        <div id='content'>
          <NavBar />
          <div className='card shadow mb-4 py-5'>
            <div className='card-header py-3'>
              <h6 className='m-0 font-weight-bold text-primary'>DataTables</h6>
            </div>
            <div className='card-body'>
              <div className='table-responsive'>
                <table
                  className='table table-bordered'
                  id='dataTable'
                  width='100%'
                  cellSpacing='0'
                >
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Created</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.dataInfo.map(
                      (el, ind) => (
                        (
                          <tr key={ind}>
                            <td>{ind + 1}</td>
                            <td>{el.name}</td>
                            <td>{el.email}</td>
                            <td>{moment(el.created).format("L")}</td>
                            <td>
                              <i
                                className='fas fa-trash'
                                id={el.id}
                                onClick={handleDelete}
                              ></i>
                              &nbsp;&nbsp;&nbsp;&nbsp;
                              <i
                                className='far fa-edit'
                                id={el.id}
                                onClick={handleEdit}
                              ></i>
                            </td>
                          </tr>
                        )
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default View;
