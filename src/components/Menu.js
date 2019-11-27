/* Menu is the top bar on the page holding the Scotia logo and menu hamburger */

import React, {Component} from "react";
import './Menu.css'
import constants from "../constants";

const VIEW = constants.VIEW;

class Menu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
    };
    this.transitionTo = this.transitionTo.bind(this);
  }

  transitionTo(view){
    this.toggleMenuOpen();
    global.presenter.transitionTo(view);
  }

  toggleMenuOpen(){
    this.setState(prevState => ({menuOpen: !prevState.menuOpen}));
  }

  // Change menu class to change colors.
  viewSwitch(view){
    switch(view){
      case VIEW.login:
        return " login-menu";
      case VIEW.home:
        return " home-menu";
      case VIEW.cardList:
        return " buying-menu"; // TODO: Make conditional based on persona
      case VIEW.invoice:
        return "customer-menu";
      default:
        return " home-menu";
    }
  }

  render() {
    const {
      menuOpen
    } = this.state;

    return (

      <div id={menuOpen ? "header_block-open" : "header_block-closed"}
           className={this.viewSwitch(this.props.currentView)}
      >

        <div id="header_bar">
          <div id="header_scotia">
            Scotia
          </div>
          {global.loggedIn &&
            <div id="header_menu">
              <img id="header_hamburger"
                   src='/images/icon_menu.png'
                   alt={"menu"}
                   onClick={() => this.toggleMenuOpen()
                   }/>
            </div>
          }
        </div>

        <div className={"menu_block first"} onClick={() => this.transitionTo(VIEW.home)}>
          Home.
        </div>
        <div className={"menu_block"}>
          <s>Buying</s>
        </div>
        <div className={"menu_block"} onClick={() => global.presenter.startLoading()}>
          <s>Loading Test.</s>
        </div>
        <div className={"menu_block"} onClick={() => this.transitionTo(VIEW.setup)}>
          Set up.
        </div>
        <div className={"menu_block"} onClick={() => this.transitionTo(VIEW.login)}>
          Log Out.
        </div>

      </div>
    );
  }
}

export default Menu;
