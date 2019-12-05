/* Login Loading related quote for the login page */

import React, {Component} from "react";
import "./Text.css";
import styled, { keyframes } from "styled-components";
import { fadeIn, pulse } from "react-animations";

const Fade = styled.div`animation: 2s ${keyframes`${fadeIn}`} 1`;
const Pulse = styled.div`animation: 2s ${keyframes`${pulse}`} infinite`;

export class MenuTextLoading extends Component {
    render(){
        return (
            <div id ="text_login">
                <Fade><p>Processing.</p></Fade>
                <p><Pulse>Your data.</Pulse></p>
            </div>
        );
    }
}

export default MenuTextLoading;
