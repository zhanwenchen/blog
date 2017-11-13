import { Card, CardTitle } from 'material-ui/Card';
import React from 'react';
import Posts from '../containers/AllPostsPage.jsx';

const Home = () => (
  <Card className="container">
    <CardTitle title="React Blog" subtitle="Blog Home" />
    <Posts />
  </Card>
);

export default Home;
