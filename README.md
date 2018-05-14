Trying it yourself
==========
git clone (project url)
npm install
npm start

Overview
==========

Chef is a web app where a user can log in (using firebase auth), create a menu
of items (or not) by clicking the top right, and then browse the current chefs
and their menus by clicking the top left.

Diagram
=========

(./src/Chef.png)

The website triggers some API calls on API gateway, which trigger AWS lambda functions, which
use the AWS elasticsearch service to index data. On elastic search, A list of chefs is kept at
the /test-chefs/chef/1 index, and each chef's menu is kept at the /test-menu/menu/{uid} directory.

API
======

Endpoint: https://3n1o8iiw02.execute-api.us-east-1.amazonaws.com/0

Methods:
GET /chefs: returns a list of the uids of all chefs that have signed up from the es index.
POST /chefs: adds a user that just signed up into es index.

GET /menus?uid={uid}: returns the menu for chef with uid {uid}
POST /menus?uid={uid}: updates the menu for chef with uid {uid}

VIDEO DEMO
=========
https://www.useloom.com/share/333cc4cc7df3491892ba08ee51bf5b7a

PROBLEMS
========

##React

Had to do
<TableRow onButtonPress = {this.onButtonPress} chef = {chefs[i]} keyProp={i} key={i} />
and then
<button onClick = {()=>{this.props.onButtonPress(this.props.keyProp)}}>
in the child component. There are so many ways to do this that somehow I didn't try this and
got stuck on it for a couple hours, trying to figure out how to pass in the growing 'i' from
the for loop where I was generating there rows from the data. The number being passed to the
onClick function was always number of rows + 1, my friend Ishaan this might be because
of pointers behing the scenes, and 'i' is number of rows + 1 when the loop ends.

##Lambda and API gateway

This error was very difficult for me to track down:
"XMLHttpRequest cannot load (api request). Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:3000' is therefore not allowed access"

I had to enable CORS on API gateway, and add the headers to the response in the lambda functions.
Apparently this error gets called whenever there is a syntax error in the lambda function. I would
expect a different error so somehow I missed checking the cloudtrail logs until many hours
have been wasted looking in the wrong spot. View the /python_lambda_handlers director to see some
things I did that do not produce this error.
