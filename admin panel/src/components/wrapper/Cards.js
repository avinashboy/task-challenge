import React from 'react'
import Footer from './Footer'
import NavBar from './NavBar'

const cards = [
    {
        name: "Earnings (Monthly)",
        info: "$40,000",
        icon: "fas fa-calendar fa-2x text-gray-300",
        color:"primary"
    },
    {
        name: "Earnings (Annual)",
        info: "$215,000",
        icon: "fas fa-dollar-sign fa-2x text-gray-300",
        color:"success"
    },
    {
        name: "Tasks",
        info: "50%",
        icon: "fas fa-clipboard-list fa-2x text-gray-300",
        progress: true,
        extra: "50",
        color:"info"
    },
    {
        name: "Pending Requests",
        info: "18",
        icon: "fas fa-comments fa-2x text-gray-300",
        color:"warning"
    },
]

function sameCard({name,info,color}){
    return(
        <>
        <div className="col mr-2">
                        <div className={`text-xs font-weight-bold text-${color} text-uppercase mb-1`}>{name}</div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">{info}</div>
                    </div>
        </>
    )
}

function progressCard({name,info,color, extra}){
    return(
        <>
        <div className="col mr-2">
            <div className="text-xs font-weight-bold text-info text-uppercase mb-1">{name}</div>
            <div className="row no-gutters align-items-center">
                <div className="col-auto">
                    <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">{info}</div>
                </div>
                <div className="col">
                    <div className="progress progress-sm mr-2">
                        <div className={`progress-bar bg-${color}`} role="progressbar"
                            style={{width: `${extra}%`}} aria-valuenow={extra} aria-valuemin="0"
                            aria-valuemax="100"></div>
                    </div>
                </div>
            </div>
        </div>
        
        </>
    )
}

function cardMaking({name, info, icon, color, isProgress = null, extra = null}){
    return(
        <>
        <div className="col-xl-3 col-md-6 mb-4">
        <div className={`card border-left-${color} shadow h-100 py-2`}>
            <div className="card-body">
                <div className="row no-gutters align-items-center">
                    {isProgress ? progressCard({name,info,color, extra}) :  sameCard({name,info,color})}
                    <div className="col-auto">
                        <i className={icon}></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
        </>
    )
}

function Cards() {
    return (
        <>
            <div id="content-wrapper" classNameName="d-flex flex-column">
                <div id="content">
                    <NavBar/>
                    <div className="container-fluid">

                    <div className="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 className="h3 mb-0 text-gray-800">Cards</h1>
                    </div>

                    <div className="row">
                    {
    cards.map((e, key)=>{
        return(
            cardMaking({name:e.name, info:e.info, icon: e.icon, color: e.color, isProgress: e.progress, extra: e.extra})
        )
    })
}
                    </div>

                    <div className="row">

                        <div className="col-lg-6">

                            <div className="card mb-4">
                                <div className="card-header">
                                    Default Card Example
                                </div>
                                <div className="card-body">
                                    This card uses Bootstrap's default styling with no utility classNamees added. Global
                                    styles are the only things modifying the look and feel of this default card example.
                                </div>
                            </div>

                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-primary">Basic Card Example</h6>
                                </div>
                                <div className="card-body">
                                    The styling for this basic card example is created by using default Bootstrap
                                    utility classNamees. By using utility classNamees, the style of the card component can be
                                    easily modified with no need for any custom CSS!
                                </div>
                            </div>

                        </div>

                        <div className="col-lg-6">

                            <div className="card shadow mb-4">
                                <div
                                    className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 className="m-0 font-weight-bold text-primary">Dropdown Card Example</h6>
                                    <div className="dropdown no-arrow">
                                        <a className="dropdown-toggle"  role="button" id="dropdownMenuLink"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                            aria-labelledby="dropdownMenuLink">
                                            <div className="dropdown-header">Dropdown Header:</div>
                                            <a className="dropdown-item" >Action</a>
                                            <a className="dropdown-item" >Another action</a>
                                            <div className="dropdown-divider"></div>
                                            <a className="dropdown-item" >Something else here</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    Dropdown menus can be placed in the card header in order to extend the functionality
                                    of a basic card. In this dropdown card example, the Font Awesome vertical ellipsis
                                    icon in the card header can be clicked on in order to toggle a dropdown menu.
                                </div>
                            </div>

                            <div className="card shadow mb-4">
                                <a href="#collapseCardExample" className="d-block card-header py-3" data-toggle="collapse"
                                    role="button" aria-expanded="true" aria-controls="collapseCardExample">
                                    <h6 className="m-0 font-weight-bold text-primary">Collapsable Card Example</h6>
                                </a>
                                <div className="collapse show" id="collapseCardExample">
                                    <div className="card-body">
                                        This is a collapsable card example using Bootstrap's built in collapse
                                        functionality. <strong>Click on the card header</strong> to see the card body
                                        collapse and expand!
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                    </div>
                    <Footer/>
                </div>
            </div>
        </>
    )
}

export default Cards
