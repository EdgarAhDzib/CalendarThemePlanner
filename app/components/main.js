var React = require("react");
var axios = require("axios");
import Month from "./month";
import LoginForm from "./loginForm";
import RaisedButton from "material-ui/RaisedButton";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class Main extends React.Component {
	constructor() {
		super();
		this.state = {
			allMonths: "",
			monthStats: {
				"January": {ordinal:1},
				"February": {ordinal:2},
				"March": {ordinal:3},
				"April": {ordinal:4},
				"May": {ordinal:5},
				"June": {ordinal:6},
				"July": {ordinal:7},
				"August": {ordinal:8},
				"September": {ordinal:9},
				"October": {ordinal:10},
				"November": {ordinal:11},
				"December": {ordinal:12}
			},
			login: false
		};
		this.typeListener = this.typeListener.bind(this);
		this.saveUpdates = this.saveUpdates.bind(this);
		this.postLogin = this.postLogin.bind(this);
		this.logout = this.logout.bind(this);
	}
	
	typeListener(month, field, text) {
		var monthObj = this.state.monthStats[month];
		monthObj[field] = text;
		monthObj["monthName"] = month;
		this.setState({month : monthObj});
	}

	saveUpdates() {
		// console.log(this.state.monthStats);
		axios.post("/updateMonths", {body: this.state.monthStats});
		// console.log("save updates function");
		axios.get("/allmonths").then(function(result){
			// console.log(result);
			this.setState({ allMonths: result.data });
		}.bind(this) );
	}

	postLogin(user, password) {
		if (user != "" && password != "") {
			axios.post("/login", { username: user, password: password} );
		}
		axios.get("/success").then(function(result){
			console.log(result.data);
			if (result.data == "true") {
				this.setState({login : true});
			}
		}.bind(this) );
	}
	
	logout() {
		axios.get("/logout").then(function(result) {});
		this.setState({login : false});
	}

	componentDidMount() {
		axios.get("/allmonths").then(function(result){
			this.setState({ allMonths: result.data });
		}.bind(this) );
	}
	
	componentDidUpdate() {
		if (this.state.login) {
			console.log("Logged in, CDU");
		} else {
			console.log("Not logged in, CDU");
		}
	}

// POST only valid with login, display message otherwise

	render() {
		console.log(this.state.login, "from Render");
		var canEdit = this.state.login;
		var monthDivs = "";
		var typeListener = this.typeListener;
		var saveUpdates = this.saveUpdates;
		var postLogin = this.postLogin;
		var logout = this.logout;
		if (this.state.allMonths.length > 0) {
			monthDivs = this.state.allMonths.map(function(month, inc){
				return <Month {...month} canEdit={canEdit} typeListener={typeListener} key={"month"+inc} />
			});
		}
		var saveButton = this.state.login ? <MuiThemeProvider><RaisedButton label="SAVE UPDATES" primary={true} onClick={saveUpdates}/></MuiThemeProvider> : "";
		var loginForm = this.state.login ? <MuiThemeProvider><RaisedButton label="LOGOUT" secondary={true} onClick={logout}/></MuiThemeProvider> : <LoginForm postLogin={postLogin} />;
		return (
			<div>
				<h2>Violet's Calendar Themes</h2>
				{loginForm}
				{saveButton}
				<div id="mainGrid">
					{monthDivs}
				</div>
				{saveButton}
			</div>
		);
	}
}
