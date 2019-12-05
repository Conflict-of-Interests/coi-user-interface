import React from 'react';
import Button from 'react-bootstrap/Button';
import {Redirect} from 'react-router-dom';

export default function Login(props) {
  let loginAsAssociate = (e) => {
    return <Redirect to="/associate-home"/>
  }
  let loginAsTrainer = (e) => {
    return <Redirect to="/trainer-home"/>
  }
  return (
    <div>
      <Button variant="primary" onClick={loginAsAssociate}>Login as Associate</Button>
      <Button variant="primary" onClick={loginAsTrainer}>Login as Trainer</Button>
    </div>
  )
}
