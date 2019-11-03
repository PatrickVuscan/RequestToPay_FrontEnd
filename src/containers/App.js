import React from 'react';
import logo from '../assets/logo.svg';
import './App.css';
import {Helmet} from "react-helmet";
import TextLogin from "../components/TextLogin";
import TextWelcome from "../components/TextWelcome";
import {Button} from "../components/Elements";

function App() {
  return (
      <div id="app">
        {/* Helmet - modify css based on current page - move off to another component? */}
        <Helmet>
          <style type="text/css">{''+
          '#header_block {background-color: var(--RED);}' +
          '#root {background-color: var(--MID_RED);}' +
          '#bg_container {background: transparent}'}
          </style>
        </Helmet>

        <div id="login_block" className="centerVH">
          <TextWelcome/>
        </div>
      </div>
  );
}

export default App;
