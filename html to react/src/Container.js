import React from 'react'
import Card from './Card'
import './card.css'

const listInfo = [
    {
        cardTitle: "free",
        price: 0,
        check: ["single user", "5GB storage", "unlimited public project", "community access"],
        time: ["unlimited private project","dedicated phone support","free subdomain", "monthly status reports"],
    },
    {
        cardTitle: "plus",
        price: 9,
        check: ["5 users-bold", "50GB storage", "unlimited public project", "community access","unlimited private project","dedicated phone support","free subdomain"],
        time: ["monthly status reports"],
    },
    {
        cardTitle: "pro",
        price: 49,
        check: ["unlimited users-bold", "150GB storage", "unlimited public project", "community access","unlimited private project","dedicated phone support","unlimited free subdomain-bold", "monthly status reports"],
        time: [],
    }
]

export default function Container() {
    return (
        <div>
            <section className="pricing py-5">
    <div className="container">
      <div className="row">
        {
            listInfo.map((value,key)=>{
                return (
                    console.log('value:', value.price),
                
                <Card price={value.price} title={value.cardTitle} check={value.check} time={value.time} key={key}/>
                )
                
            }

            )
        }
      </div>
    </div>
  </section>
        </div>
    )
}
