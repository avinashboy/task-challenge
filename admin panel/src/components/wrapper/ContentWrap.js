import React from 'react'
import Content from './Content'
import Footer from './Footer'

function ContentWrap() {
    return (
        <>
            <div id="content-wrapper" className="d-flex flex-column">
                <Content/>
                <Footer/>
            </div>
        </>
    )
}

export default ContentWrap
