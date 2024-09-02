import React from 'react'
import Header from './Header'
import Banner from './Banner'

function Layout({ children, title, buttonType, onClickButton, buttonTitle }) {
    return (<div>
        <Header />
        <Banner title={title} buttonTitle={buttonTitle} buttonType={buttonType} onClickButton={onClickButton} />
        <div className="gradient-bg md:min-h-[50vh] min-h-[70vh]">
            {children}
        </div>
    </div>)
}

export default Layout
