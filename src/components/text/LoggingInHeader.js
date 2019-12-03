import React, {Component} from "react";
import "./Text.css";
import styled, { keyframes } from "styled-components";
import { fadeIn, pulse } from "react-animations";

const Fade = styled.div`animation: 2s ${keyframes`${fadeIn}`} 1`;
const Pulse = styled.div`animation: 2s ${keyframes`${pulse}`} infinite`;

/**
 * Header (text) to indicate Login is in progress.
 */
export class LoggingInHeader extends Component {
    render(){
        return (
            <div id ="text_login">
                <Fade><p>Your info.</p></Fade>
                <p><Pulse>Loading.</Pulse></p>
            </div>
        );
    }
}

export default LoggingInHeader;
