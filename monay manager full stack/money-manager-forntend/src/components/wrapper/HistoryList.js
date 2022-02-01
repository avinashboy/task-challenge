import React from "react";
import { ListGroup, Row, Col } from "react-bootstrap";
import moment from "moment";

function HistoryList({ data, deleteTransaction,editTransaction }) {


  const sureDelete = (id) =>{
    const waiting = window.confirm('Delete the item?')
    if(waiting) return deleteTransaction(id)
    
  }

  return (
    <div className="mb-5 mt-4">
      <h1 className="text-center">
        {data.length === 0 ? "No History" : "Your History"}
      </h1>
      <div style={{ height: "400px", overflow: "auto" }}>
        <ListGroup>
          {data.map((d, key) => (
            <ListGroup.Item
              variant={d.type.toLowerCase() === "income" ? "success" : "danger"}
              key={key}
            >
              <Row>
                <Col md={12} className="d-flex justify-content-between">
                  <div>
                    {d.category} - {d.subCategory}<br /> ${d.cost} -{" "}
                    {moment(d.date).format("lll")} - {d.description}
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="p-2" onClick={()=>editTransaction(d._id)}>
                      <i className="far fa-edit fa-2x"></i>
                    </div>
                    <div className="p-2" onClick={()=> sureDelete(d._id)}>
                      <i className="far fa-trash-alt fa-2x"></i>
                    </div>
                  </div>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
}

export default HistoryList;
