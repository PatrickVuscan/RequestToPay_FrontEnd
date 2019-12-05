/* Random quote for the signup page */

import React, {Component} from "react";
import "./Text.css"
import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";

// const FadeFast  = styled.div`animation: 1s ${keyframes`${fadeIn}`} 1`;
const Fade = styled.div`animation: 3s ${keyframes`${fadeIn}`} 1`;
const FadeSlow = styled.div`animation: 6s ${keyframes`${fadeIn}`} 1`;

export class TextProducts extends Component {

    render(){
        return (
            <div id ="text_login">
                <Fade><p>Register new. Product.</p></Fade>
            </div>
        );
    }
}

export default TextProducts;
