import React, {Component} from "react";
import "./Text.css";
import styled, { keyframes } from "styled-components";
import { fadeIn, pulse } from "react-animations";

const Fade = styled.div`animation: 2s ${keyframes`${fadeIn}`} 1`;
const Pulse = styled.div`animation: 2s ${keyframes`${pulse}`} infinite`;

/**
 * Header (text) to indicate Log out is in progress.
 */
export class AccountHeader extends Component {
    render(){
        return (
            <div id ="text_login">
                <Fade><p>Logging.</p></Fade>
                <p><Pulse>Out.</Pulse></p>
            </div>
        );
    }
}

export default AccountHeader;
