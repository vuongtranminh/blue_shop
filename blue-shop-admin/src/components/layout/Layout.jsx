import React, { useEffect } from 'react'

import './layout.css'
import "react-toastify/dist/ReactToastify.css"

import Sidebar from '../sidebar/Sidebar'
import TopNav from '../topnav/TopNav'
import Routes from '../Routes'

import { BrowserRouter, Route } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

import ThemeAction from '../../redux/actions/ThemeAction'
import { ToastContainer } from 'react-toastify'

const Layout = () => {

    const themeReducer = useSelector(state => state.ThemeReducer)

    const dispatch = useDispatch()

    useEffect(() => {
        const themeClass = localStorage.getItem('themeMode', 'theme-mode-light')

        const colorClass = localStorage.getItem('colorMode', 'theme-mode-light')

        dispatch(ThemeAction.setMode(themeClass))

        dispatch(ThemeAction.setColor(colorClass))
    }, [dispatch])

    return (
        <BrowserRouter>
            <Route render={(props) => {
                if (props.location.pathname.includes('/login')) {
                    return <div><Routes /></div>
                } else {
                    return (
                        <div className={`layout ${themeReducer.mode} ${themeReducer.color}`}>
                            <Sidebar {...props} />
                            <div className="layout__content">
                                <TopNav />
                                <div className="layout__content-main">
                                    <Routes />
                                </div>
                            </div>
                        </div>
                    )
                }
            }} />
            <ToastContainer />
        </BrowserRouter>
    )
}

export default Layout
