var React = require("react");
import TextField from "material-ui/TextField";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class Month extends React.Component {
	constructor() {
		super();
		this.state = {
			effects: "",
			poses: "",
			powers: "",
			suit: "",
			theme: ""
		};
		this.typeInField = this.typeInField.bind(this);
		this.changeHandler = this.changeHandler.bind(this);
	}
	
	typeInField(month, field, event) {
		// console.log(this.props.monthName, this.props.canEdit);
		if (this.props.canEdit) {
			this.props.typeListener(month, field, event.target.value);
		}
	}
	
	changeHandler(field, event) {
		// console.log(event.target.value);
		// console.log(this.props.monthName, this.props.canEdit);
		if (this.props.canEdit) {
			var dynamicObj = {};
			dynamicObj[field] = event.target.value;
			this.setState(dynamicObj);
		}
	}
	
	componentDidMount() {
		this.setState({
			effects: this.props.effects,
			poses: this.props.poses,
			powers: this.props.powers,
			suit: this.props.suit,
			theme: this.props.theme
		});
	}
	
	// Bring in Material UI components for styling
	render() {
		var effects = this.state.effects;
		var poses = this.state.poses;
		var powers = this.state.powers;
		var suit = this.state.suit;
		var theme = this.state.theme;
		var editText = this.props.canEdit ? "Click to Edit:" : "Login to Edit";

		return (
			<div className="monthPanel">
				<h3>{this.props.monthName}</h3>
				<div className="subUnit">
					<h4>Theme:</h4>
					<MuiThemeProvider>
						<TextField
							key={"key"+this.props.monthName}
							floatingLabelText={editText}
							hintText="Photo theme"
							value={theme}
							onChange={this.changeHandler.bind(this, "theme")}
							onBlur={this.typeInField.bind(this, this.props.monthName, "theme")}
						/>
					</MuiThemeProvider>
				</div>
				<div className="subUnit">
					<h4>Powers:</h4>
					<MuiThemeProvider>
						<TextField
							key={"key"+this.props.monthName}
							floatingLabelText={editText}
							hintText="The powers I'll use"
							multiLine={true}
							rows={2}
							rowsMax={4}
							value={powers}
							onChange={this.changeHandler.bind(this, "powers")}
							onBlur={this.typeInField.bind(this, this.props.monthName, "powers")}
						/>
					</MuiThemeProvider>
				</div>
				<div className="subUnit">
					<h4>Poses:</h4>
					<MuiThemeProvider>
						<TextField
							key={"key"+this.props.monthName}
							floatingLabelText={editText}
							hintText="How to pose"
							multiLine={true}
							rows={2}
							rowsMax={4}
							value={poses}
							onChange={this.changeHandler.bind(this, "poses")}
							onBlur={this.typeInField.bind(this, this.props.monthName, "poses")}
						/>
					</MuiThemeProvider>
				</div>
				<div className="subUnit">
					<h4>Suit:</h4>
					<MuiThemeProvider>
						<TextField
							key={"key"+this.props.monthName}
							floatingLabelText={editText}
							hintText="What my suit does"
							multiLine={true}
							rows={2}
							rowsMax={4}
							value={suit}
							onChange={this.changeHandler.bind(this, "suit")}
							onBlur={this.typeInField.bind(this, this.props.monthName, "suit")}
						/>
					</MuiThemeProvider>
				</div>
				<div className="subUnit">
					<h4>Effects:</h4>
					<MuiThemeProvider>
						<TextField
							key={"key"+this.props.monthName}
							floatingLabelText={editText}
							hintText="Neat special effects"
							multiLine={true}
							rows={2}
							rowsMax={4}
							value={effects}
							onChange={this.changeHandler.bind(this, "effects")}
							onBlur={this.typeInField.bind(this, this.props.monthName, "effects")}
						/>
					</MuiThemeProvider>
				</div>
			</div>
		)
	}
}
