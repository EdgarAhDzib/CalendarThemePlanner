import React from "react";
import { IndexRoute, Route, Router, hashHistory } from "react-router";
import Main from "./components/main";

module.exports = (
	<Router history={hashHistory}>
		<Route path="/">
			<IndexRoute component={Main} />
		</Route>
	</Router>
);
