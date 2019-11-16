// This has implementation to read/write data from our cache

// --------------------

// SET LOGGEDIN IN AS USERNAME -> by providing username, we will cache LoggedIn = true, Username, name
// SET LOGGED OUT -> LoggedIn = false, username empty, name empty
// GET LOGGEDIN (boolean) -> this is used to determine whether we show Login page vs Another page
//          ^ This will call RESET PAGE
// GET USERNAME -> this is used to be able to get information about an entity
// GET NAME -> this is used for personalized content (ie: "Hey Dave!")

// SET PAGE -> this sets the new page we have transitioned to
// RESET PAGE -> this sets page to initial page after logged in
//          ^ DO NOT EXPOSE THIS TO INDEX.JS (WE CURRENTLY DON'T HAVE A USE FOR IT)
// GET PAGE -> this is the current page we are on

