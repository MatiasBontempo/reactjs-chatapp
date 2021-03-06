import React, { Component } from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import ActionBar from './components/ActionBar';
import Chat from './components/Chat';
import ConditionalRoute from './components/ConditionalRoute';
import Contacts from './components/Contacts';
import Container from './components/Container';
import Loading from './components/Loading';
import Login from './components/Login';
import Logout from './components/Logout';
import Profile from './components/Profile';
import Signup from './components/Signup';

import './App.css';

class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Loading condition={this.props.global.isLoading}></Loading>
					<ActionBar header={this.props.global.header}/>
					<Container>
						<ConditionalRoute exact path="/" redirect="/profile" condition={!(this.props.user.uid)} component={Signup} />
						<ConditionalRoute path="/signup" redirect="/profile" condition={!(this.props.user.uid)} component={Signup} />
						<ConditionalRoute path="/login" redirect="/contacts" condition={!(this.props.user.uid)} component={Login} />
						<ConditionalRoute path="/profile" redirect="/login" condition={(this.props.user.uid)} component={Profile} />
						<ConditionalRoute path="/contacts" redirect="/login" condition={(this.props.user.uid)} component={Contacts} />
						<ConditionalRoute path="/chat/:chatId/:friendId" redirect="/login" condition={(this.props.user.uid)} component={Chat} />
						<Route path="/logout" component={Logout}></Route>
					</Container>
				</div>
			</Router>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		global: state.globalReducer,
		user: state.userReducer
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		setUser: (user) => {
			dispatch({
				type: "SET_USER",
				payload: user
			});
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(App);