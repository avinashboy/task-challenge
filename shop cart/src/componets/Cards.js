import React, { useState } from 'react'

const style = {
    top: "0.5rem",
    right: "0.5rem",
  };

  function getStar(number) {
    return <div className="d-flex justify-content-center small text-warning mb-2">
        {
               [...Array(number)].map( (el, key) => {
                   return (
                    <div className="bi-star-fill" key={key}></div>
                   )
               })
                
            
        }
    </div>
  }

  function getStrike(min, max){
      return (
        <>
        <span className="text-muted text-decoration-line-through">{max}</span>&nbsp;&nbsp; 
        {min}
        </>
      )
    
  }




function Cards({value, id}) {

    const [totals, setTotals] = useState(0)

    const add = (price)=> setTotals(totals + price)
    const sub = (price)=> setTotals(totals - price)
    
    const btn = (e)=>{
        const element = e.target
        const price = Number(element.getAttribute('data-price').split(".")[0].replace("$", ""))
        console.log('price:', price)
        const name = element.innerText === "Add to cart" ? "Remove from cart" : "Add to cart"
        element.innerText = name
        name !== 'Add to cart' ?  add(price): sub(price)
        
    }
    return (
        console.log("total",totals),
        <>
        <div className="col mb-5">
            <div className="card h-100">
                            
                {value.sale ? <div className="badge bg-dark text-white position-absolute" style={style}>Sale</div> : ""}
                            
                    <img className="card-img-top" src={value.imgUrl} alt={value.name} />
                            
                        <div className="card-body p-4">
                            <div className="text-center">
                                    
                                <h5 className="fw-bolder">{value.name}</h5>

                                {value.star ? getStar(value.star) :""}
                                    
                                    
                                    {value.half ? getStrike(value.half, value.price): value.price}
                                    
                                </div>
                        </div>
                            
                        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div className="text-center">
                                <span className="btn btn-outline-dark mt-auto" data-price={value.half ? value.half: value.price} id={id} onClick={btn}>{value.btn}</span>
                            </div>
                        </div>
                </div>
        </div>
        </>
    )
}

export default Cards
