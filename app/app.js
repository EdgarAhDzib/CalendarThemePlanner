var React = require("react");
var ReactDOM = require("react-dom");

import routes from "./routes";
import { Provider } from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import store from "./store";

ReactDOM.render(
	<Provider store={store}>
		{routes}
	</Provider>,
	document.getElementById("app")
);

store.subscribe(() => {
	console.log(store.getState());
});
