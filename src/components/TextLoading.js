/* Login Loading related quote for the login page */

import React, {Component} from "react";
import "./Text.css";
import styled, { keyframes } from "styled-components";
import { fadeIn, pulse } from "react-animations";

const Fade = styled.div`animation: 2s ${keyframes`${fadeIn}`} 1`;
const Pulse = styled.div`animation: 2s ${keyframes`${pulse}`} infinite`;

export class TextLoading extends Component {
    render(){
        return (
            <div id ="text_login">
                <Fade><p>Your info.</p></Fade>
                <p><Pulse>Loading.</Pulse></p>
            </div>
        );
    }
}

export default TextLoading;
