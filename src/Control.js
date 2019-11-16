import React, { Component } from 'react';
import App from './views/App';
import Login from './views/Login';
import Header from "./components/Header";

const SCREEN = {
    login: 'login',
    app: 'app'
};

/**
 * Controller for redirecting from the login page, to the appropriate home page.
 */

class Control extends Component {
    constructor(props) {
        super(props);
        this.state = {
            screenDisplay: SCREEN.login,
            username: 'Not Logged In'
        };
        this.loginHandler = this.loginHandler.bind(this);
    }

    loginHandler(username){
        this.setState({username: username});
        this.setState({screenDisplay: SCREEN.app});
    }

    render() {
        let element;
        if (this.state.screenDisplay === SCREEN.login){
            element = <Login loginHandler = {this.loginHandler} />;
        } else if (this.state.screenDisplay === SCREEN.app) {
            element = <App username={this.state.username}/>;
        }
        return (
            <div id="control">
                <Header/>
                <div id="bg_container">
                </div>
                {element}
            </div>
        )
    }
}

export default Control;
