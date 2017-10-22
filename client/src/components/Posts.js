import React from 'react';
import _ from 'lodash';

const TEASER_NUM_OF_CHARS = 30;

// const propTypes = {
// 	match: PropTypes.object.isRequired,
// 	location: PropTypes.object.isRequired,
// 	history: PropTypes.object.isRequired,
// };

export default class Posts extends React.Component {

	constructor(props) {
		super(props);
		this.state = { posts: [] };
	}

	componentDidMount() {
		// console.log('component did mount in Composer');
		// console.log(this)
		// console.log(`The value of posts before the fetch is ${this.state.posts}`);
		// fetch('/api/posts')
		// 	.then(res => res.json())
		// 	.then(posts => this.setState({ posts }))
		// 	.then(() => { console.log(`The value of composer after the fetch is ${this.state.settings}`) })
	}

	render() {
		// Initially the composer is null before data is fetched.
		return (
			<div className="posts">
				<div className="settings">
					{this.state.posts.length === 0 &&
						<div>
							<p>There are currently no posts</p>
						</div>
					}
					{this.state.posts.length > 0 &&
						this.state.posts.map(post => (
							<div className="post" key={post.string_id}>
								<Link to={`${this.props.location.pathname + '/' + post.string_id}`}>
									{_.truncate(post.body, {
										length: TEASER_NUM_OF_CHARS,
										separator: /,?\.* +/,
									})}
								</Link>
							</div>
						))
					}
			</div>
		</div>
		);
	}
}
