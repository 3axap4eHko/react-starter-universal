import React from 'react';
import Helmet from 'react-helmet';

function About() {
  return (
    <div className="inner cover">
      <h1 className="cover-heading">React Redux Starter Universal</h1>
      <p className="lead" />
      <p className="lead">
        <a href="https://github.com/3axap4eHko/react-starter-universal" className="btn btn-lg btn-default">Learn more</a>
      </p>
      <Helmet
        title="About Page"
      />
    </div>
  );
}

export default About;
