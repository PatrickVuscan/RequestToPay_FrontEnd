import React, {Component} from "react";
import "./Text.css"
import styled, { keyframes } from "styled-components";
import { fadeInUp, fadeInDown } from "react-animations";

const Fade = styled.div`animation: 1s ${keyframes`${fadeInUp}`} 1`;
const FadeSlow = styled.div`animation: 3s ${keyframes`${fadeInDown}`} 1`;

/**
 * Welcome Component Addressing User.
 */
export class Welcome extends Component {
  render(){
    return (
      <div id={"welcome_wrapper"}>
        <div className={"home_block"}>
          <div id ="text_welcome">
              <Fade><p>Welcome</p>
              <p>Home,</p></Fade>
              <FadeSlow><p id="username">{global.username}.</p></FadeSlow>
          </div>
        </div>
      </div>
    );
  }
}

export default Welcome;
