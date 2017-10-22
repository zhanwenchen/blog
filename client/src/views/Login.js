import React from 'react';
import { Link } from 'react-router-dom';
import ErrorBoundary from '../components/ErrorBoundary';
import LoginForm from '../components/LoginForm';

export default class Login extends React.Component {
	render() {
		return (
			<div className="login" id='login'>
				<ErrorBoundary>
					<LoginForm />
				</ErrorBoundary>
			</div>
		);
	}
}
