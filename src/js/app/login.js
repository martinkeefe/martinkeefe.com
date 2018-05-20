import React, {Fragment} from 'react'
import {NormalPage} from 'app'
//import Amplify, {Auth} from "aws-amplify"

import {CognitoUserPool, CognitoUser, AuthenticationDetails} from 'amazon-cognito-identity-js'


//Amplify.configure({
//	Auth: {
//    	//mandatorySignIn: true,
//		region: 'eu-west-2',
//		userPoolId: 'eu-west-2_7sTMtRW13',
//		identityPoolId: 'ea25abac-af76-46c7-9ea7-ad61b0a778ac',
//		userPoolWebClientId: 'hvg9cg1d9m87c9m63v4m17fi3'
//	}
//})

function cognito_login(app,username,password) {

    var authenticationDetails = new AuthenticationDetails({
        Username : username,
        Password : password
    });

	var userPool = new CognitoUserPool({
	    UserPoolId : 'eu-west-2_7sTMtRW13',
	    ClientId : 'hvg9cg1d9m87c9m63v4m17fi3'
	});

    var cognitoUser = new CognitoUser({
	    Username : username,
	    Pool : userPool
	});

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: session => {
            //console.log('access token + ' + result.getAccessToken().getJwtToken());
            app.user = cognitoUser
            app.user_session = session
        },
        onFailure: err => {
            console.error(err);
        },
        // https://stackoverflow.com/questions/40287012/how-to-change-user-status-force-change-password
		newPasswordRequired: function(userAttributes, requiredAttributes) {
		    // User was signed up by an admin and must provide new
		    // password and required attributes, if any, to complete
		    // authentication.

		    // the api doesn't accept this field back
		    delete userAttributes.email_verified;

		    // unsure about this field, but I don't send this back
		    delete userAttributes.phone_number_verified;

		    // Get these details and call
		    cognitoUser.completeNewPasswordChallenge(password, userAttributes, this);
		}
    });
}


// https://serverless-stack.com/chapters/create-a-login-page.html

class LoginPage extends NormalPage {
	constructor(props) {
    	super(props)

		this.state = {
			username: "",
			password: ""
		}

		this.on_submit = this.on_submit.bind(this)
		this.on_change = this.on_change.bind(this)
	}

	validate() {
    	return this.state.username.length > 0 && this.state.password.length > 0
  	}

	async on_submit(event) {
    	event.preventDefault()

    	cognito_login(this.props.app, this.state.username, this.state.password)
    	//try {
		//	await Auth.signIn(this.state.username, this.state.password)
		//	console.log('Logged in')
		//}
		//catch (e) {
		//	console.error(e)
		//}
     	//try {
		//	this.props.app.user = await Auth.currentSession()
		//	console.log(this.props.app.user)
		//}
		//catch (e) {
		//	console.error(e)
		//}
 	}

	on_change(event) {
		this.setState({
			[event.target.id]: event.target.value
		})
	}

	main() {
		return (
			<Fragment>
				<h1>Login</h1>
				<form onSubmit={this.on_submit}>
					<label><span>Username:</span> <input id="username" value={this.state.username} onChange={this.on_change} type="text" autoFocus /></label><br/>
					<label><span>Password:</span> <input id="password" value={this.state.password} onChange={this.on_change} type="password" /></label><br/>
					<label><span></span> <button type="submit" disabled={!this.validate()}>Login</button></label>
				</form>
			</Fragment>
		)
	}
}


export default function(app) {
	app.add_route('/login', context => {
		app.render(<LoginPage {...{app, context}} title="Martin's Login" date="2018-03-17"/>)
	})
}
