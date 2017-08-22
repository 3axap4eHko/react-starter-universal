import React from 'react';
import Cargo from './Cargo.svg';
import Helmet from 'react-helmet';

function Home() {
  return (
    <div className="inner cover">
      <h1 className="cover-heading">Create your application faster.</h1>
      <img src={Cargo} alt="React Starter Universal" />
      <Helmet
        title="Home Page"
      />
    </div>
  );
}

export default Home;
