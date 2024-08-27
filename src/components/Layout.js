import React from 'react'
import Header from './Header'
import Banner from './Banner'

function Layout({ children, title }) {
    return (<div>
        <Header />
        <Banner title={title} />
        <div className="gradient-bg">
            {children}
        </div>
    </div>)
}

export default Layout
