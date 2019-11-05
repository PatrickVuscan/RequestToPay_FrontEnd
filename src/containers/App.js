import React from 'react';
import {Helmet} from "react-helmet";
import TextWelcome from "../components/TextWelcome";

/**
 *
 * The default react web page.
 *
 * @returns {*}
 * @constructor
 */

function App() {
  return (
      <div id="app">
        {/* Helmet - load stylesheet based on current page */}
        <Helmet>
          <link rel="stylesheet" type="text/css" href="../../public/css/App.css" />
        </Helmet>

        <div id="login_block" className="centerVH">
          <TextWelcome/>
        </div>
      </div>
  );
}

export default App;
