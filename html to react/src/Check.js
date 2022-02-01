import React from 'react'

function Check({data}) {
    return (
        <>
            {
                data.map((value, key)=>{
                    
                    return (
                        <li className={value.split('-').pop()=="bold" ? "cap boldMe" : "cap"}><span className="fa-li"><i className="fas fa-check"></i></span>{value.split("-")[0]}</li>
                    )
                })
            }
            
        </>
    )
}

export default Check
