/* Random money related quote for the login page */

import React, {Component} from "react";
import "./Text.css"
import styled, { keyframes } from "styled-components";
import { fadeInUp, fadeInDown } from "react-animations";

const Fade = styled.div`animation: 1s ${keyframes`${fadeInUp}`} 1`;
const FadeSlow = styled.div`animation: 3s ${keyframes`${fadeInDown}`} 1`;

export class TextWelcome extends Component {
    render(){
        return (
            <div id ="text_welcome">
                <Fade><p>Welcome</p>
                <p>Home,</p></Fade>
                <FadeSlow><p id="username">{this.props.username}.</p></FadeSlow>
            </div>
        );
    }
}

export default TextWelcome;
