import React from 'react';
import Cargo from './Cargo.svg';
import { Helm } from '../components/HTML';

function Home() {
  return (
    <div className="inner cover">
      <h1 className="cover-heading">Create your application faster.</h1>
      <img src={Cargo} alt="React Starter Universal" />
      <Helm>
        <title>Home</title>
      </Helm>
    </div>
  );
}

export default Home;
