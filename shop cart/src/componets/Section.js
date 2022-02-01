import React, { useState } from 'react'
import random from 'randomstring'
import  randomNumber from 'random'
// import Cards from './Cards'

let name = () => {return random.generate({length: 5,charset: 'alphabetic'});}

let minNumber = () => { return randomNumber.int(0, 49)}

let maxNumber = () => {return randomNumber.int(51, 150)}

let url = () =>{return "https://source.unsplash.com/random"}

const productInfo = [
    {
        imgUrl: url(),
        name: name(),
        price: `$${minNumber()}.00`,
        half: null,
        star: null,
        btn: "Add to cart",
        sale: false
    },
    {
        imgUrl: url(),
        name: name(),
        price: `$${maxNumber()}.00`,
        half: `$${minNumber()}.00`,
        star: 3,
        btn: "Add to cart",
        sale: true
    },
    {
        imgUrl: url(),
        name: name(),
        price: `$${maxNumber()}.00`,
        half: `$${minNumber()}.00`,
        star: 4,
        btn: "Add to cart",
        sale: false
    },
    {
        imgUrl: url(),
        name: name(),
        price: `$${maxNumber()}.00`,
        half: null,
        star: 5,
        btn: "Add to cart",
        sale: true
    },
    {
        imgUrl: url(),
        name: name(),
        price: `$${maxNumber()}.00`,
        half: null,
        star: 4,
        btn: "Add to cart",
        sale: false
    },
    {
        imgUrl: url(),
        name: name(),
        price: `$${minNumber()}.00`,
        half: null,
        star: null,
        btn: "Add to cart",
        sale: true
    },
    {
        imgUrl: url(),
        name: name(),
        price: `$${maxNumber()}.00`,
        half: `$${minNumber()}.00`,
        star: 2,
        btn: "Add to cart",
        sale: false
    },
    {
        imgUrl: url(),
        name: name(),
        price: `$${maxNumber()}.00`,
        half: null,
        star: 3,
        btn: "Add to cart",
        sale: true
    },
]

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

function Section() {
    const [totals, setTotals] = useState(0)
    const [items, setItems] = useState(0)
    
    

    // const add = (price)=> setTotals(totals + price)
    // const sub = (price)=> setTotals(totals - price)
    
    const btn = (e)=>{
        const element = e.target
        const price = Number(element.getAttribute('data-price').split(".")[0].replace("$", ""))
        console.log('price:', price)
        const name = element.innerText === "Add to cart" ? "Remove from cart" : "Add to cart"
        element.innerText = name
        name !== 'Add to cart' ?  setTotals(totals + price): setTotals(totals - price)
        name !== 'Add to cart' ?  setItems(items + 1): setItems(items - 1)
    }
    return (
        console.log('totals:', totals),
        console.log('items:', items),
        <>
            <section className="py-5">
                <div className="container px-4 px-lg-5 mt-5">
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    {
                        productInfo.map((value, key)=>{ return(
                                        <div className="col mb-5" key={key}>
            <div className="card h-100">
                            
                {value.sale ? <div className="badge bg-primary text-white position-absolute" style={style}>Sale</div> : ""}
                            
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
                                <span className="btn btn-outline-dark mt-auto" data-price={value.half ? value.half: value.price} id={key} onClick={btn}>{value.btn}</span>
                            </div>
                        </div>
                </div>
        </div>
                        ) })
                    }
                </div>
                </div>
            </section>
        </>
    )
}

export default Section
