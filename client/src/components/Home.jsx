import { Card, CardTitle } from 'material-ui/Card';
import React from 'react';
import Posts from '../components/Posts';

const Home = () => (
  <Card className="container">
    <CardTitle title="React Blog" subtitle="Blog Home" />
    <Posts />
  </Card>
);

export default Home;
