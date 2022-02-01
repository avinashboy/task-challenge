import React from 'react'

function Time({data}) {
    return (
        <>
            {
                data.map((value, key)=>{
                    return (
                        <li className="text-muted cap"><span className="fa-li"><i className="fas fa-times"></i></span>{value}</li>
                    )
                })
            }
        </>
    )
}

export default Time
