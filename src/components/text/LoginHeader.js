import React, {Component} from "react";
import "./Text.css"
import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";

const Fade = styled.div`animation: 3s ${keyframes`${fadeIn}`} 1`;
const FadeSlow = styled.div`animation: 6s ${keyframes`${fadeIn}`} 1`;

/**
 * Header (text) for Login View.
 */
export class LoginHeader extends Component {
    render(){
        return (
            <div id ="text_login">
                <Fade><p>Your money.</p></Fade>
                <FadeSlow><p>Instantly.</p></FadeSlow>
            </div>
        );
    }
}

export default LoginHeader;
