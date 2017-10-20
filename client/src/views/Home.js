import React from 'react';
import { Link } from 'react-router-dom';
import Posts from '../components/Posts';

export default class Home extends React.Component {
	render() {
		return (
			<div className="home">
				<Posts/>
			</div>
		);
	}
}
