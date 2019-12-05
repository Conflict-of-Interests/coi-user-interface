import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import {coiUserClient} from './axios-config.js';
import Form from 'react-bootstrap/Form';

export default function Login(props) {
  const [assocs, setAssocs] = useState([]);

  let loginFunc = (id) => {
    localStorage.setItem('user',id);
    props.history.push('/associate-home');
  }

  useEffect(() => {
    async function getAllAssociates() {
      const data = await coiUserClient.get('/users');
      console.log(data);
      setAssocs(data.data);
    }
    getAllAssociates();
  }, []);

  let registerAssociate = (e) => {
    let fname = document.getElementById('firstName').value;
    let lname = document.getElementById('lastName').value;
    coiUserClient.post('/users', {
      firstName: fname,
      lastName: lname
    });
  }

  return (
    <div className="login-div">
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Login as Associate
      </Dropdown.Toggle>
      <Dropdown.Menu>
      {
        assocs.map((assoc)=> {
          return <Dropdown.Item onClick={() => loginFunc(assoc.id)}>Login as {assoc.firstName} {assoc.lastName}</Dropdown.Item>
        })
      }
      </Dropdown.Menu>
    </Dropdown>
    <br/>
    <Link to="/trainer-home">
      <Button variant="primary">Login as Trainer</Button>
    </Link>
    <br />
    <div>
    <Form>
      <Form.Group controlId="firstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="input" placeholder="Enter first name" />
      </Form.Group>
      <Form.Group controlId="lastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="input" placeholder="Enter last name" />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={registerAssociate}>
        Register
      </Button>
      </Form>
    </div>
  </div>
  )
}
