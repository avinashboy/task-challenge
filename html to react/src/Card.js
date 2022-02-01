import React from 'react'
import Check from './Check'
import Time from './Time'


function Card({price=0, title="free",check=[], time=[]}) {
    return (
        <>
        <div className="col-lg-4 mb-4">
          <div className="card mb-5 mb-lg-0">
            <div className="card-body">
              <h5 className="card-title text-muted text-uppercase text-center">{title}</h5>
              <h6 className="card-price text-center">${price}<span className="period">/month</span></h6>
              <hr/>
              <ul className="fa-ul">
                  <Check data={check} />
                  <Time data={time} />
              </ul>
              <div className="d-grid">
                <a href="#" className="btn btn-primary text-uppercase">Button</a>
              </div>
            </div>
          </div>
        </div>




        </>
    )
}

export default Card
