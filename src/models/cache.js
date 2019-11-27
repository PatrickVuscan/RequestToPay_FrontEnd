// This has implementation to read/write data from our cache/transition functions that don't need backend

import config from "../constants";
import request from "request-promise";


function performToSignUp(view, balls){
    view.setState({loading: true});
    setTimeout(function(res) {
        balls();
        view.setState({loading: false});
    }, 2000); // Set Delay (to test the loading animation)
}

// function setLoggedIn(){} -> by providing username, we will cache LoggedIn = true, Username, name// TODO: Later
// function setLoggedOut(ID){} -> LoggedIn = false, username empty, name empty // TODO: Later
// function getLoggedIn(ID){}  -> this is used to determine whether we show Login page vs Another page// TODO: Later
// function getUsername(ID){}  -> this is used to be able to get information about an entity        // TODO: Later
// function getName(){} -> this is used for personalized content (ie: "Hey Dave!")    // TODO: Later
// function setPage(){}  -> this sets the new page we have transitioned to // TODO: Later
// function resetPage(){} this sets page to initial page after logged in // TODO: Later
// function getPage(){}  -> this is the current page we are on        // TODO: Later




export {performToSignUp};
