import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Customers from '../pages/Customers'
import Style from '../pages/Style'
import Login from '../pages/Login'
import Categories from '../pages/Categories'
import Products from '../pages/Products'
import Orders from '../pages/Orders'

const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Dashboard}/>
            <Route path='/customers' component={Customers}/>
            <Route path='/products' component={Products}/>
            <Route path='/categories' component={Categories}/>
            <Route path='/orders' component={Orders}/>
            <Route path='/style' component={Style}/>
            <Route path='/login' component={Login}/>
        </Switch>
    )
}

export default Routes
