import React from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';

export default function Login(props) {
  return (
    <div>
      <Link to="/associate-home">
        <Button variant="primary">Login as Associate</Button>
      </Link>
      <Link to="/trainer-home">
        <Button variant="primary">Login as Trainer</Button>
      </Link>
    </div>
  )
}
