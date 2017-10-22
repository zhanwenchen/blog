import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import './Post.css';

export default class Post extends React.Component {

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }

  state = {
    post: '',
  };

  componentDidMount() {
    // console.log('component did mount in post');
    // // console.log(this)
    // console.log(`The value of posts before the fetch is ${this.state.posts}`);
    // fetch('/api/post/' + this.props.params.string_id)
    //   .then(res => res.json())
    //   .then(post => this.setState({ post }))
    //   .then(() => { console.log(`The value of composer after the fetch is ${this.state.settings}`) })
  };

  render {
    return (
      <div className="post">
        {this.state.post.body}
      </div>
    );
  }
}

// export default function Post({ number, title, labels, user, summary }, { router }) {
  // const {org, repo} = router.params;
  // return (
    // <div className="post">
    //   <UserWithAvatar user={user}/>
    //   <div className="issue__body">
    //     <Link to={`/${org}/${repo}/issues/${number}`}>
    //       <span className="issue__number">#{number}</span>
    //       <span className="issue__title">{title}</span>
    //     </Link>
    //     <p className="issue__summary">{shorten(summary)}</p>
    //     <IssueLabels labels={labels}/>
    //   </div>
    // </div>
//   );
// }

// Issue.propTypes = {
//   number: PropTypes.number.isRequired,
//   title: PropTypes.string.isRequired,
//   labels: PropTypes.arrayOf(PropTypes.shape({
//     id: PropTypes.number,
//     name: PropTypes.string,
//     color: PropTypes.string
//   })).isRequired,
//   user: PropTypes.shape({
//     login: PropTypes.string.isRequired,
//     avatar_url: PropTypes.string
//   }).isRequired,
//   summary: PropTypes.string.isRequired
// };
//
// Issue.contextTypes = {
//   router: PropTypes.object.isRequired
// };
