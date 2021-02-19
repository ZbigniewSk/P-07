import React, { Fragment } from 'react'
import Header from '../components/Header'
import MainView from './MainView'
import LGameView from './LGameView'
import LGameHelpView from './LGameHelpView'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

const Root = () => {

    return (
        <Router>
            <Fragment>
                <Header />
            </Fragment>
            <Switch>
                <Route key="/" exact path="/" component={MainView} />
                <Route key="/lgame" exact path="/lgame" component={LGameView} />
                <Route key="/help" exact path="/help" component={LGameHelpView} />
                <Redirect to="/" />
            </Switch>
        </Router>
    )
}

export default Root