var React = require("react");
import TextField from "material-ui/TextField";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class LoginForm extends React.Component {
	constructor() {
		super();
		this.state = {
			user: "",
			password: ""
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleUserChange = this.handleUserChange.bind(this);
		this.handlePwChange = this.handlePwChange.bind(this);
	}
	
	handleSubmit(event){
		this.props.postLogin(this.state.user, this.state.password);
		document.getElementById("loginForm").reset();
	}

	handleUserChange(event){
		this.setState({user: event.target.value});
	}

	handlePwChange(event){
		this.setState({password: event.target.value});
	}

	render() {
		var handleSubmit = this.handleSubmit;
		var handleUserChange = this.handleUserChange;
		var handlePwChange = this.handlePwChange;
		
		return (
			<form id="loginForm" onSubmit={handleSubmit}>
				Username: <input
					type="text"
					onChange={handleUserChange}
				/>
				Password: <input
					type="password"
					onChange={handlePwChange}
				/>
				<input type="submit" value="Login" />
			</form>
		)
	}
}
