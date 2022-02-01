import React from 'react'

const year = (new Date()).getFullYear()

function Footer() {
    return (
        <>
             <footer className="py-5 bg-primary ">
            <div className="container"><p className="m-0 text-center text-white">Copyright &copy; Your Website {year}</p></div>
        </footer>
        </>
    )
}

export default Footer
