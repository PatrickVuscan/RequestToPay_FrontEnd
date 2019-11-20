/* Menu is the top bar on the page holding the Scotia logo and menu hamburger */

import React, {Component} from "react";
import './Menu.css'

class Menu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      showMenu: true,
    };
    this.transitionTo = this.transitionTo.bind(this);
  }

  transitionTo(view){
    this.toggleMenuOpen();
    this.props.transitionTo(view);
  }

  toggleMenuOpen(){
    this.setState(prevState => ({menuOpen: !prevState.menuOpen}));
  }

  render() {
    const { menuOpen, showMenu } = this.state;
    let menuID;

    if (menuOpen) {
      menuID = "header_block-open";
    } else {
      menuID = "header_block-closed";
    }

    return (
      <div id={menuID} style={{backgroundColor : this.props.menuColor}}>

        <div id="header_bar">
          <div id="header_scotia">
            Scotia
          </div>
          {showMenu &&
            <div id="header_menu">
              <img id="header_hamburger"
                   src='/images/icon_menu.png'
                   alt={"menu"}
                   onClick={() => this.toggleMenuOpen()
                   }/>
            </div>
          }
        </div>

        <div className={"menu_block first"} onClick={() => this.transitionTo("home")}>
          Home.
        </div>
        <div className={"menu_block"}>
          <s>Buying</s>
        </div>
        <div className={"menu_block"} onClick={() => this.transitionTo("logOut")}>
          Log Out.
        </div>

      </div>
    );
  }
}

export default Menu;
