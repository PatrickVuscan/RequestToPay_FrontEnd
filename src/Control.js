import React, { Component } from 'react';
import App from './containers/App';
import Login from './containers/Login';

const SCREEN = {
    login: 'login',
    app: 'app'
}

class Control extends Component {
    constructor(props) {
        super(props);
        this.state = {screenDisplay: SCREEN.login};
        this.loginHandler = this.loginHandler.bind(this);
    }

    loginHandler(){
        this.setState({screenDisplay: SCREEN.app});
        alert("could not log in");
    }

    render() {
        let element;
        if (this.state.screenDisplay === SCREEN.login){
            element = <Login loginHandler = {this.loginHandler} />;
        } else if (this.state.screenDisplay === SCREEN.app) {
            element = <App />;
        }
        return (<div> {element} </div>)
    }
}

export default Control;